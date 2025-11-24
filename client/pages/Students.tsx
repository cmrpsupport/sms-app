import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import {
  Search,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportData, ExportFormat } from "@/lib/exportUtils";
import { students, formatPHP } from "@/lib/mockData";

type SortField = "id" | "name" | "yearLevel" | "section" | "gpa" | "balance" | "status";
type SortDirection = "asc" | "desc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    yearLevel: "Grade 9",
    section: "9-A",
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    return sortDirection === "asc"
      ? <ArrowUp className="w-4 h-4 text-primary" />
      : <ArrowDown className="w-4 h-4 text-primary" />;
  };

  const filteredStudents = useMemo(() => {
    let result = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      const matchesYear = yearFilter === "all" || student.yearLevel === yearFilter;
      return matchesSearch && matchesStatus && matchesYear;
    });

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "id":
          comparison = a.id.localeCompare(b.id);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "yearLevel":
          comparison = a.yearLevel.localeCompare(b.yearLevel);
          break;
        case "section":
          comparison = a.section.localeCompare(b.section);
          break;
        case "gpa":
          comparison = a.gpa - b.gpa;
          break;
        case "balance":
          comparison = a.balance - b.balance;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchTerm, statusFilter, yearFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      graduated: "bg-blue-100 text-blue-700",
      dropped: "bg-red-100 text-red-700",
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  const handleExport = (format: ExportFormat) => {
    exportData(format, {
      title: "Student Directory",
      subtitle: "Academic Year 2024-2025",
      filename: `students_${new Date().toISOString().split("T")[0]}`,
      headers: ["Student ID", "Name", "Email", "Phone", "Year Level", "Section", "Status", "Balance (₱)"],
      data: filteredStudents.map(s => [
        s.id,
        s.name,
        s.email,
        s.phone,
        s.yearLevel,
        s.section,
        s.status.charAt(0).toUpperCase() + s.status.slice(1),
        s.balance.toLocaleString()
      ]),
      additionalInfo: [
        { label: "Total Students", value: filteredStudents.length.toString() },
        { label: "Generated", value: new Date().toLocaleDateString("en-PH") },
      ],
      summary: [
        { label: "Active", value: filteredStudents.filter(s => s.status === "active").length.toString() },
        { label: "With Balance", value: filteredStudents.filter(s => s.balance > 0).length.toString() },
      ],
    });
  };

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">
              Manage student records and enrollment
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Enroll New Student</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Juan Dela Cruz"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="juan@email.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="09171234567"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Year Level *
                    </label>
                    <select
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={newStudent.yearLevel}
                      onChange={(e) => setNewStudent({ ...newStudent, yearLevel: e.target.value })}
                    >
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Section *
                    </label>
                    <select
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={newStudent.section}
                      onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    >
                      <option value="9-A">9-A</option>
                      <option value="9-B">9-B</option>
                      <option value="10-A">10-A</option>
                      <option value="10-B">10-B</option>
                      <option value="11-A">11-A</option>
                      <option value="11-B">11-B</option>
                      <option value="12-A">12-A</option>
                    </select>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    onClick={() => {
                      // Demo: just close dialog
                      alert(`Student "${newStudent.name}" enrolled successfully!`);
                      setShowAddDialog(false);
                      setNewStudent({ name: "", email: "", phone: "", yearLevel: "Grade 9", section: "9-A" });
                    }}
                  >
                    Enroll Student
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="dropped">Dropped</option>
            </select>

            {/* Year Level Filter */}
            <select
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="all">All Year Levels</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>

            {/* Export */}
            <ExportDropdown onExport={handleExport} />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-2">
                      Student ID {getSortIcon("id")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      Name {getSortIcon("name")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("yearLevel")}
                  >
                    <div className="flex items-center gap-2">
                      Year Level {getSortIcon("yearLevel")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("section")}
                  >
                    <div className="flex items-center gap-2">
                      Section {getSortIcon("section")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("gpa")}
                  >
                    <div className="flex items-center gap-2">
                      GPA {getSortIcon("gpa")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("balance")}
                  >
                    <div className="flex items-center gap-2">
                      Balance {getSortIcon("balance")}
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      Status {getSortIcon("status")}
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-border hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-foreground">
                      {student.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {student.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {student.yearLevel}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {student.section}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {student.gpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {student.balance > 0 ? (
                        <span className="text-orange-600 font-semibold">
                          {formatPHP(student.balance)}
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Student Profile</DialogTitle>
                            </DialogHeader>
                            {selectedStudent && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Student ID</p>
                                    <p className="font-semibold">{selectedStudent.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-semibold">{selectedStudent.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-semibold">{selectedStudent.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-semibold">{selectedStudent.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Year Level</p>
                                    <p className="font-semibold">{selectedStudent.yearLevel}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Section</p>
                                    <p className="font-semibold">{selectedStudent.section}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">GPA</p>
                                    <p className="font-semibold">{selectedStudent.gpa.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(selectedStudent.status)}`}>
                                      {selectedStudent.status}
                                    </span>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Financial Summary</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Total Fees</p>
                                      <p className="font-bold">{formatPHP(selectedStudent.totalFees)}</p>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Paid</p>
                                      <p className="font-bold text-green-600">{formatPHP(selectedStudent.paid)}</p>
                                    </div>
                                    <div className="p-3 bg-orange-50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Balance</p>
                                      <p className="font-bold text-orange-600">{formatPHP(selectedStudent.balance)}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "border border-border hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

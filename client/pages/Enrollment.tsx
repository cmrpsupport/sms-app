import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Search,
  Plus,
  Filter,
  Download,
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { students, sections, subjects, formatPHP } from "@/lib/mockData";

type EnrollmentStatus = "enrolled" | "pending" | "dropped" | "waitlisted";

interface EnrollmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  section: string;
  yearLevel: string;
  status: EnrollmentStatus;
  enrollmentDate: string;
  totalUnits: number;
  subjects: string[];
  totalFees: number;
  paid: number;
}

export default function Enrollment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | "all">("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);

  const handleExport = (data: EnrollmentRecord[]) => {
    const headers = ["Enrollment ID", "Student ID", "Student Name", "Section", "Year Level", "Status", "Enrollment Date", "Total Units", "Subjects", "Total Fees", "Paid"];
    const csvContent = [
      headers.join(","),
      ...data.map(e =>
        [e.id, e.studentId, `"${e.studentName}"`, e.section, e.yearLevel, e.status, e.enrollmentDate, e.totalUnits, `"${e.subjects.join("; ")}"`, e.totalFees, e.paid].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `enrollments_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mock enrollment records
  const [enrollments] = useState<EnrollmentRecord[]>([
    {
      id: "ENR-001",
      studentId: "2024-0001",
      studentName: "Maria Santos",
      section: "10-A",
      yearLevel: "Grade 10",
      status: "enrolled",
      enrollmentDate: "2024-08-15",
      totalUnits: 32,
      subjects: ["BIO101", "MATH101", "ENG101", "CHEM101", "HIST101", "PE101"],
      totalFees: 45000,
      paid: 30000,
    },
    {
      id: "ENR-002",
      studentId: "2024-0002",
      studentName: "Juan Dela Cruz",
      section: "10-A",
      yearLevel: "Grade 10",
      status: "enrolled",
      enrollmentDate: "2024-08-15",
      totalUnits: 32,
      subjects: ["BIO101", "MATH101", "ENG101", "CHEM101", "HIST101", "PE101"],
      totalFees: 45000,
      paid: 45000,
    },
    {
      id: "ENR-003",
      studentId: "2024-0003",
      studentName: "Ana Reyes",
      section: "11-A",
      yearLevel: "Grade 11",
      status: "enrolled",
      enrollmentDate: "2024-08-14",
      totalUnits: 30,
      subjects: ["CHEM101", "PHYS101", "MATH101", "ENG101", "HIST101"],
      totalFees: 52000,
      paid: 30000,
    },
    {
      id: "ENR-004",
      studentId: "2024-0007",
      studentName: "Isabella Cruz",
      section: "10-B",
      yearLevel: "Grade 10",
      status: "pending",
      enrollmentDate: "2024-08-20",
      totalUnits: 32,
      subjects: ["BIO101", "MATH101", "ENG101", "CHEM101", "HIST101", "PE101"],
      totalFees: 45000,
      paid: 0,
    },
    {
      id: "ENR-005",
      studentId: "2024-0008",
      studentName: "Miguel Fernandez",
      section: "9-B",
      yearLevel: "Grade 9",
      status: "dropped",
      enrollmentDate: "2024-08-16",
      totalUnits: 0,
      subjects: [],
      totalFees: 42000,
      paid: 0,
    },
    {
      id: "ENR-006",
      studentId: "2024-0010",
      studentName: "Pedro Reyes",
      section: "10-A",
      yearLevel: "Grade 10",
      status: "waitlisted",
      enrollmentDate: "2024-08-22",
      totalUnits: 32,
      subjects: ["BIO101", "MATH101", "ENG101", "CHEM101", "HIST101", "PE101"],
      totalFees: 45000,
      paid: 15000,
    },
  ]);

  const getStatusBadge = (status: EnrollmentStatus) => {
    switch (status) {
      case "enrolled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Enrolled
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "dropped":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Dropped
          </span>
        );
      case "waitlisted":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Waitlisted
          </span>
        );
    }
  };

  const filteredEnrollments = enrollments.filter((e) => {
    if (searchTerm && !e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) && !e.studentId.includes(searchTerm)) {
      return false;
    }
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (yearFilter !== "all" && e.yearLevel !== yearFilter) return false;
    return true;
  });

  const stats = {
    total: enrollments.length,
    enrolled: enrollments.filter((e) => e.status === "enrolled").length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    dropped: enrollments.filter((e) => e.status === "dropped").length,
  };

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Enrollment Management</h1>
            <p className="text-muted-foreground">
              1st Semester, AY 2024-2025
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport(filteredEnrollments)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowEnrollDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              New Enrollment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total Enrollments</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Enrolled</p>
            <p className="text-2xl font-bold text-green-600">{stats.enrolled}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Dropped</p>
            <p className="text-2xl font-bold text-red-600">{stats.dropped}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EnrollmentStatus | "all")}
            >
              <option value="all">All Status</option>
              <option value="enrolled">Enrolled</option>
              <option value="pending">Pending</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="dropped">Dropped</option>
            </select>
            <select
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="all">All Year Levels</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>
        </div>

        {/* Enrollment Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Student
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Section
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Units
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">
                    Fees
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">
                    Paid
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr
                    key={enrollment.id}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          {enrollment.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.studentId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {enrollment.section}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.yearLevel}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">{enrollment.totalUnits}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(enrollment.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {formatPHP(enrollment.totalFees)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={enrollment.paid >= enrollment.totalFees ? "text-green-600" : "text-orange-600"}>
                        {formatPHP(enrollment.paid)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Enrollment Dialog */}
        {showEnrollDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">New Enrollment</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Year Level</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg">
                      <option value="">Select year level...</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Student</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg">
                      <option value="">Select student...</option>
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Section</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg">
                      <option value="">Select section...</option>
                      {sections.map((s) => (
                        <option key={s.id} value={s.code}>
                          {s.code} - {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Subjects</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-border rounded-lg p-3">
                    {subjects.map((subject) => (
                      <label key={subject.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>{subject.code} - {subject.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Enrollment Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Status</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg">
                      <option value="enrolled">Enrolled</option>
                      <option value="pending">Pending</option>
                      <option value="waitlisted">Waitlisted</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowEnrollDialog(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Student enrolled successfully!");
                    setShowEnrollDialog(false);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Enroll Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

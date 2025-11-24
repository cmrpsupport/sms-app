import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Calendar,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  UserX,
} from "lucide-react";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportData, ExportFormat } from "@/lib/exportUtils";
import { sectionStudents } from "@/lib/mockData";

type AttendanceStatus = "present" | "absent" | "late" | "excused";

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  remarks: string;
}

export default function FacultyAttendance() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "BIO101";
  const initialSection = searchParams.get("section") || "10-A";

  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const getInitialAttendance = (section: string): AttendanceRecord[] => {
    const sectionList = sectionStudents[section] || sectionStudents["10-A"];
    return sectionList.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      status: "present" as AttendanceStatus,
      remarks: "",
    }));
  };

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    getInitialAttendance(initialSection)
  );

  // Update attendance list when section changes
  useEffect(() => {
    setAttendance(getInitialAttendance(selectedSection));
  }, [selectedSection]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(attendance.map(a =>
      a.studentId === studentId ? { ...a, status } : a
    ));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setAttendance(attendance.map(a =>
      a.studentId === studentId ? { ...a, remarks } : a
    ));
  };

  const handleMarkAllPresent = () => {
    setAttendance(attendance.map(a => ({ ...a, status: "present" })));
    toast.success("All students marked as present");
  };

  const handleMarkAllAbsent = () => {
    setAttendance(attendance.map(a => ({ ...a, status: "absent" })));
    toast.success("All students marked as absent");
  };

  const handleSave = () => {
    toast.success("Attendance saved successfully!", {
      description: `${selectedSubject} - Section ${selectedSection} for ${new Date(selectedDate).toLocaleDateString("en-PH")}`,
    });
  };

  const handleExport = (format: ExportFormat) => {
    exportData(format, {
      title: "Attendance Record",
      subtitle: `${selectedSubject} - Section ${selectedSection}`,
      filename: `attendance_${selectedSubject}_${selectedSection}_${selectedDate}`,
      headers: ["Student ID", "Student Name", "Status", "Remarks"],
      data: attendance.map(a => [
        a.studentId,
        a.studentName,
        a.status.charAt(0).toUpperCase() + a.status.slice(1),
        a.remarks || "-"
      ]),
      additionalInfo: [
        { label: "Subject", value: selectedSubject },
        { label: "Section", value: selectedSection },
        { label: "Date", value: new Date(selectedDate).toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
      ],
      summary: [
        { label: "Present", value: stats.present.toString() },
        { label: "Absent", value: stats.absent.toString() },
        { label: "Late", value: stats.late.toString() },
        { label: "Excused", value: stats.excused.toString() },
      ],
    });
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "absent":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "late":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "excused":
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700 border-green-300";
      case "absent":
        return "bg-red-100 text-red-700 border-red-300";
      case "late":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "excused":
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  const stats = {
    present: attendance.filter(a => a.status === "present").length,
    absent: attendance.filter(a => a.status === "absent").length,
    late: attendance.filter(a => a.status === "late").length,
    excused: attendance.filter(a => a.status === "excused").length,
  };

  return (
    <Layout role="faculty">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground">
              Record daily class attendance
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Subject
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="BIO101">BIO101 - Biology 101</option>
                <option value="CHEM101">CHEM101 - Chemistry 101</option>
                <option value="PHYS101">PHYS101 - Physics 101</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Section
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="11-A">11-A</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleMarkAllPresent}
                className="flex items-center gap-1 px-3 py-2 border border-green-300 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold"
              >
                <UserCheck className="w-4 h-4" />
                All Present
              </button>
              <button
                onClick={handleMarkAllAbsent}
                className="flex items-center gap-1 px-3 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
              >
                <UserX className="w-4 h-4" />
                All Absent
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Present</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.present}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700">Absent</span>
            </div>
            <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">Late</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{stats.late}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Excused</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.excused}</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Student ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr
                    key={record.studentId}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-foreground">
                      {record.studentId}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {(["present", "absent", "late", "excused"] as AttendanceStatus[]).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(record.studentId, status)}
                            className={`p-2 rounded-lg border transition-colors ${
                              record.status === status
                                ? getStatusColor(status)
                                : "border-gray-200 hover:bg-gray-100"
                            }`}
                            title={status.charAt(0).toUpperCase() + status.slice(1)}
                          >
                            {getStatusIcon(status)}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="w-full px-3 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Add remarks..."
                        value={record.remarks}
                        onChange={(e) => handleRemarksChange(record.studentId, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 p-4 border-t border-border bg-gray-50">
            <ExportDropdown onExport={handleExport} />
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

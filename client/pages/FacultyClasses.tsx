import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Clock,
  MapPin,
  BookOpen,
  Edit,
  Eye,
  ClipboardList,
  Download,
} from "lucide-react";

export default function FacultyClasses() {
  // Mock faculty's assigned classes - matches FacultyAttendance/FacultyGrades subjects
  const classes = [
    {
      id: "CLASS-001",
      subjectCode: "BIO101",
      subjectName: "Biology 101",
      section: "10-A",
      schedule: "MWF 8:00-9:00 AM",
      room: "Lab 2",
      enrolled: 32,
      capacity: 40,
      units: 3,
    },
    {
      id: "CLASS-002",
      subjectCode: "BIO101",
      subjectName: "Biology 101",
      section: "10-B",
      schedule: "MWF 10:00-11:00 AM",
      room: "Lab 2",
      enrolled: 28,
      capacity: 40,
      units: 3,
    },
    {
      id: "CLASS-003",
      subjectCode: "CHEM101",
      subjectName: "Chemistry 101",
      section: "11-A",
      schedule: "TTH 1:00-2:30 PM",
      room: "Lab 1",
      enrolled: 25,
      capacity: 35,
      units: 3,
    },
    {
      id: "CLASS-004",
      subjectCode: "PHYS101",
      subjectName: "Physics 101",
      section: "10-A",
      schedule: "MWF 10:00-11:00 AM",
      room: "Lab 3",
      enrolled: 28,
      capacity: 35,
      units: 3,
    },
    {
      id: "CLASS-005",
      subjectCode: "PHYS101",
      subjectName: "Physics 101",
      section: "11-A",
      schedule: "TTH 8:00-9:30 AM",
      room: "Lab 3",
      enrolled: 30,
      capacity: 35,
      units: 3,
    },
  ];

  const totalUnits = classes.reduce((sum, c) => sum + c.units, 0);
  const totalStudents = classes.reduce((sum, c) => sum + c.enrolled, 0);

  const handleExportSchedule = () => {
    const headers = ["Subject Code", "Subject Name", "Section", "Schedule", "Room", "Enrolled", "Capacity", "Units"];
    const csvContent = [
      headers.join(","),
      ...classes.map(c =>
        [c.subjectCode, `"${c.subjectName}"`, c.section, `"${c.schedule}"`, c.room, c.enrolled, c.capacity, c.units].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `my_classes_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout role="faculty">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Classes</h1>
            <p className="text-muted-foreground">
              1st Semester, AY 2024-2025
            </p>
          </div>
          <button
            onClick={handleExportSchedule}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Schedule
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classes.length}</p>
                <p className="text-sm text-muted-foreground">Classes Assigned</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalUnits}</p>
                <p className="text-sm text-muted-foreground">Teaching Load (Units)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Cards */}
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Class Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-primary">
                      {classItem.subjectCode}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {classItem.section}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {classItem.subjectName}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {classItem.schedule}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {classItem.room}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {classItem.enrolled}/{classItem.capacity} students
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/faculty-classes/${classItem.id}?subject=${classItem.subjectCode}&section=${classItem.section}`}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Class List
                  </Link>
                  <Link
                    to={`/faculty-attendance?subject=${classItem.subjectCode}&section=${classItem.section}`}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Attendance
                  </Link>
                  <Link
                    to={`/faculty-grades?subject=${classItem.subjectCode}&section=${classItem.section}`}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Enter Grades
                  </Link>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Enrollment</span>
                  <span className="font-semibold">
                    {Math.round((classItem.enrolled / classItem.capacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      classItem.enrolled / classItem.capacity > 0.9
                        ? "bg-orange-500"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${(classItem.enrolled / classItem.capacity) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

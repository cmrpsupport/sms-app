import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Clock,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";

export default function FacultyDashboard() {
  const schedule = [
    {
      time: "8:00 AM - 9:30 AM",
      subject: "Biology 101",
      section: "Grade 10-A",
      room: "Lab 2",
      students: 32,
    },
    {
      time: "9:45 AM - 11:15 AM",
      subject: "Biology 102",
      section: "Grade 10-B",
      room: "Room 205",
      students: 28,
    },
    {
      time: "1:00 PM - 2:30 PM",
      subject: "Advanced Biology",
      section: "Grade 11",
      room: "Lab 1",
      students: 25,
    },
  ];

  const classesWithPendingGrades = [
    {
      subject: "Biology 101",
      section: "Grade 10-A",
      count: 5,
      deadline: "December 1",
    },
    {
      subject: "Biology 102",
      section: "Grade 10-B",
      count: 8,
      deadline: "December 3",
    },
  ];

  const announcements = [
    {
      title: "Grade Submission Deadline",
      content: "Please submit all Q2 grades by December 15",
      date: "Nov 28",
    },
    {
      title: "New Laboratory Procedures",
      content: "Updated safety protocols are available in the portal",
      date: "Nov 25",
    },
    {
      title: "Faculty Meeting",
      content: "Monthly faculty meeting scheduled for December 5 at 3:00 PM",
      date: "Nov 20",
    },
  ];

  const upcomingTasks = [
    {
      title: "Record Attendance",
      due: "Today at 4:00 PM",
      completed: false,
    },
    {
      title: "Submit Lab Reports Grades",
      due: "Tomorrow",
      completed: false,
    },
    {
      title: "Update Class Notes",
      due: "December 1",
      completed: true,
    },
  ];

  return (
    <Layout role="faculty">
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome, Dr. Rodriguez
          </h1>
          <p className="text-muted-foreground">
            Your teaching schedule and class management at a glance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-12 h-12 text-primary-100" />
              <span className="text-xs bg-primary-100 text-primary px-2 py-1 rounded-full font-semibold">
                Total
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Students Enrolled
            </h3>
            <p className="text-3xl font-bold text-foreground">85</p>
            <p className="text-xs text-muted-foreground mt-2">
              Across 3 classes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-12 h-12 text-purple-100" />
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
                Pending
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Grades to Submit
            </h3>
            <p className="text-3xl font-bold text-foreground">13</p>
            <p className="text-xs text-muted-foreground mt-2">
              Across 2 classes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-12 h-12 text-teal-100" />
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-semibold">
                Today
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Classes Today
            </h3>
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground mt-2">
              Starting at 8:00 AM
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Today's Schedule
            </h2>

            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {item.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.section} • Room {item.room}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.time} • {item.students} students
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Announcements</h2>
            </div>

            <div className="space-y-4">
              {announcements.map((item, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-border last:border-b-0"
                >
                  <p className="font-semibold text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Grades and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classes with Pending Grades */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold text-foreground">
                Grades Pending Submission
              </h2>
            </div>

            <div className="space-y-4">
              {classesWithPendingGrades.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.subject}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.section}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-orange-600">
                      {item.count} grades
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-orange-600">
                      Due: {item.deadline}
                    </p>
                    <Link
                      to="/faculty-grades"
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <Edit className="w-3 h-3" />
                      Enter Grades
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              My Tasks
            </h2>

            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mt-1">
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-sm ${
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

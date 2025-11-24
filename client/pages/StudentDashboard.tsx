import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Calendar,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export default function StudentDashboard() {
  const currentGrades = [
    {
      subject: "Biology 101",
      instructor: "Dr. Rodriguez",
      grade: "A-",
      gpa: "3.7",
      progress: 85,
    },
    {
      subject: "Mathematics 101",
      instructor: "Prof. Garcia",
      grade: "B+",
      gpa: "3.5",
      progress: 78,
    },
    {
      subject: "English Literature",
      instructor: "Mrs. Santos",
      grade: "A",
      gpa: "4.0",
      progress: 92,
    },
    {
      subject: "Chemistry 101",
      instructor: "Prof. Reyes",
      grade: "B",
      gpa: "3.2",
      progress: 72,
    },
  ];

  const schedule = [
    {
      day: "Monday",
      time: "8:00 AM - 9:30 AM",
      subject: "Biology 101",
      room: "Lab 2",
      instructor: "Dr. Rodriguez",
    },
    {
      day: "Monday",
      time: "10:00 AM - 11:30 AM",
      subject: "Mathematics 101",
      room: "Room 105",
      instructor: "Prof. Garcia",
    },
    {
      day: "Tuesday",
      time: "8:00 AM - 9:30 AM",
      subject: "English Literature",
      room: "Room 210",
      instructor: "Mrs. Santos",
    },
    {
      day: "Wednesday",
      time: "1:00 PM - 2:30 PM",
      subject: "Chemistry 101",
      room: "Lab 1",
      instructor: "Prof. Reyes",
    },
  ];

  const accountSummary = {
    totalFees: "₱45,000",
    paid: "₱30,000",
    balance: "₱15,000",
    dueDate: "January 15, 2026",
  };

  const announcements = [
    {
      title: "Midterm Exam Schedule",
      date: "Nov 28",
    },
    {
      title: "Library Hours Extended",
      date: "Nov 25",
    },
    {
      title: "Scholarship Applications Open",
      date: "Nov 20",
    },
  ];

  return (
    <Layout role="student">
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome, Maria Santos
          </h1>
          <p className="text-muted-foreground">
            Grade 10-A • Academic Year 2024-2025
          </p>
        </div>

        {/* GPA and Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-12 h-12 text-primary-100" />
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                Good Standing
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Current GPA
            </h3>
            <p className="text-3xl font-bold text-foreground">3.6</p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on 4 subjects
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-12 h-12 text-accent/20" />
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-semibold">
                Active
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Enrolled Subjects
            </h3>
            <p className="text-3xl font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground mt-2">
              12 units this semester
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-12 h-12 text-purple-100" />
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold">
                Upcoming
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-2">
              Next Exam
            </h3>
            <p className="text-lg font-bold text-foreground">Dec 5</p>
            <p className="text-xs text-muted-foreground mt-2">
              Midterm Exams
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Grades */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Current Grades
            </h2>

            <div className="space-y-4">
              {currentGrades.map((grade, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {grade.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {grade.instructor}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {grade.grade}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-muted-foreground">
                      GPA: {grade.gpa}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${grade.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Statement of Account
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Total Fees
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {accountSummary.totalFees}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Paid</p>
                  <p className="font-bold text-green-600">
                    {accountSummary.paid}
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Balance</p>
                  <p className="font-bold text-orange-600">
                    {accountSummary.balance}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-600 mb-2">Due Date</p>
                <p className="text-sm font-semibold text-foreground">
                  {accountSummary.dueDate}
                </p>
              </div>

              <Link
                to="/student-account"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm"
              >
                <CreditCard className="w-4 h-4" />
                View Account
              </Link>
            </div>
          </div>
        </div>

        {/* Schedule and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Weekly Schedule
              </h2>
              <Link
                to="/student-schedule"
                className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View Full Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {item.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.day} • {item.time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.room} • {item.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Announcements
            </h2>

            <div className="space-y-4">
              {announcements.map((item, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-border last:border-b-0"
                >
                  <p className="font-semibold text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

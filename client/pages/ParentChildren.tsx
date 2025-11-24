import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  User,
  TrendingUp,
  DollarSign,
  Calendar,
  BookOpen,
  Eye,
  Clock,
  FileText,
  MessageSquare,
  Bell,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { formatPHP } from "@/lib/mockData";
import { toast } from "sonner";

export default function ParentChildren() {
  const [selectedChild, setSelectedChild] = useState("2024-0001");

  const children = [
    {
      id: "2024-0001",
      name: "Maria Santos",
      photo: null,
      yearLevel: "Grade 10",
      section: "10-A",
      gpa: 3.6,
      status: "active",
      balance: 15000,
      totalFees: 45000,
      subjects: 6,
      attendance: 95,
    },
    {
      id: "2024-0009",
      name: "Juan Santos",
      photo: null,
      yearLevel: "Grade 8",
      section: "8-B",
      gpa: 3.4,
      status: "active",
      balance: 0,
      totalFees: 40000,
      subjects: 6,
      attendance: 98,
    },
  ];

  const selectedChildData = children.find(c => c.id === selectedChild) || children[0];

  const grades = [
    { subject: "Biology 101", grade: 87.9, status: "PASSED" },
    { subject: "Mathematics 101", grade: 81.9, status: "PASSED" },
    { subject: "English Literature", grade: 94.4, status: "PASSED" },
    { subject: "Chemistry 101", grade: 75.3, status: "PASSED" },
    { subject: "Philippine History", grade: 88.1, status: "PASSED" },
    { subject: "Physical Education", grade: 93.5, status: "PASSED" },
  ];

  const recentActivities = [
    { date: "Nov 20", activity: "Midterm exam in Biology 101", type: "exam" },
    { date: "Nov 18", activity: "Submitted Science project", type: "submission" },
    { date: "Nov 15", activity: "Attended Parent-Teacher meeting", type: "event" },
    { date: "Nov 10", activity: "Payment received - ₱15,000", type: "payment" },
  ];

  const schedule = [
    { day: "Mon", subjects: ["Mathematics", "English", "Science", "Filipino", "PE"] },
    { day: "Tue", subjects: ["Science", "Math", "History", "TLE", "Music"] },
    { day: "Wed", subjects: ["English", "Filipino", "Science", "Math", "Art"] },
    { day: "Thu", subjects: ["History", "TLE", "Math", "Science", "English"] },
    { day: "Fri", subjects: ["Filipino", "PE", "Music", "Art", "Math"] },
  ];

  const paymentHistory = [
    { date: "Nov 10, 2024", or: "OR-2024-001200", amount: 15000, method: "GCash" },
    { date: "Sep 15, 2024", or: "OR-2024-000850", amount: 15000, method: "Cash" },
    { date: "Jul 20, 2024", or: "OR-2024-000520", amount: 15000, method: "Bank Transfer" },
  ];

  const upcomingEvents = [
    { date: "Nov 28", event: "Faculty Meeting - No PM Classes", type: "announcement" },
    { date: "Nov 30", event: "Bonifacio Day - Holiday", type: "holiday" },
    { date: "Dec 5-6", event: "Intramurals 2024", type: "event" },
  ];

  const handlePayNow = () => {
    toast.info("Redirecting to payment gateway...");
  };

  const handleMessageTeacher = () => {
    toast.success("Message sent to class adviser");
  };

  return (
    <Layout role="parent">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Children</h1>
            <p className="text-muted-foreground">
              View academic progress and account information
            </p>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex gap-4">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                selectedChild === child.id
                  ? "border-primary bg-primary-50"
                  : "border-border bg-white hover:border-primary/50"
              }`}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{child.name}</p>
                <p className="text-xs text-muted-foreground">
                  {child.yearLevel} - {child.section}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Child Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{selectedChildData.gpa.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Current GPA</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{selectedChildData.subjects}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{selectedChildData.attendance}%</p>
                <p className="text-sm text-muted-foreground">Attendance</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedChildData.balance > 0 ? "bg-orange-100" : "bg-green-100"
              }`}>
                <DollarSign className={`w-5 h-5 ${
                  selectedChildData.balance > 0 ? "text-orange-600" : "text-green-600"
                }`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  selectedChildData.balance > 0 ? "text-orange-600" : "text-green-600"
                }`}>
                  {selectedChildData.balance > 0 ? formatPHP(selectedChildData.balance) : "Paid"}
                </p>
                <p className="text-sm text-muted-foreground">Balance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Grades */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Current Grades</h3>
            <div className="space-y-3">
              {grades.map((grade, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{grade.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${
                      grade.grade >= 85 ? "text-green-600" :
                      grade.grade >= 75 ? "text-orange-600" : "text-red-600"
                    }`}>
                      {grade.grade.toFixed(1)}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      grade.status === "PASSED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {grade.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === "exam" ? "bg-purple-500" :
                    activity.type === "payment" ? "bg-green-500" :
                    activity.type === "submission" ? "bg-blue-500" : "bg-orange-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/student-grades?role=parent"
            className="bg-white p-4 rounded-xl border border-border hover:border-primary/50 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">View Grades</p>
              <p className="text-xs text-muted-foreground">Full report</p>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </Link>
          <Link
            to="/student-schedule?role=parent"
            className="bg-white p-4 rounded-xl border border-border hover:border-primary/50 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Schedule</p>
              <p className="text-xs text-muted-foreground">Class times</p>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </Link>
          <Link
            to="/calendar?role=parent"
            className="bg-white p-4 rounded-xl border border-border hover:border-primary/50 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Calendar</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </Link>
          <button
            onClick={handleMessageTeacher}
            className="bg-white p-4 rounded-xl border border-border hover:border-primary/50 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Message</p>
              <p className="text-xs text-muted-foreground">Adviser</p>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </button>
        </div>

        {/* Account Summary */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Account Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Fees</p>
              <p className="text-xl font-bold">{formatPHP(selectedChildData.totalFees)}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-xl font-bold text-green-600">
                {formatPHP(selectedChildData.totalFees - selectedChildData.balance)}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${selectedChildData.balance > 0 ? "bg-orange-50" : "bg-green-50"}`}>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className={`text-xl font-bold ${selectedChildData.balance > 0 ? "text-orange-600" : "text-green-600"}`}>
                {selectedChildData.balance > 0 ? formatPHP(selectedChildData.balance) : "Fully Paid"}
              </p>
            </div>
          </div>
          {selectedChildData.balance > 0 && (
            <button
              onClick={handlePayNow}
              className="mt-4 w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          )}
        </div>

        {/* Payment History & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment History */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Payment History</h3>
            <div className="space-y-3">
              {paymentHistory.map((payment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{payment.or}</p>
                    <p className="text-xs text-muted-foreground">{payment.date} • {payment.method}</p>
                  </div>
                  <span className="font-bold text-green-600">{formatPHP(payment.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    item.type === "holiday" ? "bg-red-500" :
                    item.type === "event" ? "bg-blue-500" : "bg-orange-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/calendar?role=parent"
              className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
            >
              View full calendar <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">This Week's Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-sm font-semibold text-muted-foreground">Time</th>
                  {schedule.map(day => (
                    <th key={day.day} className="text-center p-2 text-sm font-semibold">{day.day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map(period => (
                  <tr key={period} className="border-t border-border">
                    <td className="p-2 text-xs text-muted-foreground">
                      {["7:00-8:00", "8:00-9:00", "9:00-10:00", "10:30-11:30", "1:00-2:00"][period]}
                    </td>
                    {schedule.map(day => (
                      <td key={day.day} className="p-2 text-center">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {day.subjects[period]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

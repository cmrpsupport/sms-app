import Layout from "@/components/Layout";
import {
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function ParentDashboard() {
  const children = [
    {
      name: "Maria Santos",
      grade: "Grade 10-A",
      gpa: "3.6",
      status: "Good Standing",
      statusColor: "green",
    },
    {
      name: "Juan Santos",
      grade: "Grade 8-B",
      gpa: "3.4",
      status: "Good Standing",
      statusColor: "green",
    },
  ];

  const gradesOverview = [
    {
      childName: "Maria Santos",
      subject: "Biology 101",
      grade: "A-",
      instructor: "Dr. Rodriguez",
    },
    {
      childName: "Maria Santos",
      subject: "Mathematics 101",
      grade: "B+",
      instructor: "Prof. Garcia",
    },
    {
      childName: "Juan Santos",
      subject: "English Literature",
      grade: "A",
      instructor: "Mrs. Santos",
    },
    {
      childName: "Juan Santos",
      subject: "History",
      grade: "B",
      instructor: "Mr. Lopez",
    },
  ];

  const accounts = [
    {
      childName: "Maria Santos",
      totalFees: "₱45,000",
      paid: "₱30,000",
      balance: "₱15,000",
      dueDate: "January 15, 2026",
      status: "pending",
    },
    {
      childName: "Juan Santos",
      totalFees: "₱45,000",
      paid: "₱45,000",
      balance: "₱0",
      dueDate: "N/A",
      status: "paid",
    },
  ];

  const announcements = [
    {
      title: "Parent-Teacher Conference",
      date: "December 5, 2024",
      content: "Annual P-T conference coming up",
    },
    {
      title: "Midterm Exam Schedule",
      date: "December 1, 2024",
      content: "Exams from Dec 5-15",
    },
    {
      title: "Holiday Break",
      date: "December 15, 2024",
      content: "School closes for holiday break",
    },
  ];

  return (
    <Layout role="parent">
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome, Parent
          </h1>
          <p className="text-muted-foreground">
            Monitor your children's academic progress and account status
          </p>
        </div>

        {/* Children Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.grade}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    child.statusColor === "green"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {child.status}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">GPA</p>
                <p className="text-2xl font-bold text-foreground">{child.gpa}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Recent Grades</h2>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-4">
              {gradesOverview.map((grade, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {grade.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {grade.childName} • {grade.instructor}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {grade.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-primary" />
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

        {/* Account Status */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Statement of Accounts
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accounts.map((account, index) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {account.childName}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      account.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {account.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Fees
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {account.totalFees}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Paid</p>
                      <p className="font-bold text-green-600">
                        {account.paid}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        account.status === "paid"
                          ? "bg-gray-50"
                          : "bg-orange-50"
                      }`}
                    >
                      <p className="text-xs text-muted-foreground mb-1">
                        Balance
                      </p>
                      <p
                        className={`font-bold ${
                          account.status === "paid"
                            ? "text-gray-600"
                            : "text-orange-600"
                        }`}
                      >
                        {account.balance}
                      </p>
                    </div>
                  </div>

                  {account.status !== "paid" && (
                    <>
                      <p className="text-xs text-muted-foreground">
                        Due: {account.dueDate}
                      </p>
                      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm">
                        Make Payment
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

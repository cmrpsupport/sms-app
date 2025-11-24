import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  students,
  subjects,
  getTotalReceivables,
  getTotalCollections,
  getStudentsWithBalance,
  formatPHP,
} from "@/lib/mockData";

export default function AdminDashboard() {
  const totalReceivables = getTotalReceivables();
  const totalCollections = getTotalCollections();
  const studentsWithBalance = getStudentsWithBalance();

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      change: "+12%",
      positive: true,
      icon: Users,
      color: "bg-primary-100 text-primary",
    },
    {
      title: "Active Subjects",
      value: subjects.length.toString(),
      change: "+4%",
      positive: true,
      icon: BookOpen,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Collections",
      value: formatPHP(totalCollections),
      change: "+8%",
      positive: true,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Receivables",
      value: formatPHP(totalReceivables),
      change: `${studentsWithBalance.length} students`,
      positive: false,
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentActivities = [
    {
      type: "enrollment",
      title: "New student enrolled",
      description: "Maria Santos enrolled in Grade 10-A",
      timestamp: "2 hours ago",
    },
    {
      type: "payment",
      title: "Payment received",
      description: "John Dela Cruz - Tuition fees (Complete)",
      timestamp: "4 hours ago",
    },
    {
      type: "schedule",
      title: "Class schedule updated",
      description: "Biology Lab timing changed to 2:00 PM",
      timestamp: "6 hours ago",
    },
    {
      type: "grade",
      title: "Grades submitted",
      description: "Mr. Rodriguez submitted Q1 grades for Grade 11",
      timestamp: "1 day ago",
    },
  ];

  const upcomingEvents = [
    {
      title: "1st Quarter Exams",
      date: "November 25 - 29",
      status: "upcoming",
    },
    {
      title: "Parent-Teacher Conference",
      date: "December 5",
      status: "upcoming",
    },
    {
      title: "Enrollment Period Closing",
      date: "December 15",
      status: "urgent",
    },
    {
      title: "Year-End Report Distribution",
      date: "January 10",
      status: "upcoming",
    },
  ];

  return (
    <Layout role="admin">
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, Administrator
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your school today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.positive ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <h3 className="text-muted-foreground text-sm mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Recent Activities
              </h2>
              <button className="text-primary hover:text-primary-700 text-sm font-semibold flex items-center gap-1">
                View All
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-primary-200"
                >
                  <div className="w-3 h-3 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Upcoming Events
              </h2>
              <Calendar className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    event.status === "urgent"
                      ? "bg-orange-50 border-l-orange-500"
                      : "bg-primary-50 border-l-primary"
                  }`}
                >
                  <p className="font-semibold text-foreground text-sm">
                    {event.title}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      event.status === "urgent"
                        ? "text-orange-600"
                        : "text-primary-600"
                    }`}
                  >
                    {event.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Link to="/students" className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors text-center">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  View Students
                </p>
              </Link>

              <Link to="/academics" className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors text-center">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Academics
                </p>
              </Link>

              <Link to="/accounting" className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors text-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Accounting
                </p>
              </Link>

              <Link to="/reports" className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  View Reports
                </p>
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              System Performance
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">
                    Database Health
                  </p>
                  <span className="text-sm font-bold text-green-600">
                    98%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">
                    Storage Used
                  </p>
                  <span className="text-sm font-bold text-primary">64%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "64%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">
                    Uptime
                  </p>
                  <span className="text-sm font-bold text-green-600">
                    99.8%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "99.8%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-sm text-foreground font-semibold mb-1">
                ✓ All systems operational
              </p>
              <p className="text-xs text-muted-foreground">
                Last updated: Just now
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

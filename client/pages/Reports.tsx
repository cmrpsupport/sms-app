import { useState } from "react";
import Layout from "@/components/Layout";
import {
  BarChart3,
  Download,
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  GraduationCap,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  students,
  sections,
  getTotalReceivables,
  getTotalCollections,
  formatPHP,
} from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportToPDF, exportToExcel, exportToCSV, formatPHPForExport } from "@/lib/exportUtils";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedReport, setSelectedReport] = useState("all");

  // Enrollment by year level
  const enrollmentData = [
    { name: "Grade 7", students: 78, male: 40, female: 38 },
    { name: "Grade 8", students: 74, male: 35, female: 39 },
    { name: "Grade 9", students: 80, male: 42, female: 38 },
    { name: "Grade 10", students: 72, male: 36, female: 36 },
    { name: "Grade 11", students: 65, male: 30, female: 35 },
    { name: "Grade 12", students: 58, male: 28, female: 30 },
  ];

  // Monthly collections
  const monthlyCollections = [
    { month: "Jun", collections: 850000, target: 900000 },
    { month: "Jul", collections: 720000, target: 800000 },
    { month: "Aug", collections: 680000, target: 750000 },
    { month: "Sep", collections: 920000, target: 850000 },
    { month: "Oct", collections: 780000, target: 800000 },
    { month: "Nov", collections: 650000, target: 700000 },
  ];

  // Payment status
  const paidCount = students.filter(s => s.balance === 0).length;
  const unpaidCount = students.filter(s => s.balance > 0).length;
  const paymentStatusData = [
    { name: "Fully Paid", value: paidCount, color: "#10b981" },
    { name: "With Balance", value: unpaidCount, color: "#f59e0b" },
  ];

  // GPA Distribution
  const gpaDistribution = [
    { range: "90-100", count: 45, label: "Outstanding" },
    { range: "85-89", count: 89, label: "Very Satisfactory" },
    { range: "80-84", count: 120, label: "Satisfactory" },
    { range: "75-79", count: 98, label: "Fairly Satisfactory" },
    { range: "Below 75", count: 25, label: "Needs Improvement" },
  ];

  // Scholarship distribution
  const scholarshipData = [
    { name: "Full Scholarship", value: 15, color: "#3b82f6" },
    { name: "Partial (50%)", value: 28, color: "#8b5cf6" },
    { name: "Financial Aid", value: 42, color: "#06b6d4" },
    { name: "Regular", value: 342, color: "#e5e7eb" },
  ];

  // Section capacity
  const sectionCapacityData = sections.slice(0, 8).map(s => ({
    name: s.code,
    enrolled: s.enrolled,
    capacity: s.capacity,
    utilization: Math.round((s.enrolled / s.capacity) * 100),
  }));

  // Attendance trends
  const attendanceTrends = [
    { week: "Week 1", present: 95, absent: 5 },
    { week: "Week 2", present: 93, absent: 7 },
    { week: "Week 3", present: 97, absent: 3 },
    { week: "Week 4", present: 94, absent: 6 },
    { week: "Week 5", present: 96, absent: 4 },
    { week: "Week 6", present: 92, absent: 8 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#06b6d4"];

  const totalReceivables = getTotalReceivables();
  const totalCollections = getTotalCollections();
  const totalStudents = enrollmentData.reduce((sum, d) => sum + d.students, 0);
  const collectionRate = Math.round((totalCollections / (totalCollections + totalReceivables)) * 100);

  const handleExportReport = (reportType: string) => {
    toast.success(`${reportType} report exported successfully!`);
  };

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    const headers = ["Metric", "Value"];
    const data = [
      ["Total Students", totalStudents.toString()],
      ["Total Sections", sections.length.toString()],
      ["Total Collections", formatPHPForExport(totalCollections)],
      ["Total Receivables", formatPHPForExport(totalReceivables)],
      ["Collection Rate", `${collectionRate}%`],
      ["Fully Paid Students", paidCount.toString()],
      ["Students with Balance", unpaidCount.toString()],
    ];

    if (format === "pdf") {
      exportToPDF({
        title: "School Management System - Summary Report",
        headers,
        data,
        filename: "sms-summary-report",
        summary: [
          { label: "Report Period", value: "SY 2024-2025" },
          { label: "Generated", value: new Date().toLocaleDateString("en-PH") },
        ],
      });
    } else if (format === "excel") {
      exportToExcel({ title: "Summary Report", headers, data, filename: "sms-summary-report" });
    } else {
      exportToCSV({ headers, data, filename: "sms-summary-report" });
    }
  };

  const reportTypes = [
    {
      title: "Enrollment Summary",
      description: "Student enrollment statistics by grade level and section",
      icon: Users,
      color: "bg-primary-100 text-primary",
    },
    {
      title: "Financial Report",
      description: "Collections, receivables, and payment history",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Academic Performance",
      description: "GPA distribution and grade analytics",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Attendance Report",
      description: "Daily and weekly attendance records",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and downloadable reports
            </p>
          </div>
          <ExportDropdown onExport={handleExport} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm"
            >
              <option value="current">Current Semester</option>
              <option value="sy2024">SY 2024-2025</option>
              <option value="sy2023">SY 2023-2024</option>
              <option value="all">All Time</option>
            </select>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm"
            >
              <option value="all">All Reports</option>
              <option value="enrollment">Enrollment</option>
              <option value="financial">Financial</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">Total Students</p>
            </div>
            <p className="text-2xl font-bold">{totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-muted-foreground">Sections</p>
            </div>
            <p className="text-2xl font-bold">{sections.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <p className="text-xs text-muted-foreground">Collections</p>
            </div>
            <p className="text-xl font-bold text-green-600">{formatPHP(totalCollections)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <p className="text-xs text-muted-foreground">Receivables</p>
            </div>
            <p className="text-xl font-bold text-orange-600">{formatPHP(totalReceivables)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <PieChartIcon className="w-4 h-4 text-cyan-500" />
              <p className="text-xs text-muted-foreground">Collection Rate</p>
            </div>
            <p className="text-2xl font-bold text-cyan-600">{collectionRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <p className="text-xs text-muted-foreground">Avg Attendance</p>
            </div>
            <p className="text-2xl font-bold text-indigo-600">94.5%</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment by Year Level */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Enrollment by Year Level</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="#3b82f6" name="Male" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="female" fill="#ec4899" name="Female" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Collections */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Monthly Collections vs Target</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyCollections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip formatter={(value: number) => formatPHP(value)} />
                  <Legend />
                  <Area type="monotone" dataKey="target" stroke="#e5e7eb" fill="#f3f4f6" name="Target" />
                  <Area type="monotone" dataKey="collections" stroke="#10b981" fill="#d1fae5" name="Collections" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Status */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Payment Status</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {paymentStatusData.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Distribution */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">GPA Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gpaDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={11} />
                  <YAxis dataKey="range" type="category" fontSize={10} width={60} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scholarship Distribution */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Scholarship Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scholarshipData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scholarshipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {scholarshipData.map((item, i) => (
                <div key={i} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section Capacity */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Section Enrollment vs Capacity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionCapacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="enrolled" fill="#3b82f6" name="Enrolled" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Trends */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Weekly Attendance Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" fontSize={11} />
                  <YAxis fontSize={11} domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#10b981" name="Present %" strokeWidth={2} />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" name="Absent %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Report Downloads */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Generate Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((report, index) => {
              const Icon = report.icon;
              return (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${report.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {report.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {report.description}
                  </p>
                  <button
                    onClick={() => handleExportReport(report.title)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Export PDF
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

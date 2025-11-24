import { useState } from "react";
import Layout from "@/components/Layout";
import {
  School,
  Calendar,
  DollarSign,
  Users,
  Bell,
  Shield,
  Database,
  Save,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const [schoolName, setSchoolName] = useState("Sample Academy");
  const [schoolAddress, setSchoolAddress] = useState("123 Education St., Manila, Philippines");
  const [schoolEmail, setSchoolEmail] = useState("info@sampleacademy.edu.ph");
  const [schoolPhone, setSchoolPhone] = useState("(02) 1234-5678");

  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [currentTerm, setCurrentTerm] = useState("1st Semester");
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [gradeSubmissionDeadline, setGradeSubmissionDeadline] = useState("2024-12-15");

  const [passingGrade, setPassingGrade] = useState("75");
  const [latePenalty, setLatePenalty] = useState("5");
  const [gracePeriod, setGracePeriod] = useState("7");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Configure system preferences and policies
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="school" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-1">
            <TabsTrigger value="school" className="flex items-center gap-2">
              <School className="w-4 h-4" />
              School Info
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* School Information */}
          <TabsContent value="school">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">School Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    School Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={schoolPhone}
                    onChange={(e) => setSchoolPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={schoolAddress}
                    onChange={(e) => setSchoolAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">
                  School Logo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload school logo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Academic Settings */}
          <TabsContent value="academic">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">Academic Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Current Academic Year
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Current Term
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={currentTerm}
                    onChange={(e) => setCurrentTerm(e.target.value)}
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Passing Grade
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={passingGrade}
                    onChange={(e) => setPassingGrade(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Grade Submission Deadline
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={gradeSubmissionDeadline}
                    onChange={(e) => setGradeSubmissionDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Enrollment Period</p>
                  <p className="text-sm text-muted-foreground">
                    Allow students to enroll online
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enrollmentOpen}
                    onChange={(e) => setEnrollmentOpen(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </TabsContent>

          {/* Financial Settings */}
          <TabsContent value="financial">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">Financial Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Late Payment Penalty (%)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={latePenalty}
                    onChange={(e) => setLatePenalty(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Grace Period (Days)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Payment Methods</h4>
                <div className="space-y-2">
                  {["Cash", "Check", "Bank Transfer", "GCash", "PayMaya"].map((method) => (
                    <label key={method} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">User Management</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Allow Self Registration</p>
                    <p className="text-sm text-muted-foreground">
                      New users can create their own accounts
                    </p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Email Verification Required</p>
                    <p className="text-sm text-muted-foreground">
                      Users must verify email before accessing system
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">Notification Settings</h3>

              <div className="space-y-4">
                {[
                  { label: "Payment Reminders", desc: "Send reminders for upcoming due dates" },
                  { label: "Grade Notifications", desc: "Notify students when grades are posted" },
                  { label: "Enrollment Alerts", desc: "Alert students when enrollment opens" },
                  { label: "Attendance Warnings", desc: "Notify parents of excessive absences" },
                  { label: "System Announcements", desc: "Broadcast important system updates" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-bold text-foreground">Security Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="30"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="5"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Password Min Length
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="8"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="90"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <p className="font-semibold text-blue-800">Database Backup</p>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Last backup: November 20, 2024 at 3:00 AM
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  Backup Now
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

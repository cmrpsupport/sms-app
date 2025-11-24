import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelector from "./pages/RoleSelector";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Students from "./pages/Students";
import Academics from "./pages/Academics";
import Accounting from "./pages/Accounting";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import FacultyGrades from "./pages/FacultyGrades";
import FacultyClasses from "./pages/FacultyClasses";
import FacultyAttendance from "./pages/FacultyAttendance";
import StudentSchedule from "./pages/StudentSchedule";
import StudentAccount from "./pages/StudentAccount";
import StudentGrades from "./pages/StudentGrades";
import ParentChildren from "./pages/ParentChildren";
import Notifications from "./pages/Notifications";
import Enrollment from "./pages/Enrollment";
import StudentEnrollment from "./pages/StudentEnrollment";
import Calendar from "./pages/Calendar";
import StudentProfile from "./pages/StudentProfile";
import Payments from "./pages/Payments";
import AcademicSetup from "./pages/AcademicSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Role Selector */}
            <Route path="/" element={<RoleSelector />} />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
            <Route path="/academic-setup" element={<AcademicSetup />} />

            {/* Faculty Routes */}
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty-classes" element={<FacultyClasses />} />
            <Route path="/faculty-grades" element={<FacultyGrades />} />
            <Route path="/faculty-attendance" element={<FacultyAttendance />} />

            {/* Student Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-schedule" element={<StudentSchedule />} />
            <Route path="/student-account" element={<StudentAccount />} />
            <Route path="/student-grades" element={<StudentGrades />} />
            <Route path="/student-enrollment" element={<StudentEnrollment />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Parent Routes */}
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/parent-children" element={<ParentChildren />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

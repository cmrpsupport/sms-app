import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
  ClipboardList,
  Bell,
  UserPlus,
  Calendar,
  CreditCard,
  GraduationCap,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
  role?: "admin" | "faculty" | "student" | "parent";
}

interface NavItem {
  icon: any;
  label: string;
  path: string;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

type NavStructure = (NavItem | NavGroup)[];

export default function Layout({ children, role = "admin" }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const location = useLocation();

  const isActive = (path: string) => {
    const pathWithoutQuery = path.split("?")[0];
    return location.pathname === pathWithoutQuery;
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label)
        ? prev.filter(g => g !== label)
        : [...prev, label]
    );
  };

  const isGroupItem = (item: NavItem | NavGroup): item is NavGroup => {
    return 'items' in item;
  };

  const getNavItems = (): NavStructure => {
    switch (role) {
      case "admin":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/admin-dashboard" },
          {
            label: "Academic",
            items: [
              { icon: Users, label: "Students", path: "/students" },
              { icon: UserPlus, label: "Enrollment", path: "/enrollment" },
              { icon: GraduationCap, label: "Academic Setup", path: "/academic-setup" },
              { icon: BookOpen, label: "Academics", path: "/academics" },
            ],
          },
          {
            label: "Finance",
            items: [
              { icon: DollarSign, label: "Accounting", path: "/accounting" },
              { icon: CreditCard, label: "Payments", path: "/payments" },
            ],
          },
          { icon: Calendar, label: "Calendar", path: "/calendar?role=admin" },
          { icon: BarChart3, label: "Reports", path: "/reports" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case "faculty":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/faculty-dashboard" },
          { icon: BookOpen, label: "My Classes", path: "/faculty-classes" },
          { icon: ClipboardList, label: "Attendance", path: "/faculty-attendance" },
          { icon: BarChart3, label: "Grade Entry", path: "/faculty-grades" },
          { icon: Calendar, label: "Calendar", path: "/calendar?role=faculty" },
        ];
      case "student":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/student-dashboard" },
          { icon: UserPlus, label: "Enrollment", path: "/student-enrollment" },
          { icon: BookOpen, label: "My Grades", path: "/student-grades" },
          { icon: BarChart3, label: "Schedule", path: "/student-schedule" },
          { icon: DollarSign, label: "Account", path: "/student-account" },
          { icon: Calendar, label: "Calendar", path: "/calendar?role=student" },
        ];
      case "parent":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/parent-dashboard" },
          { icon: Users, label: "My Children", path: "/parent-children" },
          { icon: DollarSign, label: "Accounts", path: "/parent-accounts" },
          { icon: Calendar, label: "Calendar", path: "/calendar?role=parent" },
        ];
      default:
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        ];
    }
  };

  const navItems = getNavItems();

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "hover:bg-sidebar-accent text-sidebar-foreground"
        }`}
        title={!sidebarOpen ? item.label : ""}
      >
        <div className="relative">
          <Icon className="w-5 h-5 flex-shrink-0" />
          {item.badge && !sidebarOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </div>
        {sidebarOpen && (
          <span className="font-medium text-sm flex-1 flex items-center justify-between">
            {item.label}
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </span>
        )}
      </Link>
    );
  };

  const renderNavGroup = (group: NavGroup) => {
    const isExpanded = expandedGroups.includes(group.label);
    const hasActiveItem = group.items.some(item => isActive(item.path));

    return (
      <div key={group.label} className="space-y-1">
        <button
          onClick={() => sidebarOpen && toggleGroup(group.label)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
            hasActiveItem ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
          } ${sidebarOpen ? "hover:bg-sidebar-accent" : ""}`}
        >
          <span className="font-semibold text-xs uppercase tracking-wider opacity-70">
            {sidebarOpen ? group.label : group.label.charAt(0)}
          </span>
          {sidebarOpen && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 opacity-50" />
            ) : (
              <ChevronRight className="w-4 h-4 opacity-50" />
            )
          )}
        </button>
        {(isExpanded || !sidebarOpen) && (
          <div className={sidebarOpen ? "ml-2 space-y-1" : "space-y-1"}>
            {group.items.map(item => renderNavItem(item))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r border-sidebar-border`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">SMS</h1>
                <p className="text-xs opacity-70">
                  {role === "admin"
                    ? "Administrator"
                    : role === "faculty"
                      ? "Faculty"
                      : role === "student"
                        ? "Student"
                        : "Parent"}
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            if (isGroupItem(item)) {
              return renderNavGroup(item);
            }
            return renderNavItem(item);
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors"
            title={!sidebarOpen ? "Switch Role" : ""}
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium text-sm">Switch Role</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Link
              to={`/notifications?role=${role}`}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {role === "admin" ? 5 : role === "faculty" ? 2 : role === "student" ? 3 : 4}
              </span>
            </Link>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold cursor-pointer hover:bg-primary-200 transition-colors">
              {role === "admin" ? "A" : role === "faculty" ? "F" : role === "student" ? "S" : "P"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

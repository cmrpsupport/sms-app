import { Link } from "react-router-dom";
import { Users, BookOpen, User, Shield, ArrowRight } from "lucide-react";

export default function RoleSelector() {
  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "School management, enrollment, finances, and system settings",
      icon: Shield,
      path: "/admin-dashboard",
      color: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: "faculty",
      title: "Faculty",
      description: "Class records, grade encoding, attendance, and announcements",
      icon: BookOpen,
      path: "/faculty-dashboard",
      color: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      id: "student",
      title: "Student",
      description: "View your grades, schedules, academic records, and account",
      icon: Users,
      path: "/student-dashboard",
      color: "from-teal-600 to-teal-400",
      iconBg: "bg-teal-100 text-teal-600",
    },
    {
      id: "parent",
      title: "Parent",
      description: "Monitor your child's grades, schedules, and account information",
      icon: User,
      path: "/parent-dashboard",
      color: "from-orange-600 to-orange-400",
      iconBg: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent/5">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-2xl text-foreground">
              School Management System
            </h1>
          </div>
          <p className="text-muted-foreground">Select your role to access the system</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Welcome to SMS
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your role to access the appropriate portal
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Link
                  key={role.id}
                  to={role.path}
                  className="group"
                >
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Header with gradient */}
                    <div
                      className={`h-24 bg-gradient-to-r ${role.color} flex items-center justify-center group-hover:shadow-md transition-all`}
                    >
                      <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 flex-1">
                        {role.description}
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Access
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-primary-50 rounded-xl border border-primary-200 p-8 text-center">
            <p className="text-foreground font-semibold mb-2">
              Don't have an account?
            </p>
            <p className="text-muted-foreground">
              Contact your school administrator to create an account and get started.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 School Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

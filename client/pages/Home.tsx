import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Lock,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description:
        "Complete student lifecycle management from admission to graduation",
    },
    {
      icon: BookOpen,
      title: "Academic Operations",
      description:
        "Curriculum management, scheduling, grading, and transcript generation",
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description:
        "Billing, payments, scholarships, and comprehensive financial reporting",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time dashboards and customizable reports for informed decision-making",
    },
    {
      icon: Globe,
      title: "Multi-Campus Support",
      description:
        "Manage multiple campuses and institutions from a single platform",
    },
    {
      icon: Smartphone,
      title: "Parent & Student Portal",
      description:
        "24/7 access to grades, schedules, and account information",
    },
  ];

  const stats = [
    { number: "99.5%", label: "System Uptime" },
    { number: "500+", label: "Concurrent Users" },
    { number: "<3s", label: "Page Load Time" },
    { number: "7-Year", label: "Data Retention" },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "70% Faster Processing",
      description: "Reduce enrollment processing time from hours to minutes",
    },
    {
      icon: CheckCircle,
      title: "100% Compliance",
      description: "Built-in compliance with UNIFAST and government programs",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "SSL/TLS encryption, multi-factor authentication, and audit trails",
    },
  ];

  return (
    <div className="bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">SMS</h1>
              <p className="text-xs text-muted-foreground">School Management</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-foreground hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <Link
            to="/dashboard"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary-50 via-white to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Modern School Management{" "}
              <span className="text-primary">Simplified</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Streamline academic, administrative, and financial operations with
              our comprehensive cloud-based platform. Built for educators,
              administrators, students, and parents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-all font-semibold flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Features
            </h3>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your educational institution
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 border border-border rounded-xl hover:shadow-lg transition-shadow bg-white group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Why Choose SMS?
            </h3>
            <p className="text-xl text-muted-foreground">
              Transform your institution with proven benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl border border-border"
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary via-primary-600 to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Ready to modernize your school?
          </h3>
          <p className="text-lg text-white/90 mb-8">
            Join educational institutions worldwide using our platform to
            streamline operations and improve student outcomes.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 bg-white text-primary rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            Access Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">SMS</span>
              </div>
              <p className="text-sm opacity-80">
                School Management System for modern educational institutions
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Modules</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Academic Setup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Enrollment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Accounting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Users</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Administrators
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Students & Parents
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm opacity-70">
            <p>&copy; 2025 School Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  DollarSign,
  GraduationCap,
  Calendar,
  AlertCircle,
  Info,
  MessageSquare,
  Send,
  X,
} from "lucide-react";
import { toast } from "sonner";

type NotificationType = "payment" | "academic" | "announcement" | "reminder" | "message";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export default function Notifications() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "admin" | "faculty" | "student" | "parent") || "student";

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");

  // Role-specific notifications
  const getNotificationsByRole = (): Notification[] => {
    switch (role) {
      case "admin":
        return [
          {
            id: "ADMIN-001",
            type: "reminder",
            title: "Enrollment Report Due",
            message: "Monthly enrollment report needs to be submitted to DepEd by November 30, 2024.",
            date: "2024-11-21",
            time: "9:00 AM",
            read: false,
          },
          {
            id: "ADMIN-002",
            type: "payment",
            title: "Collection Summary",
            message: "Total collections for November: ₱1,250,000. Outstanding balance: ₱450,000.",
            date: "2024-11-20",
            time: "5:00 PM",
            read: false,
          },
          {
            id: "ADMIN-003",
            type: "academic",
            title: "Grade Submission Complete",
            message: "All faculty members have submitted midterm grades for 1st Semester.",
            date: "2024-11-20",
            time: "3:00 PM",
            read: true,
          },
          {
            id: "ADMIN-004",
            type: "message",
            title: "New Enrollment Application",
            message: "5 new student applications pending review for 2nd Semester.",
            date: "2024-11-19",
            time: "10:00 AM",
            read: false,
          },
          {
            id: "ADMIN-005",
            type: "announcement",
            title: "System Maintenance",
            message: "Scheduled system maintenance on November 25, 2024 from 10PM-6AM.",
            date: "2024-11-18",
            time: "2:00 PM",
            read: true,
          },
        ];
      case "faculty":
        return [
          {
            id: "FAC-001",
            type: "reminder",
            title: "Grade Submission Deadline",
            message: "Final grades for 1st Semester must be submitted by December 15, 2024.",
            date: "2024-11-21",
            time: "8:00 AM",
            read: false,
          },
          {
            id: "FAC-002",
            type: "academic",
            title: "Class Schedule Update",
            message: "Your BIO101 Section 10-B class has been moved to Room 203 starting next week.",
            date: "2024-11-20",
            time: "2:00 PM",
            read: false,
          },
          {
            id: "FAC-003",
            type: "announcement",
            title: "Faculty Meeting",
            message: "Monthly faculty meeting on November 28, 2024 at 3:00 PM in the Conference Room.",
            date: "2024-11-19",
            time: "9:00 AM",
            read: true,
          },
          {
            id: "FAC-004",
            type: "message",
            title: "Student Concern",
            message: "Maria Santos (2024-0001) has requested a meeting regarding her midterm grade.",
            date: "2024-11-18",
            time: "11:30 AM",
            read: true,
          },
        ];
      case "parent":
        return [
          {
            id: "PAR-001",
            type: "payment",
            title: "Payment Due Reminder",
            message: "Balance of ₱15,000 for Maria Santos (Grade 10) is due on November 30, 2024.",
            date: "2024-11-21",
            time: "9:00 AM",
            read: false,
          },
          {
            id: "PAR-002",
            type: "academic",
            title: "Midterm Grades Available",
            message: "Midterm grades for Maria Santos are now available. GWA: 87.5",
            date: "2024-11-20",
            time: "4:00 PM",
            read: false,
          },
          {
            id: "PAR-003",
            type: "announcement",
            title: "Parent-Teacher Conference",
            message: "PTC scheduled for December 10, 2024. Please confirm your attendance.",
            date: "2024-11-19",
            time: "10:00 AM",
            read: false,
          },
          {
            id: "PAR-004",
            type: "reminder",
            title: "School Event",
            message: "Intramurals 2024 on December 5-6. Students may wear PE uniform.",
            date: "2024-11-18",
            time: "8:00 AM",
            read: true,
          },
        ];
      default: // student
        return [
          {
            id: "STU-001",
            type: "payment",
            title: "Payment Due Reminder",
            message: "Your balance of ₱15,000 is due on November 30, 2024. Please settle to avoid late fees.",
            date: "2024-11-21",
            time: "9:00 AM",
            read: false,
            actionUrl: "/student-account",
          },
          {
            id: "STU-002",
            type: "academic",
            title: "Grades Posted",
            message: "Midterm grades for BIO101 - Biology 101 have been posted by Dr. Rodriguez.",
            date: "2024-11-20",
            time: "3:30 PM",
            read: false,
            actionUrl: "/student-grades",
          },
          {
            id: "STU-003",
            type: "announcement",
            title: "School Holiday",
            message: "No classes on November 30, 2024 (Bonifacio Day). Regular classes resume on December 2.",
            date: "2024-11-20",
            time: "10:00 AM",
            read: true,
          },
          {
            id: "STU-004",
            type: "academic",
            title: "Assignment Due",
            message: "Laboratory Report #3 for CHEM101 is due on November 25, 2024.",
            date: "2024-11-18",
            time: "2:00 PM",
            read: false,
          },
          {
            id: "STU-005",
            type: "message",
            title: "Message from Registrar",
            message: "Please submit your updated ID photo for your new school ID. Deadline: November 28, 2024.",
            date: "2024-11-18",
            time: "11:00 AM",
            read: true,
          },
        ];
    }
  };

  const [notifications, setNotifications] = useState<Notification[]>(getNotificationsByRole());
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "announcement" as NotificationType,
    recipients: "all" as "all" | "students" | "faculty" | "parents" | "grade9" | "grade10" | "grade11" | "grade12",
  });

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const recipientLabels: Record<string, string> = {
      all: "All Users",
      students: "All Students",
      faculty: "All Faculty",
      parents: "All Parents",
      grade9: "Grade 9 Students",
      grade10: "Grade 10 Students",
      grade11: "Grade 11 Students",
      grade12: "Grade 12 Students",
    };

    toast.success("Notification sent successfully!", {
      description: `Sent to: ${recipientLabels[newNotification.recipients]}`,
    });

    setShowComposeDialog(false);
    setNewNotification({
      title: "",
      message: "",
      type: "announcement",
      recipients: "all",
    });
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "payment":
        return <DollarSign className="w-5 h-5" />;
      case "academic":
        return <GraduationCap className="w-5 h-5" />;
      case "announcement":
        return <Info className="w-5 h-5" />;
      case "reminder":
        return <Calendar className="w-5 h-5" />;
      case "message":
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-600";
      case "academic":
        return "bg-blue-100 text-blue-600";
      case "announcement":
        return "bg-purple-100 text-purple-600";
      case "reminder":
        return "bg-orange-100 text-orange-600";
      case "message":
        return "bg-gray-100 text-gray-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread" && n.read) return false;
    if (typeFilter !== "all" && n.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout role={role}>
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <CheckCheck className="w-4 h-4" />
                Mark All as Read
              </button>
            )}
            {role === "admin" && (
              <button
                onClick={() => setShowComposeDialog(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                Send Notification
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Filter:</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "unread"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            <div className="h-6 w-px bg-border" />

            <select
              className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as NotificationType | "all")}
            >
              <option value="all">All Types</option>
              <option value="payment">Payment</option>
              <option value="academic">Academic</option>
              <option value="announcement">Announcement</option>
              <option value="reminder">Reminder</option>
              <option value="message">Message</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-border p-4 transition-colors ${
                  !notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.date} at {notification.time}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center">
            <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Load older notifications
            </button>
          </div>
        )}
      </div>

      {/* Compose Notification Dialog */}
      {showComposeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Send Notification</h2>
              <button
                onClick={() => setShowComposeDialog(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                  placeholder="Notification message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as NotificationType })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="announcement">Announcement</option>
                  <option value="reminder">Reminder</option>
                  <option value="academic">Academic</option>
                  <option value="payment">Payment</option>
                  <option value="message">Message</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <select
                  value={newNotification.recipients}
                  onChange={(e) => setNewNotification({ ...newNotification, recipients: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Users</option>
                  <option value="students">All Students</option>
                  <option value="faculty">All Faculty</option>
                  <option value="parents">All Parents</option>
                  <option value="grade9">Grade 9 Students</option>
                  <option value="grade10">Grade 10 Students</option>
                  <option value="grade11">Grade 11 Students</option>
                  <option value="grade12">Grade 12 Students</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowComposeDialog(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendNotification}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

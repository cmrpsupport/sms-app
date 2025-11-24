import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  GraduationCap,
  Clock,
  PartyPopper,
  BookOpen,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

type EventType = "holiday" | "exam" | "enrollment" | "event" | "deadline";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: EventType;
  description?: string;
  time?: string;
}

export default function Calendar() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "admin" | "faculty" | "student" | "parent") || "admin";

  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "event" as EventType,
    description: "",
    time: "",
  });

  const events: CalendarEvent[] = [
    // November 2024
    { id: "1", title: "All Saints' Day", date: "2024-11-01", type: "holiday", description: "National Holiday - No classes" },
    { id: "2", title: "All Souls' Day", date: "2024-11-02", type: "holiday", description: "National Holiday - No classes" },
    { id: "3", title: "Midterm Exam Week Begins", date: "2024-11-04", type: "exam", description: "Midterm examinations for all year levels", time: "8:00 AM" },
    { id: "4", title: "Parent-Teacher Conference", date: "2024-11-09", type: "event", description: "1st Quarter PTC for Grade 7-10", time: "8:00 AM - 5:00 PM" },
    { id: "5", title: "Midterm Grade Submission", date: "2024-11-15", type: "deadline", description: "Faculty deadline for midterm grade encoding" },
    { id: "6", title: "Science Fair 2024", date: "2024-11-18", type: "event", description: "Annual science fair competition", time: "9:00 AM" },
    { id: "7", title: "Bonifacio Day", date: "2024-11-30", type: "holiday", description: "National Holiday - No classes" },
    // December 2024
    { id: "8", title: "Final Exam Week Begins", date: "2024-12-02", type: "exam", description: "Final examinations for 1st Semester" },
    { id: "9", title: "Intramurals 2024", date: "2024-12-05", type: "event", description: "Annual sports fest", time: "7:00 AM - 5:00 PM" },
    { id: "10", title: "Feast of Immaculate Conception", date: "2024-12-08", type: "holiday" },
    { id: "11", title: "Christmas Break Begins", date: "2024-12-20", type: "holiday", description: "Christmas vacation starts" },
    { id: "12", title: "Christmas Day", date: "2024-12-25", type: "holiday" },
    { id: "13", title: "Rizal Day", date: "2024-12-30", type: "holiday" },
    // January 2025
    { id: "14", title: "New Year's Day", date: "2025-01-01", type: "holiday" },
    { id: "15", title: "Classes Resume", date: "2025-01-06", type: "event", description: "End of Christmas break" },
    { id: "16", title: "2nd Semester Enrollment", date: "2025-01-13", type: "enrollment", description: "Enrollment period for 2nd Semester", time: "8:00 AM - 5:00 PM" },
    { id: "17", title: "2nd Semester Start", date: "2025-01-20", type: "event", description: "First day of 2nd Semester" },
  ];

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case "holiday":
        return "bg-red-100 text-red-700 border-red-200";
      case "exam":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "enrollment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "event":
        return "bg-green-100 text-green-700 border-green-200";
      case "deadline":
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case "holiday":
        return <PartyPopper className="w-4 h-4" />;
      case "exam":
        return <BookOpen className="w-4 h-4" />;
      case "enrollment":
        return <Users className="w-4 h-4" />;
      case "event":
        return <CalendarIcon className="w-4 h-4" />;
      case "deadline":
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(e => e.date === dateStr && (typeFilter === "all" || e.type === typeFilter));
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Event added successfully!");
    setShowAddEvent(false);
    setNewEvent({ title: "", date: "", type: "event", description: "", time: "" });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const filteredEvents = events.filter(e => typeFilter === "all" || e.type === typeFilter);
  const upcomingEvents = filteredEvents
    .filter(e => new Date(e.date) >= new Date("2024-11-01"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  return (
    <Layout role={role}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Academic Calendar</h1>
            <p className="text-muted-foreground">View school events, holidays, and important dates</p>
          </div>
          {role === "admin" && (
            <button
              onClick={() => setShowAddEvent(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Filter by type:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All" },
                { value: "holiday", label: "Holidays" },
                { value: "exam", label: "Exams" },
                { value: "enrollment", label: "Enrollment" },
                { value: "event", label: "Events" },
                { value: "deadline", label: "Deadlines" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTypeFilter(value as EventType | "all")}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    typeFilter === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before first day of month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayEvents = getEventsForDate(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === "2024-11-21";

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-24 p-1 rounded-lg border cursor-pointer transition-colors overflow-hidden ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isToday
                        ? "border-blue-300 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground px-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              ) : (
                upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start gap-2">
                      {getEventTypeIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{event.title}</p>
                        <p className="text-xs opacity-75">
                          {new Date(event.date).toLocaleDateString("en-PH", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          {event.time && ` • ${event.time}`}
                        </p>
                        {event.description && (
                          <p className="text-xs mt-1 opacity-75 line-clamp-2">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-3">Legend</h4>
              <div className="space-y-2">
                {[
                  { type: "holiday" as EventType, label: "Holiday" },
                  { type: "exam" as EventType, label: "Examination" },
                  { type: "enrollment" as EventType, label: "Enrollment" },
                  { type: "event" as EventType, label: "School Event" },
                  { type: "deadline" as EventType, label: "Deadline" },
                ].map(({ type, label }) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${getEventTypeColor(type).split(" ")[0]}`} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold mb-4">
              Events on {new Date(selectedDate).toLocaleDateString("en-PH", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-muted-foreground">No events on this date</p>
            ) : (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}>
                    <div className="flex items-start gap-3">
                      {getEventTypeIcon(event.type)}
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        {event.time && <p className="text-sm">{event.time}</p>}
                        {event.description && <p className="text-sm mt-1">{event.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Event Dialog */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add Event</h2>
              <button
                onClick={() => setShowAddEvent(false)}
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
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as EventType })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="event">Event</option>
                  <option value="holiday">Holiday</option>
                  <option value="exam">Examination</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time (optional)</label>
                <input
                  type="text"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 8:00 AM - 5:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                  placeholder="Event description"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

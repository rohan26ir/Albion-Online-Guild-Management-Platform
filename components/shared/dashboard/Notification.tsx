"use client";

import { useState } from "react";
import {
  IconBell,
  IconUsers,
  IconShield,
  IconMessage,
  IconCalendarEvent,
  IconCheck,
  IconChecks,
  IconX,
  IconPointFilled,
  IconUser,
  IconChevronDown,
} from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ── Types ──────────────────────────────────────────────────────────────────

type NotificationType = "guild" | "announcement" | "application" | "message" | "event";

type Notification = {
  id: number;
  title: string;
  user: string;
  time: string;
  type: NotificationType;
  read: boolean;
};

// ── Helpers ────────────────────────────────────────────────────────────────

const typeConfig: Record<
  NotificationType,
  { icon: React.ReactNode; label: string; color: string }
> = {
  guild: { icon: <IconUsers size={13} />, label: "Guild", color: "text-blue-500" },
  announcement: { icon: <IconMessage size={13} />, label: "Announcement", color: "text-yellow-500" },
  application: { icon: <IconShield size={13} />, label: "Application", color: "text-green-500" },
  message: { icon: <IconMessage size={13} />, label: "Message", color: "text-purple-500" },
  event: { icon: <IconCalendarEvent size={13} />, label: "Event", color: "text-orange-500" },
};

// ── Component ──────────────────────────────────────────────────────────────

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Member Joined the Guild",
      user: "Player123",
      time: "2 hours ago",
      type: "guild",
      read: false,
    },
    {
      id: 2,
      title: "Guild Announcement: Upcoming Raid",
      user: "Guild Master",
      time: "1 day ago",
      type: "announcement",
      read: false,
    },
    {
      id: 3,
      title: "Application Approved: Player456",
      user: "Player456",
      time: "3 days ago",
      type: "application",
      read: true,
    },
    {
      id: 4,
      title: "New Message from Player789",
      user: "Player789",
      time: "5 days ago",
      type: "message",
      read: false,
    },
    {
      id: 5,
      title: "Guild Event Reminder: PvP Tournament",
      user: "Guild Master",
      time: "1 week ago",
      type: "event",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visibleNotifications = notifications.slice(0, visibleCount);
  const hasMore = visibleCount < notifications.length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showMore = () => {
    setVisibleCount(Math.min(notifications.length, visibleCount + 2));
  };

  // Get user icon (first letter of username)
  const getUserIcon = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="relative">

      {/* ── Bell Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-accent hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <IconBell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground ring-2 ring-background">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 "
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Dropdown Panel ── */}
      {open && (
        <div className="absolute right-0 top-12 z-20 w-96 border border-border bg-background rounded-lg shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="z-10 flex items-center justify-between border-b border-border px-4 py-3 bg-accent/30 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                <IconBell size={14} className="text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <IconChecks size={12} />
                  All read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <IconX size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <ul className="max-h-[400px] overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <li className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-accent/30">
                  <IconBell size={28} className="text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground/60">{"When you receive notifications, they'll appear here"}</p>
              </li>
            ) : (
              <>
                {visibleNotifications.map((n) => {
                  const cfg = typeConfig[n.type];
                  const isHovered = hoveredUser === n.id;

                  return (
                    <li
                      key={n.id}
                      className={`group relative flex gap-3 px-4 py-3 transition-all duration-200 ${n.read ? "bg-background" : "bg-primary/5"
                        } hover:bg-accent/50`}
                      onMouseEnter={() => setHoveredUser(n.id)}
                      onMouseLeave={() => setHoveredUser(null)}
                    >
                      {/* Unread dot */}
                      {!n.read && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2">
                          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}

                      {/* User Avatar */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-xs font-bold text-foreground cursor-help">
                            {getUserIcon(n.user)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p>{n.user}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Content - Uniform text color */}
                      <div className="flex flex-1 flex-col min-w-0 gap-1">
                        <p className="text-xs text-foreground text-start font-medium flex items-center gap-1">
                          {n.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-medium ${cfg.color}`}>
                            {cfg.label}
                          </span>
                          <span className="text-[9px] text-muted-foreground/40">•</span>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            title="Mark as read"
                            className="flex size-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            <IconCheck size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => dismiss(n.id)}
                          title="Dismiss"
                          className="flex size-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                        >
                          <IconX size={12} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </>
            )}
          </ul>

          {/* Footer - View More button */}
          {notifications.length > 0 && (
            <div className="border-t border-border px-4 py-2.5 bg-accent/20 rounded-b-lg">
              {hasMore ? (
                <button
                  onClick={showMore}
                  className="flex w-full items-center justify-center gap-1.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground"
                >
                  <span>View {Math.min(2, notifications.length - visibleCount)} more</span>
                  <IconChevronDown size={10} />
                </button>
              ) : (
                <button
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground"
                >
                  <span>Close</span>
                  <IconX size={10} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
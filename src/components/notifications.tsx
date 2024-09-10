"use client";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchNotifications, markAsRead } from "./actions";
import { Bell, BellDot } from "lucide-react";
import { Notification } from "@/db/schema";
import Link from "next/link";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);

  const getNotifications = async () => {
    const fetchedNotifications = await fetchNotifications();
    setNotifications(fetchedNotifications || []);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const isAllRead = notifications.every((notification) => notification.isRead);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification);
      await getNotifications();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {!isAllRead ? <BellDot /> : <Bell />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length !== 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className={`p-2 w-18`}>
              <Link
                href={notification.redirectUrl}
                className={`${
                  notification.isRead ? "font-light" : "font-semibold"
                } text-[10px] text-wrap w-full flex flex-col`}
                onClick={() => handleNotificationClick(notification)}
              >
                <span>{notification.message}</span>
                <span className="text-[8px] text-gray-300">
                  {notification.createdAt
                    ? new Date(notification.createdAt).toLocaleString()
                    : ""}
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <span className="font-light text-xs ml-2">No notifications</span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

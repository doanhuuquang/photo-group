"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/lib/context/user-context";
import { cn } from "@/lib/utils";
import { Bell, Home, Loader, LoaderCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export default function AppNavBar({ className }: { className?: string }) {
  const { user, loading } = useUser();

  const navItems: NavItem[] = [
    { label: "Tin nhắn", href: "/", icon: <MessageSquare /> },
    { label: "Thông báo", href: "/", icon: <Bell /> },
    {
      label: "Tôi",
      href: "/",
      icon: (
        <Avatar>
          <AvatarImage src={user?.avatarBase64} />
          <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
  ];

  if (loading)
    return (
      <Skeleton className="w-40 h-10 flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </Skeleton>
    );

  if (!user) return <Button variant={"outline"}>Đăng nhập</Button>;

  return (
    <div className={cn("flex items-center justify-evenly gap-6", className)}>
      {navItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link href={item.href}>{item.icon}</Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

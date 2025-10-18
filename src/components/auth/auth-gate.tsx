"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/lib/firebase/firebase-auth";

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

export default function AuthGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [firebaseUser, authLoading] = useAuthState(auth);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Đang kiểm tra trạng thái xác thực
    if (authLoading) return;
    // Nếu đã đăng nhập và đang ở trang xác thực, chuyển hướng đến trang chủ
    if (firebaseUser && authRoutes.includes(pathname)) router.push("/");
    // Nếu chưa đăng nhập và không ở trang xác thực, chuyển hướng đến trang đăng nhập
    if (!firebaseUser && !authRoutes.includes(pathname))
      router.push(authRoutes[0]);
  }, [firebaseUser, authLoading, router, pathname]);

  // Hiển thị loader khi đang kiểm tra trạng thái xác thực
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin size-10" />
      </div>
    );
  }

  return <>{children}</>;
}

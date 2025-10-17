import SignupForm from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="space-y-10 w-full">
      <div className="space-y-3">
        <p className="text-2xl font-bold">Chào mừng bạn đến với Photo Group</p>
        <p className="text-sm">
          Bạn Đã có tài khoản?
          <span>
            <Link
              href={"/auth/sign-in"}
              className="text-primary underline underline-offset-2 ml-2"
            >
              Đăng Nhập ngay
            </Link>
          </span>
        </p>
      </div>
      <SignupForm />
    </main>
  );
}

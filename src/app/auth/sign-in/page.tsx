import SigninForm from "@/components/auth/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="space-y-10 w-full">
      <div className="space-y-3">
        <p className="text-2xl font-bold">Chào mừng bạn quay trở lại</p>
        <p className="text-sm">
          Bạn chưa có tài khoản?
          <span>
            <Link
              href={"/auth/sign-up"}
              className="text-primary underline underline-offset-2 ml-2"
            >
              Đăng ký ngay
            </Link>
          </span>
        </p>
      </div>
      <SigninForm />
    </main>
  );
}

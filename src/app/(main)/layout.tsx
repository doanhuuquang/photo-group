import AppHeader from "@/components/main/app-header";
import AppNavBar from "@/components/main/app-navbar";
import { UserProvider } from "@/lib/context/user-context";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <AppHeader />
      {children}
    </UserProvider>
  );
}

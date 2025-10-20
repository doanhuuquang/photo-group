import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserProvider } from "@/lib/context/user-context";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="w-full h-screen relative">
            <SidebarTrigger className="col-span-1 absolute top-4 left-4 z-10 p-4 rounded-full bg-background/50 backdrop-blur-2xl" />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}

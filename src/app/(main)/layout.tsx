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
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b sticky top-0 z-50 bg-background">
            <div className="w-full grid grid-cols-6 gap-2 px-4">
              <SidebarTrigger className="-ml-1 col-span-1" />
              <p className="font-playwrite text-center col-span-4 font-senmibold text-lg">
                Photo Group
              </p>
              <div className="col-span-1"></div>
            </div>
          </header>
          <div className="w-full h-[calc(100vh-64px)]">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}

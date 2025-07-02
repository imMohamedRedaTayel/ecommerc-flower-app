import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/(dashboard)/layout/side-nav/side-Bar";
import { BreadcrumbWithCustomSeparator } from "@/components/common/(dashboard)/layout/bread-crumb/bread-crumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 p-6">
          <SidebarTrigger />
          <BreadcrumbWithCustomSeparator />
          {children}
        </div>
      </SidebarProvider>
    </main>
  );
}

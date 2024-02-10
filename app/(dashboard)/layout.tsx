import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
}
function DashboardLayout({children}: Props) {
  return (
    <main className="h-full">
      <Sidebar />

      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            {/* add navbar */}
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;

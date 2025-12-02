import { ChatSidebar } from "@/components/dashboard/chat-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black">
      {children}
      <ChatSidebar />
    </div>
  );
}

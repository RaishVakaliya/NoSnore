import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor your services and manage pings.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your personal account details.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

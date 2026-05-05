import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Affordable plans to keep your backend alive. Choose between our Personal Free and Enterprise Pro plans.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

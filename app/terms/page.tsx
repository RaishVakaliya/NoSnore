import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing or using NoSnore ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

These terms apply to all users of the Service, including visitors, Free plan users, and Pro plan subscribers.`,
    },
    {
      title: "Description of Service",
      content: `NoSnore is an uptime monitoring and backend wake-up service. The Service allows you to:

• Register HTTP endpoints (URLs) to be pinged on a scheduled basis.
• Monitor the uptime and response status of your registered services.
• Receive uptime statistics and health dashboards.
• Prevent cold starts on free-tier hosting platforms.

The Service is provided on an "as is" and "as available" basis.`,
    },
    {
      title: "Account Registration",
      content: `To use the Service, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration.
• Maintain the security of your account credentials.
• Promptly notify us of any unauthorized use of your account.
• Accept responsibility for all activities that occur under your account.

You must be at least 13 years of age to use the Service.`,
    },
    {
      title: "Subscription Plans and Payments",
      content: `NoSnore offers the following plans:

• **Free Plan:** Monitor up to 2 endpoints with 15-minute ping intervals. No charge.
• **Pro Plan:** Monitor up to 10 endpoints with 1-minute ping intervals, ping history access, and priority support. Billed at ₹99/month.

All payments are processed securely via Razorpay. Subscriptions are billed monthly. We do not offer refunds for partial months of service. You may cancel your subscription at any time from your account settings.`,
    },
    {
      title: "Acceptable Use",
      content: `You agree not to use the Service to:

• Register endpoints you do not own or have explicit permission to monitor.
• Perform DDoS attacks, stress tests, or any form of abuse against third-party servers.
• Attempt to reverse engineer, hack, or compromise the security of the Service.
• Register endpoints containing illegal, harmful, or malicious content.
• Circumvent the service limits of your plan through any technical means.
• Resell or sublicense the Service without written permission.

Violation of these terms may result in immediate account suspension.`,
    },
    {
      title: "Uptime and Service Availability",
      content: `We strive to maintain high availability of the Service, but we do not guarantee 100% uptime. Scheduled maintenance, infrastructure failures, or events beyond our control may result in temporary service interruptions.

NoSnore is not liable for any damages or losses resulting from downtime, missed pings, or inaccurate monitoring data.`,
    },
    {
      title: "Intellectual Property",
      content: `The Service, including its design, code, branding, and content, is the intellectual property of NoSnore. You may not copy, reproduce, or distribute any part of the Service without written permission.

You retain ownership of the data you submit to the Service (endpoint URLs, service names). By using the Service, you grant us a limited license to use this data solely to provide the Service to you.`,
    },
    {
      title: "Termination",
      content: `You may delete your account at any time from the Settings page. Upon deletion, all your data including services, ping logs, and account information will be permanently removed.

We reserve the right to suspend or terminate your account at our discretion if you violate these Terms of Service, without prior notice.`,
    },
    {
      title: "Disclaimer of Warranties",
      content: `The Service is provided "as is" without any warranty of any kind, express or implied. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.

We do not warrant that the Service will be error-free, uninterrupted, or that monitoring results will be accurate in all cases.`,
    },
    {
      title: "Governing Law",
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of India.

If you have any questions about these Terms, please contact us at:

support@nosnore.com`,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="mt-4 text-zinc-400">
            Effective Date: <span className="text-zinc-300">May 1, 2026</span>
          </p>
          <p className="mt-3 text-zinc-500 leading-relaxed">
            Please read these Terms of Service carefully before using{" "}
            <span className="font-semibold text-white">NoSnore</span>. By using
            our service, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm"
            >
              <h2 className="mb-4 text-xl font-bold text-white">
                <span className="mr-3 text-emerald-400">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.split("\n").map((line, j) => (
                  <p
                    key={j}
                    className={`text-sm leading-relaxed ${
                      line.startsWith("•")
                        ? "text-zinc-400 pl-2"
                        : line.startsWith("support@")
                          ? "text-emerald-400 font-medium"
                          : "text-zinc-500"
                    }`}
                  >
                    {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-emerald-500/30 hover:bg-zinc-800 hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

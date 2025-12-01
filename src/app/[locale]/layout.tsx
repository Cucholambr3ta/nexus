import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CuchoLambreta Nexus",
  description: "Military Grade Software Orchestration",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageSwitcher />
          <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
             {/* Background Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

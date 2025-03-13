import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Providers} from './provider'
import "./globals.css";
import Navbar from '@/components/navbar'
import {Textarea} from "@/components/textarea"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuraGPT",
  description: "LLM like chatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
  
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col w-full">
            <div className='flex flex-start border'>
              <div>
              <SidebarTrigger />
              </div>
              <div className='w-full'>
               <Navbar/>
              </div>
            </div>
            {children}
            <footer className="fixed bottom-0 w-full">
              <div className='flex justify-center'>
                <Textarea/>
              </div>
              <div className='bg-slate-100 text-sm text-slate-600 text-center py-2'>
                © NeuraGPT can make mistakes | All rights reserved.
              </div>
            </footer>
          </main>
        </SidebarProvider>
      </Providers>  
      </body>
    </html>
  );
}

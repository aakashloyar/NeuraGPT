"use client"
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <div className="">
      <div className="p-4 flex-1">
        <p>Main Content Here</p>
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-slate-100 text-slate-600 text-center py-2">
        © NeuraGPT can make mistakes | All rights reserved.
      </footer>
    </div>
  );
}

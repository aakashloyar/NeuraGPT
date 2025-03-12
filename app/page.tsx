import { Sidebar } from "@/components/ui/sidebar";
import {Textarea} from "@/components/textarea"
export default function Home() {

  return (
    <div className="">
      <div className="">
        <p>Main Content Here</p>
      </div>
      <footer className="fixed bottom-0 w-full">
        <div className='flex justify-center'>
          <Textarea/>
        </div>
        <div className='bg-slate-100 text-sm text-slate-600 text-center py-2'>
          © NeuraGPT can make mistakes | All rights reserved.
        </div>
      </footer>
    </div>
  );
}

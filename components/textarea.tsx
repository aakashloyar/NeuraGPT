import Image from 'next/image';

export function Textarea() {
    return (
        <div className='border border-slate-200 shadow-lg shadow-slate-300 rounded-2xl w-1/2'>
            <div className='w-full'>
                <textarea  className='w-full h-24 focus:outline-none px-2 py-1'
                   name="textarea" 
                   id="textarea" 
                   defaultValue=""
                   placeholder='Ask Anything'
                >
                </textarea>
            </div>
            <div className='flex justify-end px-2 pb-1 mt-1'>
                {/* <Image width={2} height={2}  src={"/next.png"}/> */}
                <Image src="/next.png" alt="Send" width={24} height={24} className='cursor-pointer' />
            </div>
        </div>
    )
}
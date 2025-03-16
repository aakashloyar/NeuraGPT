import { useRouter } from "next/router";

export default function NotFound({ message}:{message:string}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-700 mt-2">Page Not Found</p>
      <p className="text-lg text-gray-700 mt-2">{message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        onClick={() => router.push("/")}
      >
        Go Back Home
      </button>
    </div>
  );
}

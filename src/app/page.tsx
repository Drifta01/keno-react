"use client";

import KenoMonitor from "./components/KenoMonitor";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-700 font-sans dark:bg-black">
      <main className=" min-h-screen w-full  bg-gray-700 dark:bg-black sm:items-start">
        <KenoMonitor />
      </main>
    </div>
  );
}

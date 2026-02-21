"use client";

import { useState, useEffect } from "react";
import KenoMonitor from "./components/KenoMonitor";

export default function Home() {
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from our new, reliable internal API route
        const response = await fetch("/api/results?limit=50");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch data");
        }

        // The actual game results are in the 'data' property
        setResults(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <KenoMonitor />
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Historical Results from DB</h2>
        {loading && <p>Loading results...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {results && (
          <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}

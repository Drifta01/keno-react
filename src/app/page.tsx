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
    <main>
      <KenoMonitor />
    </main>
  );
}

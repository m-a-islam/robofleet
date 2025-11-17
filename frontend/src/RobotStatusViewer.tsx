import { useState, useEffect } from 'react';
import './App.css';
// This is the data we expect from our API
interface RobotStatus {
  status: string;
}

function RobotStatusViewer() {
  // --- State for Data ---
  // We'll store the data we fetch from the API here.
  // It starts as 'null' because we don't have it yet.
  const [data, setData] = useState<RobotStatus | null>(null);

  // --- State for Loading ---
  // It's good practice to track loading status.
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Errors ---
  // And to also track any errors.
  const [error, setError] = useState<Error | null>(null);

  // --- The Side Effect ---
  // 1. We call useEffect here.
  useEffect(() => {
    // 2. The setup function contains our data-fetching logic.
    const fetchRobotStatus = async () => {
      try {
        // We defined this API in our backend step
        const response = await fetch('http://localhost:8000/api/status');

        if (!response.ok) {
          throw new Error('Data fetching failed');
        }

        const apiData: RobotStatus = await response.json();

        // 3. Update state with the data we fetched
        setData(apiData);
      } catch (err) {
        // 4. Update state with the error
        setError(err as Error);
      } finally {
        // 5. Update state to show loading is complete
        setIsLoading(false);
      }
    };

    // 6. Call the function we just defined
    fetchRobotStatus();

  }, []); // 7. The Dependency Array

  // --- Conditional Rendering ---
  // Show different UI based on our state
  if (isLoading) {
    return <div>Loading robot status...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <p>
        <strong>Backend Status (from API):</strong> {data.status}
      </p>
    );
  }

  // Fallback (though in this case, one of the above should always be true)
  return <div>No status data.</div>;
}

export default RobotStatusViewer;
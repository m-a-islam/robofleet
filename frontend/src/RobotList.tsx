import { useState, useEffect } from 'react';
import RobotStatusEditor from "./RobotStatusEditor.tsx";
interface Robot {
  id: string;
  name: string;
  status: string;
}

function RobotList() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 3. Use 'useEffect' to fetch data when the component mounts
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/robots');
        if (!response.ok) {
          throw new Error('Failed to fetch robots');
        }
        const data: Robot[] = await response.json();
        setRobots(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobots();
  }, []); // <-- Empty array = run once on mount

  // 4. Conditional rendering for loading and error states
  if (isLoading) {
    return <div>Loading robot fleet...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 5. Render the list using .map()
  return (
    <div className="robot-list">
      <h2>Robot Fleet</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot.id}>
              <td>{robot.name}</td>

              <RobotStatusEditor
                  id={robot.id}
                  initialStatus={robot.status}
                />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RobotList;
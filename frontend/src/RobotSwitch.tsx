import { useState } from 'react';

interface RobotSwitchProps {
  id: string;
  initialStatus: string;
}

function RobotSwitch({ id, initialStatus }: RobotSwitchProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const newStatus = (status === 'online') ? 'offline' : 'online';
    setStatus(newStatus);

    try {
      const response = await fetch(`http://localhost:8000/api/robots/${id}/toggle`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const updatedRobot = await response.json();

      setStatus(updatedRobot.status);

    } catch (error) {
      console.error("Failed to toggle robot:", error);
      setStatus(initialStatus);
    } finally {
      setIsLoading(false);
    }
  };

  const canToggle:boolean = status !== 'maintenance' && !isLoading;

  return (
    <button onClick={handleToggle} disabled={!canToggle}>
      {isLoading ? "..." : status}
    </button>
  );
}

export default RobotSwitch;
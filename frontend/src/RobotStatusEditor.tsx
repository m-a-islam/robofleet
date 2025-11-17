import { useState } from 'react';

// Define the component's props
interface RobotStatusEditorProps {
  id: string;
  initialStatus: string;
}

function RobotStatusEditor({ id, initialStatus }: RobotStatusEditorProps) {
  // 1. 'currentStatus' holds the state as shown in the UI.
  //    'selectedStatus' tracks what's in the dropdown.
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetStatus = async () => {
    setIsLoading(true);
    try {
      // 2. Call our new PUT endpoint
      const response = await fetch(`http://localhost:8000/api/robots/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // 3. Send the new status in the request body
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to set status');
      }

      const updatedRobot = await response.json();

      // 4. Update our component's state from the server response
      setCurrentStatus(updatedRobot.status);
      setSelectedStatus(updatedRobot.status);

    } catch (error) {
      console.error("Failed to set status:", error);
      // On error, we could roll back, but for simplicity
      // we'll just log the error.
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Handle changes to the dropdown
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  // 6. Disable the "Set" button if the status hasn't changed
  const hasChanged = currentStatus !== selectedStatus;

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <select
        value={selectedStatus}
        onChange={handleSelectChange}
        disabled={isLoading}
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="maintenance">Maintenance</option>
      </select>
      <button
        onClick={handleSetStatus}
        disabled={!hasChanged || isLoading}
      >
        {isLoading ? '...' : 'Set'}
      </button>
    </div>
  );
}

export default RobotStatusEditor;
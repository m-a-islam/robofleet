from typing import List, Optional
from models import Robot

# --- Mock Database ---
# This is our private, "simulated" database.
# No one outside this file should ever know about it.
_db: List[Robot] = [
    Robot(id="r1", name="Bender", status="online"),
    Robot(id="r2", name="Wall-E", status="maintenance"),
    Robot(id="r3", name="R2-D2", status="offline"),
    Robot(id="r4", name="Optimus Prime", status="online"),
]

class RobotRepository:
    """
    This class is the *only* thing that knows how to
    interact with our data store (_db).
    """

    def get_all_robots(self) -> List[Robot]:
        return _db

    def get_robot_by_id(self, robot_id: str) -> Optional[Robot]:
        """Finds a single robot by its ID."""
        for robot in _db:
            if robot.id == robot_id:
                return robot
        return None


    def toggle_robot_status(self, robot_id: str) -> Optional[Robot]:
        """Toggles a robot's status between 'online' and 'offline'."""
        robot = self.get_robot_by_id(robot_id)

        if not robot:
            return None

        # We'll only toggle 'online'/'offline' and leave 'maintenance' alone
        if robot.status == "online":
            robot.status = "offline"
        elif robot.status == "offline":
            robot.status = "online"

        return robot

    def set_robot_status(self, robot_id: str, new_status: str) -> Optional[Robot]:
        """Finds a robot and sets its status to a specific value."""
        robot = self.get_robot_by_id(robot_id)

        if not robot:
            return None

        robot.status = new_status
        return robot
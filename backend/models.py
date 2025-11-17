from pydantic import BaseModel

# This defines the "shape" of our data.
class Robot(BaseModel):
    id: str
    name: str
    status: str # "online", "offline", "maintenance"


class RobotStatusUpdate(BaseModel):
    """Defines the request body for updating a robot's status."""
    status: str
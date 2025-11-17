from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Robot, RobotStatusUpdate
from repository import RobotRepository

# --- App Setup ---
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_robot_repository():
    return RobotRepository()

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"Hello": "Backend"}

@app.get("/api/status")
def get_status():
    return {"status": "Backend is running!"}

@app.get("/api/robots", response_model=List[Robot])
def get_robots( repo: RobotRepository = Depends(get_robot_repository) ):
    # Our API route is now clean. It just calls the
    # repository, completely unaware of *how* the data is stored.
    return repo.get_all_robots()


@app.post("/api/robots/{robot_id}/toggle", response_model=Robot)
def toggle_robot(
        robot_id: str,
        repo: RobotRepository = Depends(get_robot_repository)
):
    # Call our repository logic
    robot = repo.toggle_robot_status(robot_id)

    # Best practice: Return a 404 Not Found if the ID doesn't exist
    if not robot:
        raise HTTPException(status_code=404, detail="Robot not found")

    return robot


@app.put("/api/robots/{robot_id}/status", response_model=Robot)
def set_robot_status(
        robot_id: str,
        status_update: RobotStatusUpdate,  # 2. FastAPI validates the request body
        repo: RobotRepository = Depends(get_robot_repository)
):
    # 3. Call the new repository method
    robot = repo.set_robot_status(robot_id, status_update.status)

    if not robot:
        raise HTTPException(status_code=404, detail="Robot not found")

    return robot
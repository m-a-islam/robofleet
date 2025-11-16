# Stage 1: Use an official Python base image
# Using a specific version is a best practice for consistency.
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the file that lists your dependencies
# (Assumes you have a requirements.txt file)
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend application code into the container
COPY . .

# Expose the port your FastAPI/Flask app runs on (e.g., 8000)
EXPOSE 8000

# Define the command to run your application
# (Assumes your main file is 'main.py' and your app object is 'app')
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
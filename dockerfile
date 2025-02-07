# Use a Debian-based image with Node.js
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Install required packages
RUN apt update && apt install -y \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    tightvncserver

# Set the working directory
WORKDIR /app

# Copy all project files
COPY . .

# Ensure start.sh has execution permissions
RUN chmod +x start.sh

# Install project dependencies
RUN npm install

# Expose necessary ports
EXPOSE 6080

# Start the services
CMD ["bash", "start.sh"]

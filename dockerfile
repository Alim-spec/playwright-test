# Use Playwright’s base image for better compatibility
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Update and install required GUI tools for VNC & NoVNC
RUN apt update && apt install -y \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    tightvncserver && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Ensure start.sh is executable
RUN chmod +x start.sh

# Install Node.js dependencies
RUN npm install

# Expose NoVNC port
EXPOSE 6080

# Start services when the container starts
CMD ["bash", "start.sh"]

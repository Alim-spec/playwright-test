# Use Playwright’s base image with necessary dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Install required GUI tools for VNC & NoVNC
RUN apt update && apt install -y \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    tightvncserver && \
    rm -rf /var/lib/apt/lists/*

# ✅ Verify x11vnc and websockify are installed
RUN which x11vnc && which websockify

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Ensure start.sh is executable
RUN chmod +x start.sh

# Install Node.js dependencies
RUN npm install

# Expose necessary ports for NoVNC
EXPOSE 6080

# Start all services
CMD ["bash", "start.sh"]

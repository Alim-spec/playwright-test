# Use Playwright’s base image with necessary dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Update package list and install GUI tools
RUN apt update && apt install -y \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    tightvncserver && \
    rm -rf /var/lib/apt/lists/*

# ✅ Ensure `x11vnc` and `websockify` exist
RUN which x11vnc && which websockify

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Ensure `start.sh` is executable
RUN chmod +x start.sh

# Install Node.js dependencies
RUN npm install

# Expose necessary ports
EXPOSE 6080

# Start all services
CMD [

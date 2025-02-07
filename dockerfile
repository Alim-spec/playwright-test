# Use a Debian-based image with Node.js & Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Install required GUI packages
RUN apt update && apt install -y \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    tightvncserver

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Ensure start.sh is executable
RUN chmod +x start.sh

# Install project dependencies
RUN npm install

# Expose necessary ports
EXPOSE 6080

# Start all services
CMD ["bash", "start.sh"]

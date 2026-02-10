FROM node:20

WORKDIR /app

# Copy package.json (and lockfile if it exists)
COPY package*.json ./

# Force install dependencies (bypassing strict checks)
RUN npm install

# Copy the rest of your files
COPY . .

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
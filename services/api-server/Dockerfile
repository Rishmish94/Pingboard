# ---- Stage 1: Builder ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json first (why? explained below)
COPY package.json .

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY src/ ./src/

# ---- Stage 2: Production ----
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only what we need from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json .

# Do not run as root — security best practice
RUN addgroup -S pingboard && adduser -S pingboard -G pingboard
USER pingboard

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "src/index.js"]
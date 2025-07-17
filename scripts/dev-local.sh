#!/bin/bash

# Local Development Runner

set -e

echo "🚀 Starting local development servers..."

# Check if PostgreSQL is running
if ! nc -z localhost 5432 2>/dev/null; then
    echo "⚠️  PostgreSQL not detected on localhost:5432"
    echo "   Please ensure PostgreSQL is running and accessible"
    echo "   You can install PostgreSQL or use Docker:"
    echo "   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres"
    echo ""
fi

# Setup if needed
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "📦 Running setup first..."
    ./scripts/setup-local.sh
fi

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down development servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
}

# Setup signal handlers
trap cleanup SIGINT SIGTERM

echo ""
echo "🔧 Starting backend server..."
cd backend
npm run start:dev &
BACKEND_PID=$!

echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

echo ""
echo "🎨 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Development servers are running!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:3001/api"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
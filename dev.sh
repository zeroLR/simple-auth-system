#!/bin/bash

# Simple Auth System Development Script
# This script helps run the development environment

set -e

echo "🚀 Simple Auth System Development Setup"
echo "========================================"

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "✅ Docker and Docker Compose found"
    
    echo ""
    echo "Choose an option:"
    echo "1. Run with Docker (recommended for production-like environment)"
    echo "2. Run locally (recommended for development)"
    echo "3. Setup local environment only"
    echo "4. Clean Docker containers and volumes"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            echo "🐳 Starting with Docker Compose..."
            docker-compose up --build
            ;;
        2)
            echo "💻 Setting up local development environment..."
            ./scripts/dev-local.sh
            ;;
        3)
            echo "⚙️ Setting up local environment..."
            ./scripts/setup-local.sh
            ;;
        4)
            echo "🧹 Cleaning Docker environment..."
            docker-compose down -v
            docker system prune -f
            echo "✅ Docker environment cleaned"
            ;;
        *)
            echo "❌ Invalid choice. Exiting."
            exit 1
            ;;
    esac
else
    echo "⚠️  Docker not found. Running local development setup..."
    ./scripts/dev-local.sh
fi
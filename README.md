# Simple Auth System

A complete authentication system built with **Next.js** (frontend) and **Nest.js** (backend), featuring JWT authentication, role-based access control, and a modern user interface.

## Features

### Authentication & Security
- ✅ **Email/Password Authentication** - Secure login and registration
- ✅ **JWT Tokens** - Access tokens with refresh token rotation
- ✅ **HttpOnly Cookies** - Secure token storage
- ✅ **Password Hashing** - Bcrypt for secure password storage
- ✅ **Role-Based Access Control** - Admin and User roles
- 🚧 **OAuth Integration** - Google and GitHub (planned)
- 🚧 **Password Reset** - Email-based password recovery (planned)

### User Management
- ✅ **User Registration** - Create new accounts
- ✅ **User Profile** - View and edit profile information
- ✅ **Admin Panel** - User management for administrators
- ✅ **Account Status** - Active/Inactive user management

### Technical Features
- ✅ **TypeScript** - Full type safety
- ✅ **PostgreSQL Database** - Reliable data storage
- ✅ **Docker Support** - Easy deployment
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Form Validation** - Client and server-side validation

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form handling (planned)

### Backend
- **Nest.js** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens
- **Bcrypt** - Password hashing
- **Passport** - Authentication middleware

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-auth-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   npm install
   npm run start:dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Setup Database**
   - Install PostgreSQL
   - Create database: `simple_auth`
   - Update backend/.env with your database credentials

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - PostgreSQL: localhost:5432

## Project Structure

```
simple-auth-system/
├── backend/                 # Nest.js backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── common/         # Shared utilities
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   └── lib/          # Utilities and types
│   ├── Dockerfile
│   └── package.json
├── scripts/               # Database scripts
├── docker-compose.yml     # Multi-container setup
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update current user profile
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create user (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PATCH /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=simple_auth

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Development

### Backend Development
```bash
cd backend
npm run start:dev    # Development with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
npm run test         # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds
- **JWT Security**: Separate secrets for access and refresh tokens
- **HTTP-Only Cookies**: Refresh tokens stored securely
- **CORS Configuration**: Restricted to frontend domain
- **Input Validation**: Server-side validation with class-validator
- **Role-Based Access**: Protected routes and resources

## Default Users

When running with Docker, the system starts with no default users. Create an admin account through the registration page or use the API directly.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] OAuth integration (Google, GitHub)
- [ ] Email service integration
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] User avatar uploads
- [ ] Audit logging
- [ ] API rate limiting
- [ ] Comprehensive test coverage

## Support

For questions or issues, please open an issue on the GitHub repository.
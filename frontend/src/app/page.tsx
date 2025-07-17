'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Simple Auth System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A complete authentication system built with Next.js and Nest.js
        </p>
        
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {user.firstName} {user.lastName}!
            </h2>
            <p className="text-gray-600 mb-6">
              You are logged in as a <span className="font-semibold text-blue-600">{user.role}</span> user.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link
                href="/profile"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/admin/users"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Manage Users
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-6">
              Please sign in to access your account or create a new account to get started.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/login"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT tokens with refresh token rotation and secure httpOnly cookies.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Role-Based Access</h3>
            <p className="text-gray-600">
              Admin and user roles with protected routes and resource access control.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Modern Stack</h3>
            <p className="text-gray-600">
              Built with Next.js, Nest.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

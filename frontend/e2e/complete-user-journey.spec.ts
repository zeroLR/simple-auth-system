import { test, expect } from '@playwright/test';

test.describe('Complete User Journey E2E Tests', () => {
  test('should display home page correctly for unauthenticated users', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.getByRole('heading', { name: 'Welcome to Simple Auth System' })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText('A complete authentication system built with Next.js and Nest.js')).toBeVisible();
    
    // Check unauthenticated content
    await expect(page.getByText('Please sign in to access your account or create a new account to get started.')).toBeVisible();
    
    // Check action buttons
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
    
    // Check feature cards
    await expect(page.getByText('Secure Authentication')).toBeVisible();
    await expect(page.getByText('Role-Based Access')).toBeVisible();
    await expect(page.getByText('Modern Stack')).toBeVisible();
  });

  test('should navigate between auth pages correctly', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    
    // Go to login page from home
    await page.click('text=Sign In');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    
    // Go to register page from login
    await page.click('text=Sign Up');
    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    
    // Go back to login page from register
    await page.click('text=Sign In');
    await expect(page).toHaveURL('/auth/login');
    
    // Use navigation links
    await page.click('text=Register');
    await expect(page).toHaveURL('/auth/register');
    
    await page.click('text=Login');
    await expect(page).toHaveURL('/auth/login');
  });

  test('should handle form validation correctly', async ({ page }) => {
    // Test login form validation
    await page.goto('/auth/login');
    
    // Try invalid email format
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should still be on login page due to validation
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    
    // Test registration form validation
    await page.goto('/auth/register');
    
    // Test password mismatch
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'differentpassword');
    await page.click('button[type="submit"]');
    
    // Should show password mismatch error
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should show correct loading states', async ({ page }) => {
    // Test login loading state
    await page.goto('/auth/login');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should show loading text briefly (may be very fast, so use a shorter timeout)
    await expect(page.getByRole('button', { name: 'Signing In...' })).toBeVisible({ timeout: 3000 });
    
    // Test registration loading state
    await page.goto('/auth/register');
    
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should show loading text briefly (may be very fast, so use a shorter timeout)
    await expect(page.getByRole('button', { name: 'Creating Account...' })).toBeVisible({ timeout: 3000 });
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check form labels are properly associated
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();
    
    // Check input types are correct
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Check required attributes
    await expect(page.locator('input[name="email"][required]')).toBeVisible();
    await expect(page.locator('input[name="password"][required]')).toBeVisible();
    
    // Test registration form
    await page.goto('/auth/register');
    
    await expect(page.locator('label[for="firstName"]')).toBeVisible();
    await expect(page.locator('label[for="lastName"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();
    await expect(page.locator('label[for="confirmPassword"]')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Content should still be visible and accessible
    await expect(page.getByRole('heading', { name: 'Welcome to Simple Auth System' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    
    // Test forms on mobile
    await page.goto('/auth/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Welcome to Simple Auth System' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Welcome to Simple Auth System' })).toBeVisible();
  });

  // This test would require backend integration
  test.skip('should complete full user registration and login flow', async ({ page }) => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    // Register new user
    await page.goto('/auth/register');
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Test@1234');
    await page.fill('input[name="confirmPassword"]', 'Test@1234');
    await page.click('button[type="submit"]');
    
    // Should be redirected to home page
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Hello, Test User!')).toBeVisible();
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Login with the same credentials
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Test@1234');
    await page.click('button[type="submit"]');
    
    // Should be logged in again
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Hello, Test User!')).toBeVisible();
  });
});
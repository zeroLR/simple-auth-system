import { test, expect } from '@playwright/test';

test.describe('User Login Flow', () => {
  test('should display login form correctly', async ({ page }) => {
    await page.goto('/auth/login');

    // Verify login page elements
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByText('Forgot Password?')).toBeVisible();
    await expect(page.getByText('Don\'t have an account?')).toBeVisible();
  });

  test('should navigate to registration page from login page', async ({ page }) => {
    await page.goto('/auth/login');

    // Click on the "Sign Up" link
    await page.click('text=Sign Up');

    // Verify navigation to registration page
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page).toHaveURL('/auth/register');
  });

  test('should show loading state when submitting form', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill in form with some credentials
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for loading state (button text changes) - may be brief
    await expect(page.getByRole('button', { name: 'Signing In...' })).toBeVisible({ timeout: 3000 });
  });

  test('should require email and password fields', async ({ page }) => {
    await page.goto('/auth/login');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Browser should show HTML5 validation for required fields
    // Check that we're still on the login page
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password123');

    // Try to submit
    await page.click('button[type="submit"]');

    // HTML5 validation should prevent submission
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  // This test would require a backend to be running and a test user to exist
  test.skip('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill in valid test credentials
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Test@1234');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for redirect to home page
    await page.waitForURL('/', { timeout: 30000 });

    // Verify successful login by checking for user-specific content
    await expect(page.getByText('Hello, Test User!')).toBeVisible();
  });

  // This test would require a backend to be running
  test.skip('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for error message
    await expect(page.getByText(/Login failed|Invalid credentials/)).toBeVisible();
  });
});
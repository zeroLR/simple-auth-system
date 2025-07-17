import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should successfully register a new user', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/auth/register');

    // Verify we're on the registration page
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();

    // Generate unique test data to avoid conflicts
    const timestamp = Date.now();
    const firstName = 'Test';
    const lastName = 'User';
    const email = `testuser${timestamp}@example.com`;
    const password = 'Test@1234';

    // Fill in the registration form
    await page.fill('input[name="firstName"]', firstName);
    await page.fill('input[name="lastName"]', lastName);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation or success indication
    // Note: Actual behavior depends on backend being available
    // This test assumes successful registration redirects to home page
    await page.waitForURL('/', { timeout: 30000 });

    // Verify we're redirected to home page
    await expect(page.getByRole('heading', { name: 'Welcome to Simple Auth System' })).toBeVisible();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.goto('/auth/register');

    // Fill form with mismatched passwords
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'differentpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for password mismatch error
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should have required field validation', async ({ page }) => {
    await page.goto('/auth/register');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Browser should show HTML5 validation messages
    // We can check that the form hasn't been submitted by ensuring we're still on registration page
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });

  test('should navigate to login page from registration page', async ({ page }) => {
    await page.goto('/auth/register');

    // Click on the "Sign In" link
    await page.click('text=Sign In');

    // Verify navigation to login page
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
  });
});
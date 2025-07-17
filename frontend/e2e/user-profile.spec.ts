import { test, expect } from '@playwright/test';

test.describe('User Profile Flow', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    // Try to access profile page without being logged in
    await page.goto('/profile');

    // Should be redirected to login page
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  // This test would require authentication state setup
  test.skip('should display user profile information when authenticated', async ({ page }) => {
    // This would require setting up authentication state or logging in first
    // For now, we'll skip this test since it requires backend integration
    
    await page.goto('/profile');
    
    // Check for profile page elements
    await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible();
    await expect(page.getByText('First Name')).toBeVisible();
    await expect(page.getByText('Last Name')).toBeVisible();
    await expect(page.getByText('Email Address')).toBeVisible();
    await expect(page.getByText('Role')).toBeVisible();
    await expect(page.getByText('Account Status')).toBeVisible();
    await expect(page.getByText('Member Since')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit Profile' })).toBeVisible();
  });

  test.skip('should allow editing profile information', async ({ page }) => {
    // This test requires authentication setup
    await page.goto('/profile');
    
    // Click edit button
    await page.click('button:has-text("Edit Profile")');
    
    // Verify form fields are now editable
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    
    // Verify action buttons are visible
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test.skip('should cancel profile editing', async ({ page }) => {
    await page.goto('/profile');
    
    // Click edit button
    await page.click('button:has-text("Edit Profile")');
    
    // Make some changes
    await page.fill('input[name="firstName"]', 'New Name');
    
    // Click cancel
    await page.click('button:has-text("Cancel")');
    
    // Verify we're back to view mode
    await expect(page.getByRole('button', { name: 'Edit Profile' })).toBeVisible();
    
    // Verify changes were not saved (original name should be displayed)
    await expect(page.locator('input[name="firstName"]')).not.toBeVisible();
  });

  test.skip('should save profile changes', async ({ page }) => {
    await page.goto('/profile');
    
    // Click edit button
    await page.click('button:has-text("Edit Profile")');
    
    // Make changes
    await page.fill('input[name="firstName"]', 'Updated');
    await page.fill('input[name="lastName"]', 'Name');
    
    // Save changes
    await page.click('button:has-text("Save Changes")');
    
    // Check for success message
    await expect(page.getByText('Profile updated successfully!')).toBeVisible();
    
    // Verify we're back to view mode
    await expect(page.getByRole('button', { name: 'Edit Profile' })).toBeVisible();
  });
});
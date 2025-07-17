import { Page } from '@playwright/test';

/**
 * Test helper functions for Playwright E2E tests
 */

/**
 * Wait for the page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 30000 });
}

/**
 * Fill a form field and wait for any dynamic updates
 */
export async function fillFormField(page: Page, selector: string, value: string) {
  await page.fill(selector, value);
  // Wait a brief moment for any dynamic validation or updates
  await page.waitForTimeout(300);
}

/**
 * Click a button and wait for any loading states
 */
export async function clickAndWait(page: Page, selector: string) {
  await page.click(selector);
  // Wait for potential loading states or navigation
  await page.waitForTimeout(1000);
}

/**
 * Mock API endpoints for testing without backend
 */
export async function mockApiEndpoints(page: Page) {
  // Mock successful registration
  await page.route('**/api/auth/register', route => {
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        token: 'mock-jwt-token'
      })
    });
  });

  // Mock successful login
  await page.route('**/api/auth/login', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        token: 'mock-jwt-token'
      })
    });
  });

  // Mock failed login
  await page.route('**/api/auth/login', route => {
    if (route.request().url().includes('invalid')) {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Invalid credentials'
        })
      });
    }
  });

  // Mock logout
  await page.route('**/api/auth/logout', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Logged out successfully' })
    });
  });

  // Mock user profile
  await page.route('**/api/users/profile', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString()
      })
    });
  });

  // Mock users list (admin)
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ])
    });
  });
}

/**
 * Test user credentials for different scenarios
 */
export const TEST_USERS = {
  validUser: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'Test@1234'
  },
  adminUser: {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Admin@1234'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  }
};

/**
 * Generate unique test data to avoid conflicts
 */
export function generateTestUser() {
  const timestamp = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${timestamp}@example.com`,
    password: 'Test@1234'
  };
}
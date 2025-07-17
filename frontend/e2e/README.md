# End-to-End Tests with Playwright

This directory contains comprehensive end-to-end tests for the Simple Auth System frontend using Playwright.

## Test Structure

### Test Files

- **`user-registration.spec.ts`** - Tests for user registration flow
  - Registration form validation
  - Password confirmation
  - Navigation between auth pages
  - Required field validation

- **`user-login.spec.ts`** - Tests for user login flow
  - Login form display and validation
  - Email format validation
  - Loading states
  - Navigation between auth pages

- **`user-profile.spec.ts`** - Tests for user profile management
  - Profile page access control
  - Profile editing functionality
  - Profile data updates

- **`admin-user-management.spec.ts`** - Tests for admin functionality
  - Admin access control
  - User management operations
  - Role and status updates
  - User deletion with confirmation

- **`user-logout.spec.ts`** - Tests for logout functionality
  - Navigation state changes
  - Authentication state management
  - Protected page access after logout

- **`complete-user-journey.spec.ts`** - Comprehensive E2E tests
  - Home page display
  - Form validation across pages
  - Loading states
  - Accessibility features
  - Responsive design

## Test Categories

### Currently Implemented Tests
- ✅ **UI/UX Tests** - Form rendering, navigation, validation
- ✅ **Client-side Validation** - Form validation, required fields
- ✅ **Loading States** - Button states, loading indicators
- ✅ **Accessibility** - Labels, input types, ARIA attributes
- ✅ **Responsive Design** - Multiple viewport sizes

### Tests Requiring Backend Integration (Skipped)
- 🚧 **Authentication Flow** - Actual login/registration with API
- 🚧 **Profile Management** - Profile updates with backend
- 🚧 **Admin Operations** - User management with backend
- 🚧 **Session Management** - Authentication state persistence

## Running Tests

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test user-registration.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests on specific browser
npx playwright test --project=chromium
```

### Test Configuration

The tests are configured in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled for faster execution
- **Auto-start Dev Server**: Automatically starts `npm run dev`
- **Trace Collection**: On test retry for debugging

## Test Development

### Writing New Tests

1. Create a new `.spec.ts` file in the `e2e` directory
2. Follow the existing test patterns and structure
3. Use descriptive test names and group related tests with `test.describe()`
4. Include both positive and negative test cases

### Test Patterns

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    await page.goto('/page-url');
    
    // Interact with elements
    await page.fill('input[name="field"]', 'value');
    await page.click('button[type="submit"]');
    
    // Assert expected behavior
    await expect(page.getByText('Expected text')).toBeVisible();
    await expect(page).toHaveURL('/expected-url');
  });
});
```

### Element Selection Best Practices

1. **Prefer role-based selectors**: `page.getByRole('button', { name: 'Submit' })`
2. **Use data attributes**: `page.locator('[data-testid="element"]')`
3. **Use semantic selectors**: `page.getByLabel('Email')`, `page.getByText('Welcome')`
4. **Avoid brittle selectors**: CSS classes, complex CSS selectors

### Test Data Management

- Use timestamps for unique test data: `const email = \`test\${Date.now()}@example.com\``
- Clean up test data when possible
- Use environment variables for configuration

## Backend Integration

To enable full E2E testing with authentication:

1. **Set up test database**: Create isolated test environment
2. **Create test users**: Seed database with test accounts
3. **Authentication helpers**: Create utilities for login/logout
4. **API mocking**: Mock external dependencies if needed

### Example Authentication Helper

```typescript
// test-helpers/auth.ts
export async function loginAsUser(page: Page, email: string, password: string) {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/');
}

export async function loginAsAdmin(page: Page) {
  return loginAsUser(page, 'admin@example.com', 'admin123');
}
```

### Test User Accounts

When backend is available, create these test accounts:

```typescript
const TEST_USERS = {
  regularUser: {
    email: 'user@example.com',
    password: 'Test@1234',
    firstName: 'Test',
    lastName: 'User',
    role: 'user'
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'Admin@1234',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  }
};
```

## Continuous Integration

For CI/CD environments:

```yaml
# .github/workflows/e2e.yml
- name: Run Playwright tests
  run: |
    npm ci
    npx playwright install --with-deps
    npm run test:e2e
```

## Debugging Tests

1. **Use headed mode**: `npx playwright test --headed`
2. **Use debug mode**: `npx playwright test --debug`
3. **Check traces**: Available in HTML reporter after failures
4. **Screenshots**: Automatically captured on failure
5. **Console logs**: Check browser console for errors

## Future Enhancements

- [ ] Add visual regression tests
- [ ] Implement performance testing
- [ ] Add API testing alongside E2E
- [ ] Create custom Playwright fixtures
- [ ] Add cross-browser compatibility tests
- [ ] Implement test reporting dashboard
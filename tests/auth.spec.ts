import { test, expect } from '@playwright/test';

const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;

test.describe('Registration', { tag: '@auth' }, () => {
  test('register user with valid data', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel(/username/i).fill(`student-${Date.now()}`);
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/password/i).fill('ValidPassword123!');
    await page.getByRole('button', { name: /sign up/i }).click();

    // Замініть на стабільний сигнал успішної реєстрації саме у вашій версії Conduit.
    await expect(
      page.getByRole('link', { name: /settings|profile/i }),
    ).toBeVisible();
  });

  test('register with used email', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel(/username/i).fill(`student-${Date.now()}`);
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/password/i).fill('ValidPassword123!');
    await page.getByRole('button', { name: /sign up/i }).click();

    // Замініть на стабільний сигнал успішної реєстрації саме у вашій версії Conduit.
    await expect(
      page.getByRole('link', { name: /settings|profile/i }),
    ).toBeVisible();
  });

  test('register with invalid password', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel(/username/i).fill(`student-${Date.now()}`);
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/password/i).fill('ValidPassword123!');
    await page.getByRole('button', { name: /sign up/i }).click();

    // Замініть на стабільний сигнал успішної реєстрації саме у вашій версії Conduit.
    await expect(
      page.getByRole('link', { name: /settings|profile/i }),
    ).toBeVisible();
  });
});

test.describe('success login', { tag: '@auth' }, () => {
  test('користувач входить з валідними даними', async ({ page }) => {
    // Arrange: підготуйте окремого існуючого користувача.
    await page.goto('/login');
    // Act та Assert.
  });

  test('login with invalid password', async ({ page }) => {
    // Arrange: підготуйте окремого існуючого користувача.
    await page.goto('/login');
    // Act та Assert.
  });

  test('login with not exist account', async ({ page }) => {
    // Arrange: підготуйте окремого існуючого користувача.
    await page.goto('/login');
    // Act та Assert.
  });
});

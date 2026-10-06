import { test, expect } from '@playwright/test';

const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;
const uniqueUsername = () => `user${Date.now()}${Math.floor(Math.random() * 1000)}`;

test.describe('Registration', { tag: '@auth' }, () => {
  test('register user with valid data', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
    
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(uniqueEmail());
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('passWORD1');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toBeVisible();
  });

  test('register with used email', async ({ page }) => {
    const email = uniqueEmail();
    
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();

    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('passWORD1');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toBeVisible();

    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();
    await expect(page.getByTestId('feed-tab-global')).toBeVisible();
    
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('passWORD1');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await page.getByText('body email або username').scrollIntoViewIfNeeded();
    await expect(page.getByText('body email або username')).toBeVisible();
  });

  test('register with mismatched confirm password', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
    
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(uniqueEmail());
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('pass');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await page.getByText('confirm password doesn\'t match').scrollIntoViewIfNeeded();
    await expect(page.getByText('confirm password doesn\'t match')).toBeVisible();
  });
});

test.describe('Login', { tag: '@auth' }, () => {
  test('success login', async ({ page }) => {
    const email = uniqueEmail();
    
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
    
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('passWORD1');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toBeVisible();

    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();
    await expect(page.getByTestId('feed-tab-global')).toBeVisible();
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('feed-tab-your')).toBeVisible();
  });

  test('login with invalid password', async ({ page }) => {
    const email = uniqueEmail();
    
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
    
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(uniqueUsername());
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill('passWORD1');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toBeVisible();

    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();
    await expect(page.getByTestId('feed-tab-global')).toBeVisible();
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('pass');
    await page.getByTestId('auth-submit').click();
    await page.getByText('email or password неправильні').scrollIntoViewIfNeeded();
    await expect(page.getByText('email or password неправильні')).toBeVisible();
  });

  test('login with not exist account', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.getByRole('link', { name: 'QA Dojo' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();

    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(uniqueEmail());
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('passWORD1');
    await page.getByTestId('auth-submit').click();
    await page.getByText('email or password неправильні').scrollIntoViewIfNeeded();
    await expect(page.getByText('email or password неправильні')).toBeVisible();
  });
});

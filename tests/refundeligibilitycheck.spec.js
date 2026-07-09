// What you are testing: Two separate tests — one booking with 1 ticket should show "Eligible for refund", a booking with 3 tickets should show "Not eligible for refund".

// Both tests verify the spinner appears and disappears before showing the result.

// ---

// Setup

// - BASE_URL = https://eventhub.rahulshettyacademy.com

// - Credentials: Use your own credentials

// - Write a reusable loginAndGoToBooking(page) helper that logs in and confirms the Browse Events → link is visible

// Test 1 — Single ticket booking is eligible for refund

// Step 1 — Login

// - Call your login helper



// Step 2 — Book first event with 1 ticket (default)

// - Navigate to /events

// - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")

// - Fill Full Name, Email (your email), Phone

// - Click confirm button (.confirm-booking-btn)



// Step 3 — Navigate to booking detail

// - Click View My Bookings link

// - Assert URL is /bookings

// - Click the first View Details link

// - Assert: text Booking Information is visible on the page



// Step 4 — Validate booking ref

// - Read booking ref from page

// - Read event title from h1

// - Assert validation : "first character of booking ref equals first character of event title"



// Step 5 — Check refund eligibility

// - Click the Check Refund Eligibility button

// - Assert: spinner element (#refund-spinner) is immediately visible

// - Assert: spinner is no longer visible within 6 seconds



// Step 6 — Validate result

// - Locate result element by id #refund-result

// - Assert it is visible

// - Assert it contains text Eligible for refund

// - Assert it contains text Single-ticket bookings qualify for a full refund



// ---

// Test 2 — Group ticket booking is NOT eligible for refund



// Steps 1–2 — Same as Test 1, except after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form



// - Locate the increment button with button:has-text("+") and click it twice



// Steps 3–5 — Identical to Test 1



// Step 6 — Validate result (different assertions)

// - Assert result contains Not eligible for refund

// - Assert result contains Group bookings (3 tickets) are non-refundable

// Questions for this assignment
// Complete Playwright code for given assignment instructions

import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// Helper: login and confirm Browse Events link
async function loginAndGoToBooking(Page, email, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByText('Browse Events')).toBeVisible();
}

test('Single ticket booking is eligible for refund', async ({ page }) => {
  const email = 'your@email.com';
  const password = 'yourPassword';

  // Step 1 — Login
  await loginAndGoToBooking(page, email, password);

  // Step 2 — Book first event with 1 ticket
  await page.goto(`${BASE_URL}/events`);
  const firstCard = page.locator('[data-testid="event-card"]').first();
  await firstCard.locator('[data-testid="book-now-btn"]').click();
  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
  await page.locator('.confirm-booking-btn').click();

  // Step 3 — Navigate to booking detail
  await page.getByText('View My Bookings').click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByText('View Details').first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Step 4 — Validate booking ref
  const bookingRef = (await page.locator('.booking-ref').innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5 — Check refund eligibility
  await page.getByText('Check Refund Eligibility').click();
  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  // Step 6 — Validate result
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Eligible for refund');
  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
});

test('Group ticket booking (3 tickets) is NOT eligible for refund', async ({ page }) => {
  const email = 'your@email.com';
  const password = 'yourPassword';

  // Step 1 — Login
  await loginAndGoToBooking(page, email, password);

  // Step 2 — Book first event with 3 tickets
  await page.goto(`${BASE_URL}/events`);
  const firstCard = page.locator('[data-testid="event-card"]').first();
  await firstCard.locator('[data-testid="book-now-btn"]').click();
  // Increase quantity to 3
  const incrementBtn = page.locator('button:has-text("+")');
  await incrementBtn.click();
  await incrementBtn.click();
  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
  await page.locator('.confirm-booking-btn').click();

  // Step 3 — Navigate to booking detail
  await page.getByText('View My Bookings').click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByText('View Details').first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Step 4 — Validate booking ref
  const bookingRef = (await page.locator('.booking-ref').innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5 — Check refund eligibility
  await page.getByText('Check Refund Eligibility').click();
  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  // Step 6 — Validate result
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Not eligible for refund');
  await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
});

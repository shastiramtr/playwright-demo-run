import { test, expect } from '@playwright/test';

// Helper: login function
async function login(page, email, password) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByText('Browse Events')).toBeVisible();
}

// Helper: future date value (simple example: tomorrow)
function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

test('Create event, book, and verify seat reduction', async ({ page }) => {
  const email = 'shastiram@gmail.com';
  const password = 'Shasti1993@';

  // Step 1 — Login
  await login(page, email, password);

  // Step 2 — Create a new event
  await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');
  const eventTitle = `Test Event ${Date.now()}`;
  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill('Automated test event description');
  await page.getByLabel('City').fill('Chennai');
  await page.getByLabel('Venue').fill('Test Venue');
  await page.getByLabel('Event Date & Time').fill(futureDateValue());
  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');
  await page.locator('#add-event-btn').click();
  await expect(page.getByText('Event created!')).toBeVisible();

  // Step 3 — Find the event card and capture seats
  await page.goto('https://eventhub.rahulshettyacademy.com/events');
  const cards = page.locator('[data-testid="event-card"]');
  await expect(cards.first()).toBeVisible();
  const matchedCard = cards.filter({ hasText: eventTitle });
  await expect(matchedCard).toBeVisible({ timeout: 5000 });
  const seatsBeforeText = await matchedCard.getByText(/seat/i).innerText();
  const seatsBeforeMatch = seatsBeforeText.match(/\d+/);
  const seatsBeforeBooking = seatsBeforeMatch ? parseInt(seatsBeforeMatch[0], 10) : 0;

  // Step 4 — Start booking
  await matchedCard.locator('[data-testid="book-now-btn"]').click();

  // Step 5 — Fill booking form
  await expect(page.locator('#ticket-count')).toHaveText('1');
  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill('customer@test.com');
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
  await page.locator('.confirm-booking-btn').click();

  // Step 6 — Verify booking confirmation
  const bookingRefElement = page.locator('.booking-ref').first();
  await expect(bookingRefElement).toBeVisible();
  const bookingRef = (await bookingRefElement.innerText()).trim();

  // Step 7 — Verify in My Bookings
  await page.getByText('View My Bookings').click();
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
  const bookingCards = page.locator('#booking-card');
  await expect(bookingCards.first()).toBeVisible();
  const matchedBookingCard = bookingCards.filter({ hasText: bookingRef });
  await expect(matchedBookingCard).toBeVisible();
  await expect(matchedBookingCard).toContainText(eventTitle);

  // Step 8 — Verify seat reduction
  await page.goto('https://eventhub.rahulshettyacademy.com/events');
  await expect(cards.first()).toBeVisible();
  const matchedCardAgain = cards.filter({ hasText: eventTitle });
  await expect(matchedCardAgain).toBeVisible();
  const seatsAfterText = await matchedCardAgain.getByText(/seat/i).innerText();
  const seatsAfterMatch = seatsAfterText.match(/\d+/);
  const seatsAfterBooking = seatsAfterMatch ? parseInt(seatsAfterMatch[0], 10) : 0;
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});

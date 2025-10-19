import {expect, test} from '@playwright/test';

test('stopwatch start/pause/reset (LED display)', async ({page}) => {
  await page.goto('http://localhost:4173');

  // Start by clicking anywhere on the container except the reset button
  await page.click('#stopwatch');
  await page.waitForTimeout(1200);
  // Pause by clicking again
  await page.click('#stopwatch');

  // Check the number of digits, colons, and dots (mm:ss.mmm)
  const digits = await page.$$('#stopwatch .led-digit');
  const colons = await page.$$('#stopwatch .led-colon');
  const dots = await page.$$('#stopwatch .led-dot');
  expect(digits.length).toBe(7); // 2m 2s 3ms
  expect(colons.length).toBe(1);
  expect(dots.length).toBe(1);

  // Check that the displayed time is not 00:00.000
  const timeAttr = await page.getAttribute('#stopwatch', 'data-time');
  expect(timeAttr).not.toBe('00:00.000');

  // Reset
  await page.click('#reset');
  const timeAfter = await page.getAttribute('#stopwatch', 'data-time');
  expect(timeAfter).toBe('00:00.000');
});
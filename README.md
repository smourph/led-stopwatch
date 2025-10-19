# LED Stopwatch

A minimal web application displaying a **precise real-time stopwatch** with a LED-style display and Start/Pause/Reset functionality. Ready for **GitHub Pages**.

## Features

- Shows hours, minutes, seconds, and milliseconds.
- Start / Pause / Reset.
- **Real-time accurate** stopwatch.
- Minimal LED-style display.
- Unit tests (Vitest) and E2E tests (Playwright) included.

## Tech Stack

- **Language:** TypeScript
- **Build:** Vite
- **Unit tests:** Vitest
- **E2E tests:** Playwright
- **CSS:** Minimal LED style
- **Deployment:** GitHub Pages, minimal build (`dist/`)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build and GitHub Pages Deployment

```bash
npm run build
git add -f dist
git commit -m "deploy"
git subtree push --prefix dist origin gh-pages
```

## Tests

Unit tests: `npm run test`

Unit tests in watch mode: `npm run test:watch`

End-to-End tests: `npm run e2e`

## End-to-end tests (Playwright)

This project uses [Playwright](https://playwright.dev/) for end-to-end (E2E) testing. You must install Playwright and its browsers:

```sh
npx playwright install
```

To run E2E tests, see below for the recommended command.

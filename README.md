# Playwright Testing Project

This repository contains automated tests using [Playwright](https://playwright.dev/), a reliable end-to-end testing framework for modern web apps.

## Project Structure

```
.
├── .github/workflows    # GitHub Actions workflow configuration
├── PageObjects          # Page Object Models for test organization
├── tests                # Test files and test suites
├── utils                # Utility functions and helpers
├── .DS_Store
├── .gitignore
├── package-lock.json    # Dependency lock file
├── package.json         # Project dependencies and scripts
└── playwright.config.js # Playwright configuration
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Srik2906/Playwright.git
   cd Playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in a specific file:
```bash
npx playwright test tests/example.spec.js
```

Run tests in headed mode (with browser visible):
```bash
npx playwright test --headed
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

## Test Reports

Generate and open HTML report:
```bash
npx playwright show-report
```

## Page Objects Pattern

This project utilizes the Page Object Model (POM) design pattern to create a layer of abstraction between test scripts and the UI. Page Objects are stored in the `PageObjects` directory.

## Continuous Integration

This project is configured with GitHub Actions for continuous integration. Workflow files are located in the `.github/workflows` directory.

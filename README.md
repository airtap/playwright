# airtap-playwright

**Playwright [browser provider](https://github.com/airtap/browser-provider). List and run [Playwright](https://playwright.dev/) browsers.**

[![npm status](http://img.shields.io/npm/v/airtap-playwright.svg)](https://www.npmjs.org/package/airtap-playwright)
[![node](https://img.shields.io/node/v/airtap-playwright.svg)](https://www.npmjs.org/package/airtap-playwright)
[![Test](https://img.shields.io/github/workflow/status/airtap/playwright/Test?label=test)](https://github.com/airtap/playwright/actions/workflows/test.yml)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript\&logoColor=fff)](https://standardjs.com)

## Table of Contents

<details><summary>Click to expand</summary>

- [Usage](#usage)
  - [Programmatic](#programmatic)
  - [With Airtap](#with-airtap)
- [API](#api)
  - [`Playwright()`](#playwright)
  - [Browser options](#browser-options)
- [Install](#install)
- [License](#license)

</details>

## Usage

### Programmatic

```js
const Playwright = require('airtap-playwright')
const provider = new Playwright()

// Get a list of desired browsers
const wanted = [{ name: 'chromium' }]
const manifests = await provider.manifests(wanted)

// Instantiate a browser
const target = { url: 'http://localhost:3000' }
const browser = provider.browser(manifests[0], target)

await browser.open()
```

### With [Airtap](https://github.com/airtap/airtap)

```yaml
providers:
  - airtap-playwright

browsers:
  - name: chromium
  - name: webkit
  - name: firefox
```

This provider also exposes a [`supports`](https://github.com/airtap/browser-manifest#supports) property to match on:

```yaml
browsers:
  - name: chromium
    supports:
      headless: true
```

## API

### `Playwright()`

Constructor. Returns an instance of [`browser-provider`](https://github.com/airtap/browser-provider).

### Browser options

- `headless` (boolean, default true): run in headless mode
- `launch` (object): custom options to pass to [`launch()`](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=browsertypelaunchoptions)
- `context` (object): custom options to pass to [`newContext()`](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=browsernewcontextoptions)
- `page` (object): custom options to pass to [`newPage()`](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=browsercontextnewpage)

In Airtap these can be set like so:

```yaml
browsers:
  - name: chromium
    options:
      headless: false
      launch:
        args: [--lang=en-US]
```

## Install

With [npm](https://npmjs.org) do:

```
npm install airtap-playwright
```

## License

[MIT](LICENSE) © 2020-present Airtap contributors

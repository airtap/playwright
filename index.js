'use strict'

const Provider = require('browser-provider')
const Browser = require('abstract-browser')
const playwright = require('playwright')

const kPlaywright = Symbol('kPlaywright')
const kDisconnected = Symbol('kDisconnected')
const kBrowser = Symbol('kBrowser')

class PlaywrightProvider extends Provider.promises {
  // Playwright doesn't expose versions (before launching):
  // https://github.com/microsoft/playwright/issues/2604
  async _manifests () {
    const options = { headless: true }
    const supports = { headless: true }
    const dev = { ...supports, devtools: true }

    return [
      { name: 'chromium', title: 'Playwright Chromium', options, supports: dev },
      { name: 'webkit', title: 'Playwright Webkit', options, supports },
      { name: 'firefox', title: 'Playwright Firefox', options, supports }
    ]
  }

  _browser (manifest, target) {
    return new PlaywrightBrowser(manifest, target)
  }
}

class PlaywrightBrowser extends Browser.promises {
  constructor (manifest, target) {
    super(manifest, target)

    this[kPlaywright] = playwright[this.manifest.name]
    this[kDisconnected] = this[kDisconnected].bind(this)
    this[kBrowser] = null
  }

  async _open () {
    const options = this.manifest.options
    const headless = options.headless
    const devtools = this.manifest.supports.devtools && !headless

    this[kBrowser] = await this[kPlaywright].launch({
      headless,
      devtools,

      // This is handled in airtap for all browsers
      handleSIGINT: false,
      handleSIGTERM: false,
      handleSIGHUP: false,

      ...options.launch
    })

    this[kBrowser].once('disconnected', this[kDisconnected])

    const context = await this[kBrowser].newContext(options.context)
    const page = await context.newPage(options.page)

    return page.goto(this.target.url)
  }

  [kDisconnected] () {
    this[kBrowser] = null
    this.emit('error', new Error('Premature exit'))
  }

  async _close () {
    if (this[kBrowser]) {
      this[kBrowser].removeListener('disconnected', this[kDisconnected])
      const promise = this[kBrowser].close()
      this[kBrowser] = null
      return promise
    }
  }
}

module.exports = PlaywrightProvider

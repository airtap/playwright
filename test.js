'use strict'

const test = require('tape')
const integration = require('airtap/test/integration')
const Provider = require('.')

if (process.env.CI) {
  integration(test, Provider, {
    // Exclude webkit for now.
    // TODO: fix webkit system dependencies on Travis
    wanted: [{ name: 'chromium' }, { name: 'firefox' }]
  })
} else {
  integration(test, Provider)
}

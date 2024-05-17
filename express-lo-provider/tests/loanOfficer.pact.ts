import test, { describe, before, after } from 'node:test'
import path, { dirname } from 'node:path'

import { Server } from 'node:http'
import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import { app } from '@/app'

const port = process.env.PORT || 3000

describe('Loan Officer Provider API', () => {
  let server: Server

  before(() => {
    server = app.listen(port, () => {
      console.log(`Listening on port http://localhost:${port}`)
    })
  })

  after(() => {
    if (server) {
      server.close()
    }
  })

  test('Should match with loan-officer-consumer', async () => {
    const opts: VerifierOptions = {
      logLevel: 'error',
      providerBaseUrl: 'http://localhost:3000',
      provider: 'loan-officer-provider',
      providerVersion: '1.0.0',
      pactUrls: [path.resolve(dirname(dirname(__dirname)), './pacts')]
    }

    return new Verifier(opts).verifyProvider().then(() => {
      console.log('Pact Verification Complete!')
    })
  })
})

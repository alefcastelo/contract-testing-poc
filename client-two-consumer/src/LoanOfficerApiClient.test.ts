import path from 'node:path'
import { describe, beforeAll, test, expect } from 'vitest'
import { PactV4, MatchersV3 } from '@pact-foundation/pact'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

describe('Pact between client-two-consumer and loan-officer-provider', () => {
  const provider = new PactV4({
    dir: path.resolve(path.dirname(process.cwd()), 'pacts'),
    consumer: 'client-two-consumer',
    provider: 'loan-officer-provider'
  })

  beforeAll(() => provider.setup())

  test('LO by id', async () => {
    await provider
      .addInteraction()
      .uponReceiving('LO by id')
      .withRequest('GET', '/loan-officers/1')
      .willRespondWith(200, (builder) => {
        builder.jsonBody({
          id: MatchersV3.integer(1),
          name: MatchersV3.string('Jammes')
        })
      })
      .executeTest(async (mockserver) => {
        const repository = new LoanOfficerApiClient(mockserver.url)
        const lot = await repository.getById(1)

        expect(lot).toEqual({
          id: 1,
          name: 'Jammes'
        })
      })
  })
})

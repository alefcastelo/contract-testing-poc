import path from 'node:path'
import { describe, beforeAll, test, expect } from 'vitest'
import { PactV4, MatchersV3 } from '@pact-foundation/pact'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

describe('Pact between client-one-consumer and loan-officer-provider', () => {
  const provider = new PactV4({
    dir: path.resolve(path.dirname(process.cwd()), 'pacts'),
    consumer: 'client-one-consumer',
    provider: 'loan-officer-provider'
  })

  beforeAll(() => provider.setup())

  test('LO list', async () => {
    await provider
      .addInteraction()
      .uponReceiving('LO list')
      .withRequest('GET', '/loan-officers')
      .willRespondWith(200, (builder) => {
        builder.jsonBody(
          MatchersV3.eachLike({
            id: MatchersV3.integer(1),
            name: MatchersV3.string('Jammes')
          })
        )
      })
      .executeTest(async (mockserver) => {
        const repository = new LoanOfficerApiClient(mockserver.url)
        const pets = await repository.getAll()

        expect(pets.length).toBeGreaterThanOrEqual(1)
        expect(pets).toEqual([
          {
            id: 1,
            name: 'Jammes'
          }
        ])
      })
  })
})

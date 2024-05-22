import path from 'node:path'
import { describe, beforeAll, test, expect } from 'vitest'
import { PactV4, MatchersV3 } from '@pact-foundation/pact'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

describe('Pact between client-one-consumer and loan-officer-provider', () => {
  const consumer = new PactV4({
    dir: path.resolve(path.dirname(process.cwd()), 'pacts'),
    consumer: 'client-one-consumer',
    provider: 'loan-officer-provider'
  })

  beforeAll(() => consumer.setup())

  test('LO list', async () => {
    await consumer
      .addInteraction()
      .uponReceiving('LO list')
      .withRequest('GET', '/loan-officers')
      .willRespondWith(200, (builder) => {
        builder.jsonBody(
          MatchersV3.eachLike({
            id: MatchersV3.integer(1)
          })
        )
      })
      .executeTest(async (mockserver) => {
        const repository = new LoanOfficerApiClient(mockserver.url)
        const los = await repository.getAll()

        expect(los.length).toBeGreaterThanOrEqual(1)
        expect(los).toEqual([
          {
            id: 1
          }
        ])
      })
  })
})

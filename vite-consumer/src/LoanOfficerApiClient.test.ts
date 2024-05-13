import { describe, beforeAll, test, expect } from 'vitest'
import { PactV4, MatchersV3 } from '@pact-foundation/pact'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

describe('Pact between loan-officer-consumer and loan-officer-provider', () => {
  const provider = new PactV4({
    consumer: 'loan-officer-consumer',
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
        const pet = await repository.getById(1)

        expect(pet).toEqual({
          id: 1,
          name: 'Jammes'
        })
      })
  })
})

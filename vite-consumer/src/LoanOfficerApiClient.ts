import { LoanOfficer } from './Types'

export class LoanOfficerApiClient {
  constructor(protected readonly baseUrl: string) {}

  async getAll(): Promise<LoanOfficer[]> {
    const response = await fetch(`${this.baseUrl}/loan-officers`)
    return await response.json()
  }

  async getById(id: number): Promise<LoanOfficer> {
    const response = await fetch(`${this.baseUrl}/loan-officers/${id}`)
    return await response.json()
  }
}

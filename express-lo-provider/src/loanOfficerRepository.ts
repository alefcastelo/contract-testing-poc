import type { LoanOfficer } from '@/types'

const loanOfficers: LoanOfficer[] = [
  { id: 1, name: 'Paul', licensedStates: ['CA', 'TX', 'WA'] },
  { id: 2, name: 'John', licensedStates: ['TX', 'CA'] },
  { id: 3, name: 'Brian', licensedStates: ['CA'] },
  { id: 4, name: 'James', licensedStates: ['WA', 'CA'] }
]

export class LoanOfficerRepository {
  async getById(idToCompare: number): Promise<LoanOfficer | undefined> {
    return loanOfficers.find(({ id }) => id === idToCompare)
  }

  async getAll(): Promise<LoanOfficer[]> {
    return loanOfficers
  }
}

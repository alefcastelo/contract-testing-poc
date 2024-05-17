import { useEffect, useState } from 'react'
import { LoanOfficer } from '@/Types'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

const loanOfficerApiClient = new LoanOfficerApiClient('http://localhost:3000')

function App() {
  const [loanOfficers, setLoanOfficers] = useState<LoanOfficer[] | null>(null)

  useEffect(() => {
    loanOfficerApiClient.getAll().then((data) => setLoanOfficers(data))
  })

  return (
    <>
      <h1>Loan Officers</h1>
      <ul>{loanOfficers?.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
    </>
  )
}

export default App

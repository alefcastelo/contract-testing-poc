import { useEffect, useState } from 'react'
import { LoanOfficer } from '@/Types'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

const loanOfficerApiClient = new LoanOfficerApiClient('http://localhost:3000')

function App() {
  const [loanOfficer, setLoanOfficers] = useState<LoanOfficer[] | null>(null)

  useEffect(() => {
    loanOfficerApiClient.getAll().then((data) => setLoanOfficers(data))
  })

  return (
    <>
      <h1>Loan Officers</h1>
      <ul>{loanOfficer?.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
    </>
  )
}

export default App

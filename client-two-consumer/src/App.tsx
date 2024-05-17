import { useEffect, useState } from 'react'
import { LoanOfficer } from '@/Types'
import { LoanOfficerApiClient } from '@/LoanOfficerApiClient'

const loanOfficerApiClient = new LoanOfficerApiClient('http://localhost:3000')

function App() {
  const [loanOfficer, setLoanOfficers] = useState<LoanOfficer | null>(null)

  useEffect(() => {
    loanOfficerApiClient.getById(1).then((data) => setLoanOfficers(data))
  })

  return (
    <>
      <h1>Loan Officer</h1>
      <span>{loanOfficer?.id}</span>
      <span>{loanOfficer?.name}</span>
    </>
  )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PersonalDataPage from '@/pages/PersonalDataPage'
import AddressPage from '@/pages/AddressPage'
import LoanPage from '@/pages/LoanPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/personal" replace />} />
        <Route path="/personal" element={<PersonalDataPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="*" element={<Navigate to="/personal" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { queryClient } from '@/lib/queryClient'
import PersonalDataPage from '@/pages/PersonalDataPage'
import AddressPage from '@/pages/AddressPage'
import LoanPage from '@/pages/LoanPage'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/personal" replace />} />
          <Route path="/personal" element={<PersonalDataPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/loan" element={<LoanPage />} />
          <Route path="*" element={<Navigate to="/personal" replace />} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App

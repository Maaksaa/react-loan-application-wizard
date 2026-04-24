import { create } from 'zustand'

export type Gender = 'male' | 'female'

export interface PersonalData {
  phone: string
  firstName: string
  lastName: string
  gender: Gender
}

export interface AddressData {
  workplace: string
  address: string
}

export interface LoanData {
  amount: number
  term: number
}

interface ApplicationState {
  personal: Partial<PersonalData>
  addressInfo: Partial<AddressData>
  loan: Partial<LoanData>

  setPersonal: (data: PersonalData) => void
  setAddress: (data: AddressData) => void
  setLoan: (data: LoanData) => void
  reset: () => void
}

const initialState = {
  personal: {},
  addressInfo: {},
  loan: {},
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  ...initialState,
  setPersonal: (data) => set({ personal: data }),
  setAddress: (data) => set({ addressInfo: data }),
  setLoan: (data) => set({ loan: data }),
  reset: () => set(initialState),
}))

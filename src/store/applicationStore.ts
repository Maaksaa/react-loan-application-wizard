import { create } from 'zustand'

/**
 * Application form state shared across the 3 steps.
 *
 * All fields are optional at the store level: a user might land on step 2
 * while step 1 is still in progress (e.g. refilling data after "Back").
 * Per-step validation is enforced by Zod schemas in each form,
 * so the store itself stays as a dumb data bag.
 */

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

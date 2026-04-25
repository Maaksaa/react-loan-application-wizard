import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from '@/lib/i18n'

interface ProvidersProps {
  children: ReactNode
  initialRoute?: string
}

function AllProviders({ children, initialRoute = '/' }: ProvidersProps) {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </MemoryRouter>
  )
}

/**
 * Custom render that wraps the UI in app-wide providers.
 * Keeps individual tests free of boilerplate.
 */
export function renderWithProviders(
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> & { initialRoute?: string } = {},
) {
  const { initialRoute, ...rtlOptions } = options
  return render(ui, {
    wrapper: ({ children }) => <AllProviders initialRoute={initialRoute}>{children}</AllProviders>,
    ...rtlOptions,
  })
}

# Loan Application — Wiam Group test task

Three-step single-page loan application: personal data → address & workplace → loan parameters, with validation, API integration and a result modal.

## Stack & rationale

| Concern       | Choice                                        | Why                                                                                                |
|---------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------|
| Build tool    | Vite                                          | Fast HMR, modern, listed as acceptable in the job spec                                             |
| Language      | TypeScript                                    | Required                                                                                           |
| UI            | React 19 + React Router v7                    | Required                                                                                           |
| Styling       | Tailwind CSS v4                               | Listed in the spec; v4 has zero-config setup with a Vite plugin                                    |
| State         | Zustand                                       | Minimal, no boilerplate; sufficient for 3 form steps. Redux would be overkill here                 |
| Forms         | React Hook Form + Zod (`@hookform/resolvers`) | RHF required by spec; Zod gives one schema for both runtime validation and TS types                |
| HTTP          | Axios                                         | Required by spec; centralised instance in `src/api/http.ts`                                        |
| Data fetching | TanStack Query                                | Solves the "reuse API result" requirement out of the box via cache; bonus from "nice-to-have" list |
| i18n          | react-i18next                                 | Bonus from "nice-to-have" list (en / ru, persisted in localStorage)                                |
| Tests         | Vitest + Testing Library                      | Bonus from "nice-to-have" list; native to Vite                                                     |
| Container     | Docker (multi-stage, nginx)                   | Required by spec                                                                                   |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build into ./dist
npm run preview      # preview the production build
npm run test         # vitest in watch mode
npm run test:run     # single run (CI)
npm run lint
npm run format
```

### Docker

```bash
docker build -t loan-app .
docker run -p 8080:80 loan-app
# http://localhost:8080
```

## Project structure
```text
src/
├── api/                  # axios instance + endpoint functions
├── components/           # generic, reusable UI (Input, Select, Button, Modal, …)
├── features/
│   └── application-form/ # everything specific to the 3-step form
│       ├── PersonalForm.tsx
│       ├── AddressForm.tsx
│       ├── LoanForm.tsx
│       ├── schemas.ts
│       ├── phoneMask.ts
│       ├── StepGuard.tsx
│       ├── useCategories.ts
│       └── useSubmitApplication.ts
├── lib/                  # cn(), queryClient, i18n setup
├── pages/                # route-level shells
├── store/                # Zustand store
└── test/                 # test setup and shared utilities
```

Layering: `pages` orchestrate, `features` own domain logic, `components` are presentational and reusable. API access goes through `api/` — components never call `axios` directly.

## Notable design decisions

- **Step-guard component** (`StepGuard.tsx`) prevents direct navigation to `/address` or `/loan` when prior steps are incomplete — without it, the submit payload would contain `undefined undefined` as the title.
- **Phone mask is hand-rolled** instead of pulling in `react-imask` (~15 KB gzipped). The mask format is fixed and singular; an imported library would be unjustified weight. Trade-off: caret position when editing the middle of the value isn't preserved — acceptable for a phone input where mid-string editing is rare. For production: switch to `react-imask`.
- **Zod schemas are factories** (`buildPersonalSchema(t)`) instead of static instances, so error messages re-localize when the user switches language. The form rebuilds its schema via `useMemo([t])`.
- **TanStack Query covers the "reuse API result" requirement** via cache keyed by `['categories']`. `staleTime: 5min` ensures the categories endpoint is hit at most once per session. The same library handles the submit mutation — uniform `isPending`/`isError`/`isSuccess` semantics across all network calls.
- **`Submit` button is disabled during the request, and so is `Back`** — prevents accidental loss of the in-flight request in a financial flow.
- **i18n** uses `localStorage` persistence so a chosen locale survives reloads.

## Accessibility

- Form fields use `<label htmlFor>` wiring; errors are linked via `aria-describedby` and announced via `role="alert"`.
- Step heading receives focus when the step changes — better keyboard / screen reader experience.
- Modal: backdrop and `Escape` close, body scroll lock, `role="dialog"` + `aria-modal`.
- Native `<input type="range">` for sliders — keyboard arrows and screen-reader output for free.

Note: the modal does not implement a full focus trap (only one focusable element inside). For production, I'd reach for Radix Dialog or `focus-trap-react`.

## Testing

```bash
npm run test:run
```

Coverage is intentionally focused, not exhaustive:

- `phoneMask.test.ts` — pure unit tests for the input formatter
- `Input.test.tsx` — verifies label / error / a11y wiring of a base UI component
- `PersonalForm.test.tsx` — integration test exercising RHF + Zod + Zustand + the mask together

## Out of scope (deliberately)

- E2E tests (Playwright/Cypress) — beyond the scope of an unpaid task; integration tests cover the critical path
- Full focus trap in the modal — see Accessibility note above
- SSR — the spec asks for an SPA; Next.js was an explicit "nice-to-have" but not appropriate here

## Time spent

Approximately **8 hours** in total, including stack research, implementation, polish, tests, Docker and this README.

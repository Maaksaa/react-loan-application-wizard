import { useNavigate } from 'react-router-dom'

export default function AddressPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <p className="mb-2 text-sm text-slate-500">Шаг 2 из 3</p>
      <h1 className="mb-6 text-2xl font-semibold">Адрес и место работы</h1>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/personal')}
          className="flex-1 rounded-md border border-slate-300 py-2"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={() => navigate('/loan')}
          className="flex-1 rounded-md bg-slate-900 py-2 text-white"
        >
          Далее
        </button>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'

export default function LoanPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <p className="mb-2 text-sm text-slate-500">Шаг 3 из 3</p>
      <h1 className="mb-6 text-2xl font-semibold">Параметры займа</h1>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/address')}
          className="flex-1 rounded-md border border-slate-300 py-2"
        >
          Назад
        </button>
        <button type="button" className="flex-1 rounded-md bg-slate-900 py-2 text-white">
          Подать заявку
        </button>
      </div>
    </div>
  )
}

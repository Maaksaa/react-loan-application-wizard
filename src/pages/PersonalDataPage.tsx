import { useNavigate } from 'react-router-dom'

export default function PersonalDataPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <p className="mb-2 text-sm text-slate-500">Шаг 1 из 3</p>
      <h1 className="mb-6 text-2xl font-semibold">Личные данные</h1>
      <button
        type="button"
        onClick={() => navigate('/address')}
        className="w-full rounded-md bg-slate-900 py-2 text-white"
      >
        Далее
      </button>
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { deleteRun, listRuns } from '../api/runs'
import type { Run, Task } from '../types/run'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import UploadDropzone from '../components/UploadDropzone'

const fmt = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
})
const formatDate = (iso: string) => fmt.format(new Date(iso)).replace(',', '')

const heads = ['Tên lần chạy', 'Dataset', 'Task', 'Split', 'Thời gian tạo']

export default function RunList() {
  const navigate = useNavigate()
  const [runs, setRuns] = useState<Run[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [target, setTarget] = useState<Run | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setRuns(await listRuns())
    } catch {
      setError('Không tải được danh sách lần chạy. Kiểm tra backend rồi thử lại.')
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => { load() }, [load])

  const confirmDelete = async () => {
    if (!target) return
    setDeleting(true)
    try {
      await deleteRun(target.id)
      setRuns((r) => r.filter((x) => x.id !== target.id))
      setTarget(null)
    } catch {
      setError('Không xoá được lần chạy. Bạn có thể không có quyền hoặc backend đang lỗi.')
      setTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  const onFile = (file: File, task: Task) => navigate('/runs/new', { state: { file, task } })

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Danh sách lần chạy</h1>
        <Link to="/runs/new" className="flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
          <Plus className="h-4 w-4" /> Nạp lần chạy
        </Link>
      </div>

      {error && (
        <div className="mt-4 flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
          <button onClick={load} className="font-medium underline">Thử lại</button>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              {heads.map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}
              <th className="px-5 py-3 text-center font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">Đang tải…</td></tr>
            )}
            {!loading && runs.length === 0 && !error && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">Chưa có lần chạy nào. Kéo thả file prediction bên dưới để bắt đầu.</td></tr>
            )}
            {runs.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-5 py-3.5 font-medium">{r.name}</td>
                <td className="px-5 py-3.5">{r.dataset}</td>
                <td className="px-5 py-3.5">{r.task}</td>
                <td className="px-5 py-3.5">{r.split}</td>
                <td className="px-5 py-3.5 tabular-nums">{formatDate(r.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <Link to={`/runs/${r.id}/dashboard`} className="rounded border border-brand px-3 py-1 text-xs font-medium text-brand hover:bg-brand-soft">
                      Xem
                    </Link>
                    <button onClick={() => setTarget(r)} aria-label={`Xoá ${r.name}`} className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UploadDropzone onFile={onFile} />

      {target && <ConfirmDeleteDialog run={target} busy={deleting} onCancel={() => setTarget(null)} onConfirm={confirmDelete} />}
    </div>
  )
}

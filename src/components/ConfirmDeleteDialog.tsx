import { Loader2 } from 'lucide-react'
import type { Run } from '../types/run'

interface Props {
  run: Run
  busy: boolean
  onCancel: () => void
  onConfirm: () => void
}

// HITL: hiển thị tên, số mẫu, giả thuyết và backlog phụ thuộc trước khi xoá (PRD mục 5)
export default function ConfirmDeleteDialog({ run, busy, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold">Xoá {run.name}?</h2>
        <p className="mt-2 text-sm text-slate-600">
          {run.samples != null && <>Lần chạy có {run.samples.toLocaleString('vi-VN')} mẫu. </>}
          Việc xoá không thể hoàn tác và ảnh hưởng đến:
        </p>
        <ul className="mt-3 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <li>{run.hypotheses ?? 0} giả thuyết</li>
          <li>{run.backlogRows ?? 0} dòng backlog phụ thuộc</li>
        </ul>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} disabled={busy} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Huỷ
          </button>
          <button onClick={onConfirm} disabled={busy} className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Xoá lần chạy
          </button>
        </div>
      </div>
    </div>
  )
}

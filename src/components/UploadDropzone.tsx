import { useRef, useState, type DragEvent } from 'react'
import { UploadCloud } from 'lucide-react'
import type { Task } from '../types/run'

interface Props {
  onFile: (file: File, task: Task) => void
}

export default function UploadDropzone({ onFile }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [task, setTask] = useState<Task | ''>('')
  const [over, setOver] = useState(false)
  const [error, setError] = useState('')

  const accept = (file?: File) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.json')) return setError('Chỉ nhận file prediction định dạng .json.')
    if (!task) return setError('Chọn task (2D hoặc 3D) trước khi chọn file.')
    setError('')
    onFile(file, task)
  }
  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setOver(false)
    accept(e.dataTransfer.files?.[0])
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={`mt-8 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors ${
        over ? 'border-brand bg-brand-soft' : 'border-slate-300 bg-white'
      }`}
    >
      <UploadCloud className="mx-auto h-9 w-9 text-brand" />
      <p className="mt-2 text-lg font-semibold">Kéo thả file prediction (json) vào đây</p>
      <p className="text-sm text-slate-500">Hoặc chọn file trên máy</p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value as Task | '')}
          aria-label="Task"
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
        >
          <option value="">Chọn task</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>
        <button onClick={() => input.current?.click()} className="h-10 rounded-md bg-brand px-5 text-sm font-medium text-white hover:bg-brand-dark">
          Chọn file
        </button>
        <input ref={input} type="file" accept=".json,application/json" hidden onChange={(e) => accept(e.target.files?.[0])} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{error}</p>}
    </div>
  )
}

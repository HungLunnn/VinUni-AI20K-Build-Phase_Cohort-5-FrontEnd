import { useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CloudUpload, Upload, X } from 'lucide-react'
import type { Task } from '../types/run'

interface UploadLocationState {
  file?: File
  task?: Task
}

export default function UploadRun() {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const locationState = (location.state as UploadLocationState | null) ?? {}
  const [file, setFile] = useState<File | null>(locationState.file ?? null)
  const [task, setTask] = useState<Task | ''>(locationState.task ?? '')
  const [dataset, setDataset] = useState('nuScenes')
  const [split, setSplit] = useState('val')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const acceptFile = (nextFile?: File) => {
    if (!nextFile) return
    if (!nextFile.name.toLowerCase().endsWith('.json')) {
      setError('Chỉ hỗ trợ file định dạng .json')
      return
    }
    setError('')
    setFile(nextFile)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  const submit = () => {
    if (!file) {
      setError('Vui lòng chọn file prediction trước khi tiếp tục.')
      return
    }
    if (!task) {
      setError('Vui lòng chọn loại Task.')
      return
    }
    setError('')
    const runId = `run_${Date.now()}`
    navigate(`/runs/${runId}/processing`, { replace: true })
  }

  return (
    <div className="upload-page">
      <h1>Nạp dữ liệu</h1>

      <div className="upload-card">
        <div className="upload-tabs" role="tablist">
          <button type="button" className="active" role="tab" aria-selected="true">
            <span className="tab-dot" /> Upload
          </button>
          <button type="button" role="tab" aria-selected="false">
            <span className="tab-dot outline" /> Cấu hình
          </button>
          <button type="button" role="tab" aria-selected="false">
            <span className="tab-dot outline" /> Xác nhận
          </button>
        </div>

        <div
          className={`dropzone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {file ? (
            <>
              <div className="file-icon"><Upload /></div>
              <strong className="file-name">{file.name}</strong>
              <p>{(file.size / 1024).toFixed(1)} KB · JSON prediction</p>
              <button type="button" className="remove-file" onClick={() => setFile(null)} aria-label="Xóa file">
                <X />
              </button>
              <button type="button" className="choose-file" onClick={() => inputRef.current?.click()}>
                Chọn file khác
              </button>
            </>
          ) : (
            <>
              <CloudUpload />
              <strong>Kéo thả file hoặc chọn file</strong>
              <p>Hỗ trợ .JSON, CSV, PDF</p>
              <button type="button" className="choose-file" onClick={() => inputRef.current?.click()}>
                Chọn file
              </button>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".json,.csv,.pdf,application/json,text/csv,application/pdf"
            hidden
            onChange={(event) => acceptFile(event.target.files?.[0])}
          />
        </div>

        {error && <div className="upload-error" role="alert">{error}</div>}

        <div className="upload-info">
          <h2>Thông tin nhanh</h2>
          <div className="info-grid">
            <label>
              <span>Dataset</span>
              <select value={dataset} onChange={(event) => setDataset(event.target.value)}>
                <option value="nuScenes">nuScenes</option>
                <option value="KITTI">KITTI</option>
                <option value="COCO">COCO</option>
              </select>
            </label>
            <label>
              <span>Task</span>
              <select value={task} onChange={(event) => setTask(event.target.value as Task | '')}>
                <option value="">Chọn task</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            </label>
            <label>
              <span>Split</span>
              <select value={split} onChange={(event) => setSplit(event.target.value)}>
                <option value="val">val</option>
                <option value="train">train</option>
                <option value="test">test</option>
              </select>
            </label>
            <label>
              <span>Kích thước</span>
              <input value={file ? `${(file.size / 1024).toFixed(1)} KB` : '— KB'} readOnly />
            </label>
          </div>
        </div>

        <footer className="upload-footer">
          <button type="button" className="back-button" onClick={() => navigate('/runs')}>Hủy</button>
          <button type="button" className="next-button" onClick={submit}>Tiếp tục</button>
        </footer>
      </div>
    </div>
  )
}

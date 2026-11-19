import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Circle } from 'lucide-react'

export default function ProcessingRun() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [progress, setProgress] = useState(12)
  const completed = progress === 100

  useEffect(() => {
    let redirectTimer = 0
    const first = window.setTimeout(() => setProgress(38), 900)
    const second = window.setTimeout(() => setProgress(60), 2200)
    const third = window.setTimeout(() => setProgress(78), 4200)
    const fourth = window.setTimeout(() => setProgress(92), 6000)
    const done = window.setTimeout(() => {
      setProgress(100)
      redirectTimer = window.setTimeout(
        () => navigate(`/runs/${id || 'new'}/dashboard`, { replace: true }),
        5000,
      )
    }, 7800)

    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
      window.clearTimeout(third)
      window.clearTimeout(fourth)
      window.clearTimeout(done)
      window.clearTimeout(redirectTimer)
    }
  }, [id, navigate])

  const stages = [
    { label: 'Đọc dữ liệu và chuẩn hóa', complete: progress >= 38 },
    { label: 'Tính toán AP/RDS', complete: progress >= 60 },
    { label: 'Ghép cặp prediction – ground truth', complete: progress >= 78 },
    { label: 'Phân loại lỗi', complete: progress >= 92 },
  ]

  return (
    <div className="processing-page">
      <h1>Đang xử lý</h1>

      <section className="processing-card" aria-live="polite">
        <div className={`processing-spinner ${completed ? 'completed' : ''}`} aria-hidden="true">
          <span />
        </div>

        <h2>{completed ? 'Xử lý hoàn tất' : 'Đang phân tích dữ liệu...'}</h2>
        <p className="processing-description">
          {completed
            ? 'Bạn có thể rời trang; hệ thống đã hoàn tất xử lý.'
            : 'Quá trình này có thể mất vài phút, vui lòng không rời trang.'}
        </p>

        <div className="processing-steps">
          {stages.map((stage) => (
            <div className="processing-step" key={stage.label}>
              {stage.complete ? (
                <span className="step-status complete"><Check /></span>
              ) : (
                <span className="step-status"><Circle /></span>
              )}
              <span>{stage.label}</span>
            </div>
          ))}
        </div>

        <div className="processing-progress-row">
          <div
            className="processing-progress-track"
            role="progressbar"
            aria-label="Tiến trình xử lý"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <strong>{progress}%</strong>
        </div>
      </section>

      {completed && (
        <>
          <div className="processing-note">
            Đối tượng ngoài 50 m: X.XXX (đã loại, có ghi chú)
          </div>
          <div className="processing-leave-note">
            Bạn có thể rời trang
          </div>
        </>
      )}
    </div>
  )
}

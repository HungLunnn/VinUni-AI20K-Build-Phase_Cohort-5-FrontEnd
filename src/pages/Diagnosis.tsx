import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import thumbnailImage from '../assets/thumbnail.jpg'
import anh2Image from '../assets/anh2.jpg'
import anh3Image from '../assets/anh3.jpg'

const clusters = [
  { id: 'A', label: 'Cụm A', detail: '37 lỗi · 0.91', color: '#72c99a', active: true },
  { id: 'B', label: 'Cụm B', detail: '12 lỗi · 0.87', color: '#ff7e84', active: false },
  { id: 'C', label: 'Cụm C', detail: '5 lỗi · 0.82', color: '#afc4de', active: false },
]

const hypothesisFrames = [thumbnailImage, anh2Image, anh3Image]

export default function Diagnosis() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeCluster, setActiveCluster] = useState('A')
  const [action, setAction] = useState('')

  return (
    <div className="diagnosis-page">
      <h1>Chẩn đoán – agent</h1>

      <section className="diagnosis-success">
        <CheckCircle2 />
        <span>Đã tìm được 5 giả thuyết chính với độ tin cậy cao</span>
      </section>

      <section className="diagnosis-card">
        <aside className="cluster-list">
          <h2>Cụm lỗi</h2>
          {clusters.map((cluster) => (
            <button
              type="button"
              key={cluster.id}
              className={`cluster-item ${activeCluster === cluster.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCluster(cluster.id)
                setAction('')
              }}
            >
              <span className="cluster-dot" style={{ background: cluster.color }} />
              <span>
                <strong>{cluster.label}</strong>
                <small>{cluster.detail}</small>
              </span>
              <span className="cluster-arrow">›</span>
            </button>
          ))}
        </aside>

        <article className="hypothesis-card">
          <header>
            <h2>
              Cụm {activeCluster}: {activeCluster === 'A' ? 'Bị che khuất bởi xe lớn' : 'Giả thuyết cần xem xét'}
            </h2>
            <span className="confidence">91%</span>
          </header>

          <p className="hypothesis-description">
            Lý do: Xe máy bị che bởi xe tải, xuất hiện ít nhiều frame.
          </p>

          <div className="hypothesis-frames">
            {hypothesisFrames.map((image, index) => (
              <div className="hypothesis-frame" key={image}>
                <img src={image} alt={`Frame minh họa giả thuyết ${index + 1}`} />
                {index < 2 && <span className="frame-label">{index === 0 ? 'Bị che' : 'Occlusion'}</span>}
              </div>
            ))}
          </div>

          <footer className="hypothesis-actions">
            <button type="button" className="action-primary" onClick={() => setAction('Đã duyệt giả thuyết')}>Duyệt</button>
            <button type="button" className="action-delete" onClick={() => navigate(`/runs/${id || '1'}/review`)}>Sửa</button>
            <button type="button" className="action-edit" onClick={() => setAction('Đã chuyển sang chỉnh sửa thủ công')}>Từ chối</button>
          </footer>

          {action && <div className="diagnosis-action-status" role="status">{action}</div>}
        </article>
      </section>
    </div>
  )
}

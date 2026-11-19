import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import thumbnailImage from '../assets/thumbnail.jpg'
import anh2Image from '../assets/anh2.jpg'
import anh3Image from '../assets/anh3.jpg'

const reviewFrames = [thumbnailImage, anh2Image, anh3Image]

export default function HypothesisReview() {
  const [status, setStatus] = useState('')
  const [confidence, setConfidence] = useState(91)

  return (
    <div className="review-page">
      <h1>Duyệt giả thuyết – HITL</h1>

      <section className="review-card">
        <header className="review-header">
          <span className="review-title">
            <span className="review-title-icon">G</span>
            Giả thuyết: Ly do bị che khuất xe ô tô phía trước
          </span>
          <span className="review-confidence">Độ tin cậy: {confidence}%</span>
        </header>

        <div className="review-frames">
          {reviewFrames.map((image, index) => (
            <button type="button" className="review-frame" key={image} aria-label={`Xem frame ${index + 1}`}>
              <img src={image} alt={`Frame giả thuyết ${index + 1}`} />
              {index === 0 && <span className="review-box review-box-red">GT</span>}
              {index > 0 && <span className="review-box review-box-blue">Pred</span>}
            </button>
          ))}

          <button type="button" className="review-more" onClick={() => setStatus('Đang mở danh sách tất cả frame')}>
            Xem tất cả (5)
          </button>
        </div>

        <article className="review-details">
          <h2>Chi tiết phân tích</h2>
          <div>
            <CheckCircle2 />
            <span>Đáp ứng Luật kinh học (không che bóng tấn bài hợp lý)</span>
          </div>
          <div>
            <CheckCircle2 />
            <span>Phù hợp với phân bố lỗi theo cảnh</span>
          </div>
        </article>

        {status && <div className="review-status" role="status">{status}</div>}

        <footer className="review-actions">
          <button
            type="button"
            className="reject-button"
            onClick={() => setStatus('Đã từ chối giả thuyết')}
          >
            Từ chối
          </button>
          <button
            type="button"
            className="edit-button"
            onClick={() => {
              setConfidence(Math.max(0, confidence - 1))
              setStatus('Đã chuyển sang chế độ sửa giả thuyết')
            }}
          >
            Sửa
          </button>
          <button
            type="button"
            className="approve-button"
            onClick={() => setStatus('Đã duyệt giả thuyết')}
          >
            Duyệt <CheckCircle2 />
          </button>
        </footer>
      </section>
    </div>
  )
}

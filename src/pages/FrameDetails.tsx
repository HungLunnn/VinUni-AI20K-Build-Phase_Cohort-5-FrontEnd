import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import thumbnailImage from '../assets/thumbnail.jpg'
import anh2Image from '../assets/anh2.jpg'
import anh3Image from '../assets/anh3.jpg'

const frameNotes = [
  'Mã mẫu: #a3f9',
  'Lúc: 6:30pm · Ban ngày',
  'Loại lỗi: Bỏ sót',
  'Độ tin cậy: 0.92',
]

const frames = [
  { src: thumbnailImage, alt: 'Frame thumbnail' },
  { src: anh2Image, alt: 'Frame ảnh 2' },
  { src: anh3Image, alt: 'Frame ảnh 3' },
]

export default function FrameDetails() {
  const [index, setIndex] = useState(1)
  const [tab, setTab] = useState<'info' | 'analysis'>('info')
  const [activeFrame, setActiveFrame] = useState(0)

  const previous = () => {
    setIndex((value) => Math.max(1, value - 1))
    setActiveFrame((value) => Math.max(0, value - 1))
  }

  const next = () => {
    setIndex((value) => Math.min(10, value + 1))
    setActiveFrame((value) => Math.min(frames.length - 1, value + 1))
  }

  return (
    <div className="frame-page">
      <h1>Frame lỗi + chi tiết</h1>

      <section className="frame-card">
        <div className="frame-image-column">
          <div className="frame-image">
            <img
              src={frames[activeFrame].src}
              alt={frames[activeFrame].alt}
            />
            <span className="vehicle-box gt-box">GT: car</span>
            <span className="vehicle-box pred-box">Pred: car</span>
          </div>

          <div className="frame-navigation">
            <button type="button" onClick={previous} disabled={index === 1} aria-label="Frame trước">
              <ChevronLeft />
            </button>
            <span><strong>{index}</strong> / 10</span>
            <button type="button" onClick={next} disabled={index === 10} aria-label="Frame tiếp theo">
              <ChevronRight />
            </button>
          </div>
        </div>

        <aside className="frame-detail-column">
          <div className="frame-tabs">
            <button type="button" className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>Thông tin</button>
            <button type="button" className={tab === 'analysis' ? 'active' : ''} onClick={() => setTab('analysis')}>Phân tích</button>
          </div>

          {tab === 'info' ? (
            <div className="frame-info">
              {frameNotes.map((note) => <p key={note}>{note}</p>)}

              <div className="frame-cause">
                <h2>Giả thuyết nguyên nhân</h2>
                <p>Bị che khuất bởi xe phía trước</p>
              </div>

              <div className="frame-thumbnails">
                {frames.map((frame, thumbIndex) => (
                  <button
                    type="button"
                    key={frame.alt}
                    className={thumbIndex === activeFrame ? 'selected' : ''}
                    onClick={() => {
                      setActiveFrame(thumbIndex)
                      setIndex(thumbIndex + 1)
                    }}
                    aria-label={`Mở frame ${thumbIndex + 1}`}
                  >
                    <img src={frame.src} alt={frame.alt} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="frame-analysis">
              <h2>Kết quả phân tích</h2>
              <p>Vật thể có xác suất bị che khuất cao do xe phía trước.</p>
              <p>Khoảng cách ước tính nằm trong ngưỡng ≤ 50 m.</p>
              <p>Khuyến nghị đưa frame này vào backlog thu thập dữ liệu.</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}

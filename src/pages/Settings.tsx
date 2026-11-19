import { useState } from 'react'
import { Check, Save, UserRound } from 'lucide-react'

export default function Settings() {
  const [name, setName] = useState('Hùng đẹp zai')
  const [email, setEmail] = useState('hunglun@example.com')
  const [role, setRole] = useState('Kỹ sư perception')
  const [notifications, setNotifications] = useState(true)
  const [autoReview, setAutoReview] = useState(false)
  const [distance, setDistance] = useState('50')
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="settings-page">
      <h1>Cài đặt</h1>

      <div className="settings-layout">
        <aside className="settings-menu">
          <button type="button" className="active"><UserRound /> Tài khoản</button>
          <button type="button">Thông báo</button>
          <button type="button">Phân tích</button>
          <button type="button">Hệ thống</button>
        </aside>

        <section className="settings-card">
          <div className="settings-section">
            <h2>Thông tin tài khoản</h2>
            <div className="settings-profile">
              <div className="settings-avatar">H</div>
              <div>
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            </div>

            <div className="settings-form-grid">
              <label>
                <span>Họ và tên</span>
                <input value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label>
                <span>Vai trò</span>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option>Kỹ sư perception</option>
                  <option>Kỹ sư dữ liệu</option>
                  <option>Người duyệt</option>
                  <option>Quản trị viên</option>
                </select>
              </label>
              <label>
                <span>Ngưỡng khoảng cách mặc định (m)</span>
                <input type="number" min="0" value={distance} onChange={(event) => setDistance(event.target.value)} />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Tùy chọn xử lý</h2>
            <div className="settings-toggle-row">
              <div>
                <strong>Thông báo hoàn tất xử lý</strong>
                <span>Hiển thị thông báo khi lần chạy đã phân tích xong</span>
              </div>
              <button
                type="button"
                className={`settings-toggle ${notifications ? 'on' : ''}`}
                onClick={() => setNotifications((value) => !value)}
                aria-label="Bật thông báo hoàn tất xử lý"
              >
                <span />
              </button>
            </div>

            <div className="settings-toggle-row">
              <div>
                <strong>Tự động chuyển sang duyệt giả thuyết</strong>
                <span>Mở trang HITL khi agent tạo đủ giả thuyết chính</span>
              </div>
              <button
                type="button"
                className={`settings-toggle ${autoReview ? 'on' : ''}`}
                onClick={() => setAutoReview((value) => !value)}
                aria-label="Bật tự động duyệt giả thuyết"
              >
                <span />
              </button>
            </div>
          </div>

          <footer className="settings-footer">
            {saved && (
              <span className="settings-saved"><Check /> Đã lưu thay đổi</span>
            )}
            <button type="button" className="settings-save" onClick={save}>
              <Save /> Lưu cài đặt
            </button>
          </footer>
        </section>
      </div>
    </div>
  )
}

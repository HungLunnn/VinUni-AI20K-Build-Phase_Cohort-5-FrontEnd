import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleHelp, Eye, EyeOff, Info, LockKeyhole, LogIn, Mail } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu.')
      return
    }
    setError('')
    navigate('/runs')
  }

  return (
    <main className="login-page">
      <div className="login-scene" aria-hidden="true">
        <svg className="login-art" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMax slice">
          <circle cx="720" cy="-65" r="420" stroke="#dfe9f7" strokeWidth="2" opacity="0.9" />
          <circle cx="720" cy="-65" r="330" stroke="#edf3fb" strokeWidth="2" />
          <circle cx="720" cy="-65" r="255" stroke="#edf3fb" strokeWidth="2" />
          <path d="M0 900V770C170 770 235 720 360 740C490 760 510 820 660 830C820 840 900 760 1040 740C1180 720 1280 770 1440 760V900H0Z" fill="#edf3fb" />
          <path d="M0 900V832C180 820 270 790 430 825C610 865 680 900 840 875C1010 848 1120 790 1440 830V900H0Z" fill="#dde9fa" />
          <path d="M0 900C230 760 400 760 620 835C820 903 1040 820 1440 790V900H0Z" fill="#f2f6fc" />

          <g opacity="0.38" stroke="#98b8e9" strokeWidth="3">
            <rect x="38" y="510" width="170" height="92" rx="4" fill="#deebfb" />
            <path d="M72 510L125 470H178L208 510M94 510L125 480H172L193 510" />
            <path d="M82 550H183M125 510V600M58 600H224" />
            <path d="M0 675H300M0 650H300" />

            <rect x="1115" y="480" width="150" height="118" rx="3" fill="#deebfb" />
            <circle cx="1190" cy="520" r="22" />
            <path d="M1150 598V548H1230V598M1190 548V598M1165 520H1215" />

            <rect x="1290" y="520" width="80" height="94" rx="3" fill="#deebfb" />
            <circle cx="1330" cy="552" r="9" />
            <path d="M1318 598L1322 570H1338L1342 598M1308 598V580M1352 598V580" />

            <rect x="268" y="540" width="62" height="62" rx="3" fill="#edf3fb" />
            <path d="M285 602V550H315V602M299 550V602" />
          </g>

          <g opacity="0.25" fill="#82aae7">
            <rect x="180" y="385" width="38" height="200" rx="2" />
            <rect x="1220" y="350" width="44" height="235" rx="2" />
            <rect x="1070" y="505" width="32" height="80" rx="2" />
          </g>

          <g fill="#c9ddf7" opacity="0.8">
            <circle cx="335" cy="520" r="45" /><circle cx="310" cy="540" r="38" />
            <circle cx="1025" cy="555" r="52" /><circle cx="1060" cy="570" r="38" />
            <circle cx="94" cy="625" r="58" /><circle cx="140" cy="648" r="42" />
            <circle cx="1260" cy="630" r="52" /><circle cx="1305" cy="650" r="45" />
          </g>
        </svg>
      </div>

      <section className="login-card" aria-label="Đăng nhập hệ thống">
        <header className="login-header">
          <div className="login-logo" aria-hidden="true">
            <svg viewBox="0 0 78 78">
              <circle cx="39" cx-opacity="1" cy="39" r="25" fill="#eef6ff" stroke="#8bc5ff" strokeWidth="5" />
              <circle cx="39" cy="39" r="13" fill="#d5eaff" stroke="#77b7f7" strokeWidth="4" />
              <circle cx="39" cy="39" r="5" fill="#397cf4" />
              <path d="M39 39L64 14" stroke="#397cf4" strokeWidth="8" strokeLinecap="square" />
              <path d="M8 20V10H18M60 10H70V20M70 58V68H60M18 68H8V58" stroke="#17223b" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h1>Detection Doctor</h1>
          <p>Phân tích và chẩn đoán lỗi mô hình phát hiện vật thể</p>
        </header>

        <form className="login-form" onSubmit={submit} noValidate>
          {error && <div className="login-error" role="alert">{error}</div>}

          <label className="login-field">
            <span>Email</span>
            <div className="login-input-wrap">
              <Mail aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Nhập email của bạn"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="login-field">
            <span>Mật khẩu</span>
            <div className="login-input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>

          <button className="login-submit" type="submit">
            <LogIn />
            <span>Đăng nhập</span>
          </button>

          <button type="button" className="login-help">
            <CircleHelp />
            <span>Hỗ trợ đăng nhập</span>
          </button>

          <div className="login-notice">
            <Info />
            <span>Vai trò được gán theo tài khoản. Người dùng không thể tự chọn vai trò.</span>
          </div>
        </form>
      </section>
    </main>
  )
}

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, Image } from 'lucide-react'

const errorTypes = [
  { label: 'Bỏ sót', value: '38.1%', color: '#ff8e98' },
  { label: 'Dương tính giả', value: '27.5%', color: '#66a0e8' },
  { label: 'Lệch vị trí', value: '15.3%', color: '#ffd43b' },
  { label: 'Sai kích thước', value: '11.2%', color: '#73d5a8' },
  { label: 'Nhầm lớp', value: '7.9%', color: '#ff9b58' },
]

const apRows = [
  { label: '≤ 50m – Bàn ngày – Không che', value: '76.5', delta: '±0.06%' },
  { label: '≤ 50m – Bàn ngày – Không che', value: '77.9', delta: '±0.56%' },
  { label: '≤ 50m – Đêm – Che khuất', value: '71.2', delta: '±0.81%' },
  { label: '≤ 50m – Mưa – Không che', value: '68.7', delta: '±0.75%' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { id } = useParams()
  const runId = id || '1'
  const [distance, setDistance] = useState('≤ 50m')
  const [weather, setWeather] = useState('Tất cả')
  const [time, setTime] = useState('Tất cả')
  const [detection, setDetection] = useState('Tất cả')

  return (
    <div className="dashboard-page">
      <h1>Dashboard lát cắt</h1>

      <section className="dashboard-filters" aria-label="Bộ lọc dashboard">
        <label>
          <span>Khoảng cách:</span>
          <span className="filter-select">
            <select value={distance} onChange={(event) => setDistance(event.target.value)}>
              <option>≤ 50m</option>
              <option>&gt; 50m</option>
              <option>Tất cả</option>
            </select>
            <ChevronDown />
          </span>
        </label>
        <label>
          <span>Che khuất:</span>
          <span className="filter-select">
            <select value={weather} onChange={(event) => setWeather(event.target.value)}>
              <option>Tất cả</option>
              <option>Che khuất</option>
              <option>Không che khuất</option>
            </select>
            <ChevronDown />
          </span>
        </label>
        <label>
          <span>Thời tiết:</span>
          <span className="filter-select">
            <select value={time} onChange={(event) => setTime(event.target.value)}>
              <option>Tất cả</option>
              <option>Mưa</option>
              <option>Khô</option>
            </select>
            <ChevronDown />
          </span>
        </label>
        <label>
          <span>Ngày/đêm:</span>
          <span className="filter-select">
            <select value={detection} onChange={(event) => setDetection(event.target.value)}>
              <option>Tất cả</option>
              <option>Ban ngày</option>
              <option>Ban đêm</option>
            </select>
            <ChevronDown />
          </span>
        </label>
      </section>

      <section className="metric-grid">
        <article>
          <span>mAP</span>
          <strong className="metric-blue">74.2 <small>↑ +1.2</small></strong>
        </article>
        <article>
          <span>NDS</span>
          <strong className="metric-blue">72.8 <small>↑ +1.0</small></strong>
        </article>
        <article>
          <span>ECE</span>
          <strong>1.7%</strong>
        </article>
        <article>
          <span>Lệnh devkit</span>
          <strong>&lt;8 s <small className="metric-muted">&gt; ~1.2s</small></strong>
        </article>
      </section>

      <section className="dashboard-content">
        <article className="dashboard-panel error-panel">
          <h2>Tỷ lệ 5 loại lỗi</h2>
          <div className="error-chart-wrap">
            <div className="donut-chart"><span>100%</span></div>
            <div className="error-legend">
              {errorTypes.map((item) => (
                <div key={item.label}>
                  <span className="legend-dot" style={{ background: item.color }} />
                  <span>{item.label}</span>
                  <small>{item.value}</small>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="dashboard-panel ap-panel">
          <h2>Bảng tắt (AP tầng cận)</h2>
          <div className="ap-table">
            {apRows.map((row, index) => (
              <div className="ap-row" key={`${row.label}-${index}`}>
                <span><i>≤</i>{row.label}</span>
                <strong>{row.value} <small>{row.delta}</small></strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <footer className="dashboard-footer">
        <button type="button" className="frame-button" onClick={() => navigate(`/runs/${runId}/frames`)}>
          <Image />
          Xem frame lỗi chi tiết
        </button>
        <button type="button" className="diagnosis-button" onClick={() => navigate(`/runs/${runId}/diagnosis`)}>
          Chạy chẩn đoán →
        </button>
      </footer>
    </div>
  )
}

import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'

type BacklogStatus = 'Chờ duyệt' | 'Đã duyệt'

interface BacklogItem {
  id: number
  issue: string
  evidence: string
  links: string
  status: BacklogStatus
}

const initialItems: BacklogItem[] = [
  { id: 1, issue: 'Nội dung cần thu thập', evidence: 'Theo crm A', links: '↝ #sp909', status: 'Chờ duyệt' },
  { id: 2, issue: 'Thêm dữ liệu xe máy bị che', evidence: 'Theo crm A', links: '↝ #s9029', status: 'Chờ duyệt' },
  { id: 3, issue: 'Bổ sung cảnh mưa, đêm', evidence: 'Bạn ngày', links: '↝ #m02b', status: 'Đã duyệt' },
]

export default function Backlog() {
  const [items, setItems] = useState(initialItems)
  const [nextId, setNextId] = useState(initialItems.length + 1)
  const fileInput = useRef<HTMLInputElement>(null)

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        id: nextId,
        issue: 'Nội dung mới cần thu thập',
        evidence: 'Chưa xác định',
        links: '—',
        status: 'Chờ duyệt',
      },
    ])
    setNextId((id) => id + 1)
  }

  const toggleStatus = (id: number) => {
    setItems((current) => current.map((item) =>
      item.id === id
        ? { ...item, status: item.status === 'Chờ duyệt' ? 'Đã duyệt' : 'Chờ duyệt' }
        : item,
    ))
  }

  const exportCsv = () => {
    const csv = [
      ['STT', 'Nội dung cần thu thập', 'Điều kiện', 'Liên kết', 'Trạng thái'],
      ...items.map((item) => [item.id, item.issue, item.evidence, item.links, item.status]),
    ]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')

    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'backlog-du-lieu.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="backlog-page">
      <header className="backlog-header">
        <h1>Backlog dữ liệu cần thu thập</h1>
        <button type="button" className="backlog-add-button" onClick={addItem}>
          <Plus /> Thêm dòng
        </button>
      </header>

      <section className="backlog-card">
        <div className="backlog-table" role="table">
          <div className="backlog-row backlog-head" role="row">
            <span role="columnheader">#</span>
            <span role="columnheader">Nội dung cần thu thập</span>
            <span role="columnheader">Điều kiện</span>
            <span role="columnheader">Liên kết</span>
            <span role="columnheader">Trạng thái</span>
          </div>

          {items.map((item) => (
            <div className="backlog-row" role="row" key={item.id}>
              <span role="cell">{item.id}</span>
              <span role="cell">{item.issue}</span>
              <span role="cell">{item.evidence}</span>
              <span role="cell" className="backlog-link">{item.links}</span>
              <span role="cell">
                <button
                  type="button"
                  className={`backlog-status ${item.status === 'Đã duyệt' ? 'approved' : 'pending'}`}
                  onClick={() => toggleStatus(item.id)}
                >
                  {item.status}
                </button>
              </span>
            </div>
          ))}
        </div>

        <footer className="backlog-footer">
          <button type="button" className="backlog-export" onClick={exportCsv}>
            Xuất báo cáo (PDF/CSV)
          </button>
          <input ref={fileInput} type="file" hidden />
        </footer>
      </section>
    </div>
  )
}

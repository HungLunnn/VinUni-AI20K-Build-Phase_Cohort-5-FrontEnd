import { NavLink } from 'react-router-dom'
import { Activity, LayoutDashboard, PlayCircle, FileText, ListChecks, Settings } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { to: '/runs', label: 'Lần chạy', icon: PlayCircle },
  { to: '/reports', label: 'Báo cáo', icon: FileText },
  { to: '/backlog', label: 'Backlog', icon: ListChecks },
  { to: '/settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col bg-navy-900 text-slate-300">
      <div className="flex items-center gap-2.5 px-5 py-6 text-white">
        <Activity className="h-7 w-7 text-sky-400" />
        <span className="text-[15px] font-semibold leading-tight">Detection<br />Doctor</span>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand text-white' : 'hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-navy-700 px-5 py-4 text-sm">
        <div className="font-medium text-white">Hùng đẹp zai</div>
        <div className="text-xs text-slate-400"><i>HungLunn</i></div>
      </div>
    </aside>
  )
}

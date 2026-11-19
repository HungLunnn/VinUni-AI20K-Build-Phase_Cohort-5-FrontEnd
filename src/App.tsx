import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'
import RunList from './pages/RunList'
import Login from './pages/Login'
import UploadRun from './pages/UploadRun'
import ProcessingRun from './pages/ProcessingRun'
import Dashboard from './pages/Dashboard'
import Backlog from './pages/Backlog'
import FrameDetails from './pages/FrameDetails'
import Diagnosis from './pages/Diagnosis'
import HypothesisReview from './pages/HypothesisReview'

// 9 màn hình theo wireframe. Mới có "Danh sách lần chạy"; các màn còn lại là placeholder.
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/runs" element={<RunList />} />
        <Route path="/runs/new" element={<UploadRun />} />
        <Route path="/runs/:id/processing" element={<ProcessingRun />} />
        <Route path="/runs/:id/frames" element={<FrameDetails />} />
        <Route path="/runs/:id/diagnosis" element={<Diagnosis />} />
        <Route path="/runs/:id/review" element={<HypothesisReview />} />
        <Route path="/reports" element={<Placeholder title="Báo cáo" />} />
        <Route path="/backlog" element={<Backlog />} />
        <Route path="/settings" element={<Placeholder title="Cài đặt" />} />
        <Route path="/runs/:id/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

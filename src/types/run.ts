export type Task = '2D' | '3D'

export interface Run {
  id: string
  name: string
  dataset: string
  task: Task
  split: string
  createdAt: string // ISO 8601
  // Dùng cho hộp xác nhận khi xoá (PRD mục 5)
  samples?: number
  hypotheses?: number
  backlogRows?: number
}

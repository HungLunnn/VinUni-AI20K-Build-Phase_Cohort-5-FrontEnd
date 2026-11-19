import { api } from './client'
import type { Run } from '../types/run'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

let MOCK: Run[] = [
  { id: '1', name: 'run_20261115_01', dataset: 'nuScenes', task: '3D', split: 'val', createdAt: '2026-11-15T14:32:00', samples: 6019, hypotheses: 4, backlogRows: 2 },
  { id: '2', name: 'run_20261114_03', dataset: 'nuScenes', task: '2D', split: 'val', createdAt: '2026-11-14T18:20:00', samples: 36114, hypotheses: 0, backlogRows: 0 },
  { id: '3', name: 'run_20261110_02', dataset: 'nuScenes', task: '3D', split: 'val', createdAt: '2026-11-10T09:12:00', samples: 6019, hypotheses: 1, backlogRows: 0 },
  { id: '4', name: 'run_20261108_01', dataset: 'nuScenes', task: '2D', split: 'val', createdAt: '2026-11-08T21:47:00', samples: 36114 },
  { id: '5', name: 'run_20261105_01', dataset: 'nuScenes', task: '3D', split: 'val', createdAt: '2026-11-05T16:05:00', samples: 6019 },
]
const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export async function listRuns(): Promise<Run[]> {
  if (useMock) { await wait(); return MOCK }
  const { data } = await api.get<Run[]>('/runs')
  return data
}

export async function deleteRun(id: string): Promise<void> {
  if (useMock) { await wait(); MOCK = MOCK.filter((r) => r.id !== id); return }
  await api.delete(`/runs/${id}`)
}

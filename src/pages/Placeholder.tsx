export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-500">Màn hình này chưa được dựng.</p>
    </div>
  )
}

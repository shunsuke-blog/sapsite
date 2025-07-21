type TwoColumnLayoutProps = {
  left: React.ReactNode
  right?: React.ReactNode
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    // <div className="max-w-7xl mx-auto py-8 px-4">
    <div className="max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 左側（2/3） */}
        <section className="md:col-span-3">{left}</section>
        {/* 右側（1/3） */}
        {/* <aside className="border-l border-gray-300 pl-6"> */}
        <aside className="border-l-4 pl-6" style={{ borderColor: 'accent-1' }}>
          {right ?? <p className="text-sub-text">サイドバー</p>}
        </aside>
      </div>
    </div>
  )
}
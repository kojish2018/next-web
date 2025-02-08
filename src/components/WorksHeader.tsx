export default function WorksHeader({ title }: { title: string }) {
  return (
    <header className="relative z-0">
      {/* ✅ `Our Works` の文字だけ最前面 (`z-50`) */}
      <h1 className="text-4xl font-bold text-black relative z-50">{title}</h1>

      {/* ✅ 背景部分や他の要素は `z-0` で背面に配置 */}
      <div className="absolute inset-0 bg-transparent z-0"></div>
    </header>
  );
}

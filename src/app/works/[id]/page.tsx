// src/app/works/[id]/page.tsx
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { projects } from "@/app/works/projects";
import { Project } from "@/types/project";

// ビルド時に生成するパスを定義する
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// ページコンポーネントの引数の型を Promise<{ id: string }> とする
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params を await して解決する
  const { id } = await params;
  const project: Project | undefined = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-works min-h-screen flex flex-col items-center justify-center relative">
      <Header />
      <div className="relative w-[90%] max-w-6xl h-auto min-h-[500px] bg-blue-950 rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row p-8 gap-8">
        <div className="flex-1 text-left text-white flex flex-col justify-between">
          <h1 className="text-4xl font-bold">{project.name}</h1>
          {/* ここにその他の表示処理 */}
        </div>
        {/* 右側の表示処理 */}
      </div>
    </div>
  );
}

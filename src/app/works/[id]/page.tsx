import { notFound } from "next/navigation";
import Header from "@/components/header";
import { projects } from "@/app/works/projects";
import { Project } from "@/types/project";
import WorkDetailClient from "@/components/WorkDetailClient";

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
      {/* クライアントコンポーネントにプロジェクトデータを渡す */}
      <WorkDetailClient project={project} />
    </div>
  );
}

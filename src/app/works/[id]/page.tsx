"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { projects } from "@/app/works/projects"; // ✅ プロジェクトデータをインポート
import { Project } from "@/types/project"; // ✅ 型をインポート

export default function WorkDetailPage() {
  const params = useParams();
  const projectId = params.id;

  // 対応するプロジェクトを取得
  const project: Project | undefined = projects.find((p) => p.id === projectId);

  // プロジェクトが見つからない場合の処理
  if (!project) {
    return (
      <div className="bg-works min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-works min-h-screen flex flex-col items-center justify-center relative">
      {/* コンテンツ */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 gap-12 z-10">
        {/* 左側のテキスト情報 */}
        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-black mb-6">{project.name}</h1>
          <div className="mb-8">
            <p className="text-lg font-semibold">Category</p>
            <div className="inline-block px-4 py-2 bg-black text-white rounded-lg">
              {project.category}
            </div>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Role</p>
            <div className="flex gap-2 flex-wrap">
              {project.role.map(
                (
                  role: string,
                  index: number // ✅ 明示的な型付け
                ) => (
                  <span
                    key={index}
                    className="inline-block px-4 py-2 bg-black text-white rounded-lg"
                  >
                    {role}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Tags</p>
            <div className="flex gap-2 flex-wrap">
              {project.tag.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-gray-200 text-black rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Visit Site ボタン */}
          <a
            href={project.url} // ✅ プロジェクトのリンクに飛ぶ
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition inline-block"
          >
            Visit Site
          </a>
        </motion.div>

        {/* 右側のメインビジュアル */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full h-96 lg:h-[600px] bg-black rounded-lg overflow-hidden">
            {/* 動的な画像リンクを生成 */}
            <Image
              src={project.image}
              alt={project.name}
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

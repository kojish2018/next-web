"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { projects } from "@/app/works/projects"; // ✅ プロジェクトデータをインポート
import { Project } from "@/types/project"; // ✅ 型をインポート
import WorksHeader from "@/components/WorksHeader"; // ✅ 共通ヘッダーをインポート

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

  // ✅ 画像が `mov` の場合は `video` タグを使用
  const isVideo = project.image.endsWith(".mov");

  return (
    <div className="bg-works min-h-screen flex flex-col items-center justify-center relative">
      {/* ✅ ヘッダー (長方形の外側) */}
      <div className="absolute top-0 left-0 w-full py-6 z-20">
        <WorksHeader />
      </div>

      {/* ✅ シャドウをつけた紺色の長方形 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90%] max-w-6xl h-auto lg:h-[60vh] bg-blue-950 rounded-xl shadow-2xl"></div>
      </div>

      {/* ✅ コンテンツ */}
      <motion.div
        className="relative flex flex-col lg:flex-row w-full max-w-6xl mx-auto px-8 lg:px-16 py-16 gap-12 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 左側のテキスト情報 */}
        <motion.div
          className="flex-1 text-left text-white" // ✅ 文字を白に
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
          <div className="mb-8">
            <p className="text-lg font-semibold">Category</p>
            <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg">
              {project.category}
            </div>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Role</p>
            <div className="flex gap-2 flex-wrap">
              {project.role.map((role: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Tags</p>
            <div className="flex gap-2 flex-wrap">
              {project.tag.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-gray-700 text-white rounded-lg"
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
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition inline-block w-full text-center"
          >
            Visit Site
          </a>
        </motion.div>

        {/* 右側のメインビジュアル (横長表示) */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full h-auto max-h-[400px] lg:max-h-[500px] bg-gray-900 rounded-lg overflow-hidden">
            {/* ✅ `mov` の場合は `video` を表示、それ以外は `next/image` */}
            {isVideo ? (
              <video
                src={project.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.name}
                width={1200} // 横長
                height={500} // 高さを制限
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

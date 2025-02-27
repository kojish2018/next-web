// src/components/WorkDetailClient.tsx
"use client"; // クライアントコンポーネントとして明示

import { motion } from "framer-motion";
import Image from "next/image";
import WorksHeader from "./WorksHeader";
import { Project } from "@/types/project";

type Props = {
  project: Project;
};

export default function WorkDetailClient({ project }: Props) {
  const isVideo = project.image.endsWith(".mov");

  return (
    <div className="bg-works min-h-screen flex flex-col items-center justify-center relative">
      {/* ヘッダー */}
      <div className="absolute top-0 left-0 w-full py-6 z-20">
        <WorksHeader />
      </div>

      {/* シャドウ付きの長方形 */}
      <div className="relative w-[90%] max-w-6xl h-auto min-h-[500px] bg-blue-950 rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row p-8 gap-8">
        {/* 左側のテキスト情報 */}
        <motion.div
          className="flex-1 text-left text-white flex flex-col justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold">{project.name}</h1>

          <div className="flex flex-col gap-4">
            {/* Category */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold w-32">Category</p>
              <span className="px-4 py-2 bg-gray-800 text-white rounded-lg min-w-[120px]">
                {project.category}
              </span>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold w-32">Role</p>
              <div className="flex gap-2">
                {project.role.map((role: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg min-w-[120px]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold w-32">Tags</p>
              <div className="flex gap-2 flex-wrap">
                {project.tag.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg min-w-[120px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visit Site ボタン */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition inline-block text-center"
          >
            Visit Site
          </a>
        </motion.div>

        {/* 右側のメインビジュアル */}
        <motion.div
          className="flex-1 relative flex items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-md h-[300px] bg-gray-900 rounded-lg overflow-hidden">
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
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WorksHeader from "@/components/WorksHeader"; // ✅ 共通ヘッダーをインポート
import CursorFollower from "@/components/CursorFollower";
import { projects } from "./projects"; // ✅ プロジェクトデータをインポート

export default function WorksPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-works min-h-screen flex flex-col items-center overflow-hidden relative">
      {/* 共通ヘッダー */}
      <WorksHeader />

      {/* スクロール可能エリア */}
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory z-10 relative">
        {isHovered && <CursorFollower />}

        {projects.map((project) => {
          const isVideo =
            project.image.endsWith(".webm") || project.image.endsWith(".mov");

          return (
            <motion.div
              key={project.id}
              className="w-full h-screen flex items-center justify-center snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link href={`/works/${project.id}`} className="w-[60%] h-[60%]">
                <div
                  className={`w-full h-full relative rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                    isVideo ? "brightness-125" : ""
                  }`}
                >
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
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg px-4">
                    <h2 className="text-3xl font-semibold text-center text-white mb-2">
                      {project.name}
                    </h2>
                    <p className="text-sm text-white">{project.category}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

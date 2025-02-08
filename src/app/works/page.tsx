"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WorksHeader from "@/components/WorksHeader";
import CursorFollower from "@/components/CursorFollower";
import { projects } from "./projects"; // ✅ `projects.ts` をインポート

export default function WorksPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-works min-h-screen flex flex-col items-center overflow-hidden relative">
      {/* ヘッダー */}
      <div className="absolute top-0 left-0 w-full py-6 z-0">
        <div className="max-w-5xl mx-auto px-6">
          <WorksHeader title="Our Works" />
        </div>
      </div>

      {/* スクロール可能エリア */}
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory z-10 relative">
        {isHovered && <CursorFollower />}

        {projects.map((project) => (
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
              <div className="w-full h-full relative rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105">
                {/* 画像 */}
                <Image
                  src={project.image}
                  alt={project.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {/* 画像上に情報を表示 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg px-4">
                  <h2 className="text-3xl font-semibold text-center text-white mb-2">
                    {project.name}
                  </h2>
                  <p className="text-sm text-white mb-4">{project.category}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tag.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-black text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

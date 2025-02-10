"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WorksHeader from "@/components/WorksHeader";
import CursorFollower from "@/components/CursorFollower";
import { projects } from "./projects";

export default function WorksPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-works min-h-screen flex flex-col items-center overflow-hidden relative">
      {/* 共通ヘッダー */}
      <WorksHeader />

      {/* ✅ スクロール可能エリア */}
      <div className="h-screen w-full md:overflow-y-scroll overflow-x-auto md:snap-y snap-x snap-mandatory z-10 relative flex md:flex-col flex-row">
        {isHovered && <CursorFollower />}

        {projects.map((project) => {
          const isVideo =
            project.image.endsWith(".webm") || project.image.endsWith(".mov");

          return (
            <motion.div
              key={project.id}
              className="w-screen md:w-full h-screen flex items-center justify-center snap-center shrink-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                href={`/works/${project.id}`}
                className="w-[80%] md:w-[60%]"
              >
                <div
                  className={`w-full h-auto aspect-[16/9] relative rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
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
                      fill
                      className="w-full h-full object-cover rounded-lg"
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

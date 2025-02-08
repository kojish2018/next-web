"use client";
import CursorFollower from "@/components/CursorFollower";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // `/works` のみカーソルフォロワーを適用
  const isWorksPage = pathname === "/works";

  return (
    <>
      {isWorksPage && <CursorFollower />} {/* ✅ `/works` のときだけ表示 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-screen bg-gray-900 text-white"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

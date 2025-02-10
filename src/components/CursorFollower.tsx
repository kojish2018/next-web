"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // 画面サイズを監視
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px以下ならモバイルと判定
    };

    handleResize(); // 初回チェック
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // マウスの位置を取得（モバイルでは実行しない）
  useEffect(() => {
    if (isMobile) return; // モバイル時はイベントを追加しない

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // モバイルではカーソルを表示しない
  if (isMobile) return null;

  return (
    <motion.div
      className="cursor fixed w-6 h-6 bg-red-500 z-50"
      animate={{
        x: mousePosition.x - 12, // マウスの中心に配置
        y: mousePosition.y - 12,
        rotate: [0, 360], // 常に回転
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        rotate: { repeat: Infinity, duration: 2, ease: "linear" }, // 2秒で1回転
      }}
    />
  );
}

import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    name: "Ambee Inc.",
    image: "/works/project1.jpg",
    category: "Corporate Website",
    role: ["Back-end", "Design", "Front-end"],
    tag: ["HTML/CSS", "JavaScript", "Node.js"],
    url: "https://www.ambee-inc.com/", // ✅ プロジェクトリンクを追加
  },
  {
    id: "2",
    name: "TRYT Worker",
    image: "/works/project2.jpg",
    category: "Healthcare Job Board",
    role: ["Back-end", "Front-end"],
    tag: ["Nuxt", "TypeScript", "Vue"],
    url: "https://tryt-worker.jp/", // ✅ プロジェクトリンクを追加
  },
  {
    id: "3",
    name: "Bambooshoot",
    image: "/works/project3.jpg",
    category: "Web App",
    role: ["Back-end", "Front-end"],
    tag: ["Next", "Typescript", "Node"],
    url: "https://mergerick.com/", // ✅ プロジェクトリンクを追加
  },
  {
    id: "4",
    name: "Gaudi",
    image: "/works/project4.jpg",
    category: "Mobile app and web app",
    role: ["Back-end", "Front-end"],
    tag: ["Angular.js", "Laravel", "Ionic"],
    url: "https://gaudi-bakery.com/", // ✅ プロジェクトリンクを追加
  },
  {
    id: "5",
    name: "Blog",
    image: "/works/project4.jpg",
    category: "Blog",
    role: ["Back-end", "Front-end"],
    tag: ["Next", "Typescript"],
    url: "https://blog.innoctet.com/", // ✅ プロジェクトリンクを追加
  },
];

export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  color: string;
  position: [number, number, number];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Startup Project - with AI Assistant",
    description:
      "Developed a web application to support professional networking with integrated LLMs to generate content and automate workflows.",
    link: "https://example.com/project1",
    color: "#7DD3FC",
    position: [-8, 0, -5],
  },
  {
    id: 2,
    name: "Fan Engagement & Prediction Platform",
    description:
      "Developed an interactive web app where users could predict match scores, create friend groups, and compete on leaderboards.",
    link: "https://example.com/project2",
    color: "#C77DFF",
    position: [0, 0, 0],
  },
  {
    id: 3,
    name: "Internal Platform for Managing Employees",
    description:
      "React-based HR management platform to streamline employee organization and internal processes",
    link: "https://example.com/project3",
    color: "#86EFAC",
    position: [8, 0, 5],
  },
];

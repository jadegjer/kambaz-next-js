"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation">
      {links.map((link) => {
        // Special case for People link
        const href = link === "People" 
          ? `/Courses/${cid}/People/Table` 
          : `/Courses/${cid}/${link}`;
        
        const isActive = pathname.includes(link);
        const linkId = `wd-course-${link.toLowerCase()}-link`;
        
        return (
          <div key={link}>
            <Link
              href={href}
              id={linkId}
              className={isActive ? "text-black" : "text-danger"}
            >
              {link}
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}
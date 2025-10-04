"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account", icon: <FaRegCircleUser className="fs-1" />, label: "Account", id: "wd-account-link" },
    { href: "/Dashboard", icon: <AiOutlineDashboard className="fs-1" />, label: "Dashboard", id: "wd-dashboard-link" },
    { href: "/Courses", icon: <LiaBookSolid className="fs-1" />, label: "Courses", id: "wd-course-link" },
    { href: "/Calendar", icon: <IoCalendarOutline className="fs-1" />, label: "Calendar", id: "wd-calendar-link" },
    { href: "/Inbox", icon: <FaInbox className="fs-1" />, label: "Inbox", id: "wd-inbox-link" },
    { href: "/Labs", icon: <LiaCogSolid className="fs-1" />, label: "Labs", id: "wd-labs-link" },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {links.map((link) => {
        const isActive = pathname === link.href || 
                        (link.label === "Account" && pathname.startsWith("/Account"));
        const isAccount = link.label === "Account";

        return (
          <ListGroupItem
            key={link.id}
            className={`border-0 text-center ${isActive ? "bg-white" : "bg-black"}`}
          >
            <Link
              href={link.href}
              id={link.id}
              className="text-decoration-none d-block"
            >
              <div className={isActive ? "text-danger" : isAccount ? "text-white" : "text-danger"}>
                {link.icon}
              </div>
              <div className={`${isActive ? "text-danger" : "text-white"} mt-1`} style={{ fontSize: "0.85rem" }}>
                {link.label}
              </div>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
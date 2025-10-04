"use client";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          href="/Labs" 
          active={pathname === "/Labs"}
        >
          Labs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          href="/Labs/Lab1" 
          active={pathname === "/Labs/Lab1"}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          href="/Labs/Lab2" 
          active={pathname === "/Labs/Lab2"}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          href="/Labs/Lab3" 
          active={pathname === "/Labs/Lab3"}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          href="/" 
          active={pathname === "/"}
        >
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          href="https://github.com/jannunzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../component/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Admin side eke user navbar eka pennanne na
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
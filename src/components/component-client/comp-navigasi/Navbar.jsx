"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoBaglog from "@/app/img/logoLogistik.png";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/not-found") return null;


  // Fungsi untuk menambahkan kelas "active"
  const isActive = (url) => (pathname === url ? "active-navbar-client" : "");

  // javascript bootstrap
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand d-flex" href="/">
            <Image
              alt="logo-logistik"
              src={logoBaglog}
              width={50}
              height={56}
            />
            <div className="d-flex flex-column mx-2">
              <span>BAGLOG POLRES</span>
              <span>KARIMUN</span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/")}`}
                  aria-current="page"
                  href="/"
                >
                  Pengajuan
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/viewharwat")}`}
                  href="/viewharwat"
                >
                  Pantau Harwat
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

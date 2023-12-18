import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { MdPeople } from "react-icons/md";
import CustomConfirm from "./CustomComponent/CustomConfirm";

const Sidebar = () => {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // logout code
  const handleLogout = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  // Add an array to store your navigation links
  const navigationLinks = [
    { href: "/", text: "Dashboard", icon: "bx bxs-dashboard" },
    { href: "/category", text: "Category", icon: "bx bx-analyse" },
    { href: "/memberlist", text: "Member List", icon: "bx bx-user" },
    { href: "/user", text: "Users", icon: "bx bx-group" },
  ];

  // Function to check if a link is active
  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  useEffect(() => {
    // Update the active link when the route changes
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );

    sideLinks.forEach((item) => {
      const li = item.parentElement;
      if (isLinkActive(item.getAttribute("href"))) {
        li.classList.add("active");
      }

      item.addEventListener("click", () => {
        sideLinks.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });
  }, [router.pathname]);

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar">
        <Link href="/" className="logo">
          <i className="bx bxs-caret-up-circle"></i>
          <div className="logo-name">
            <span>Cash</span>Flow
          </div>
        </Link>
        <ul className="side-menu">
          {navigationLinks.map((link, index) => (
            <li key={index} className={isLinkActive(link.href) ? "active" : ""}>
              <Link href={link.href}>
                <i className={link.icon}></i>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="side-menu">
          <li onClick={handleLogout}>
            <a href="#" className="logout">
              <i className="bx bx-log-out-circle"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
      {/* End of Sidebar */}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <CustomConfirm
          title="Logout Confirmation"
          body="Are you sure you want to logout?"
          button="Logout"
          onConfirm={() => {
            // Perform logout action here
            localStorage.removeItem("username");
            router.push("/login");
          }}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

import React from "react";
import Link from "next/link";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/user/history" className="nav-link">
          Historial
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/password" className="nav-link">
          Cambiar contraseña
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/wishlist" className="nav-link">
          Lista de deseos
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../Components/Context/AuthContext";
import { useSideBarCart } from "../../Components/Context/SideBarCartContext";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/OrderCard.css";

import NavBarWaiter from "../../Components/NavBarWaiter";
import SideBarWaiter from "../../Components/SideBarWaiter";
import SideBarCart from "../../Components/SideBarCart";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const handleSidebarOpen = () => {
    setOpen(true);
  };
  const handleSidebarClose = () => {
    setOpen(false);
  };

  // const { isSideBarCartOpen, setIsSideBarCartOpen } = useSideBarCart();

  const [openCart, setOpenCart] = useState(false);

  const handleSidebarCartOpen = () => {
    setOpenCart(true);
  };
  const handleSidebarCartClose = () => {
    setOpenCart(false);
  };

  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarWaiter
        onClickMenu={handleSidebarOpen}
        onClickSideBar={handleSidebarCartOpen}
        currentPath={pathname}
        onClickLogout={handleLogout}
        // isActive={}
      />
      <div>
        {/* <SideBarCart onClose={(e) => setIsSideBarCartOpen(false)} /> */}

        <SideBarCart isOpen={openCart} onClose={handleSidebarCartClose} />
        <SideBarWaiter isOpen={open} onClose={handleSidebarClose} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default WaiterView;

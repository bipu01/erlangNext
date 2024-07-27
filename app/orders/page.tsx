"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";

const OrdersPage = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  return (
    <>
      {!isAuthorized && <NotLoggedPopup />}
      <div>OrdersPage</div>
    </>
  );
};

export default OrdersPage;

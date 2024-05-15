"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import React from "react";
import { useRouter } from "next/navigation";

function ArrowBack() {
  const navigate = useRouter();

  return (
    <IoArrowBackOutline
      onClick={() => navigate.back()}
      className="cursor-pointer"
      size={32}
    />
  );
}

export default ArrowBack;

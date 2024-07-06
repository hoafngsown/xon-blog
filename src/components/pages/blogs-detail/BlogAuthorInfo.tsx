import Image from "next/image";
import React from "react";
import Logo from "@/../public/logo.png";

export default function BlogAuthorInfo() {
  return (
    <div className="flex gap-x-2">
      <Image src={Logo} alt="logo" width={100} height={100} />

      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-bold text-primary">Hoàng Sơn</p>
        <p className="text-sm  font-medium text-secondary">
          Hoàng Sơn Hoàng Sơn Hoàng Sơn Hoàng Sơn Hoàng Sơn
        </p>
      </div>
    </div>
  );
}

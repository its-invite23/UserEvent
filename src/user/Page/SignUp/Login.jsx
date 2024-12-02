import React from "react";
import LoginLogic from "./LoginLogic";
import Header from "../../compontents/Header";

export default function Login() {
  return (
    <div className="bg-[#000] 11h-screen ">
      <Header />
      <LoginLogic />
    </div>
  );
}

import React from "react";
import UserLayout from "../../Layout/UserLayout";
import LoginLogic from "./LoginLogic";

export default function Login() {
  return (
    <div className="bg-[#000] h-screen ">
      <UserLayout>
        <LoginLogic/>
      </UserLayout>
    </div>
  );
}

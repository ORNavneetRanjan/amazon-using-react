import React from "react";
import { FaOpencart } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GoPerson } from "react-icons/go";

function Login() {
  return (
    <>
      <div className="grow bg-gray-200 flex p-10">
        <div className="bg-blue-800 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
          <form className="flex flex-col items-center justify-center gap-5 m-auto">
            <FaOpencart className="text-white text-5xl lg:text-9xl" />
            <span className="h-11 w-56 lg:w-72 flex border-2 border-solid border-white gap-2">
              <label htmlFor="email">
                <GoPerson className="h-full text-3xl text-white p-1" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL"
                className="grow text-white bg-transparent p-2 placeholder-white outline-none"
              />
            </span>
            <span className="h-11 w-56 lg:w-72 flex border-2 border-solid border-white gap-2">
              <label htmlFor="password">
                <CiLock className="h-full text-3xl text-white p-1" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="PASSWORD"
                className="grow text-white bg-transparent p-2 placeholder-white outline-none"
              />
            </span>
            <span className="flex flex-col gap-1">
              <button className="text-blue-800 h-11 w-56 lg:w-72 p-2 text-2xl bg-white rounded-md shadow-md">
                LOGIN
              </button>
              <p className="text-white text-left self-end">Forgot password ?</p>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

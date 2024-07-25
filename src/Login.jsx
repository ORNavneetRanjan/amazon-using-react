import React from "react";
import { FaOpencart } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Login() {
  function callLoginApi(values){
    console.log("Sending data", values.email, values.password);
  }
  const schema = Yup.object().shape({
    email : Yup.string().email().required(),
    password : Yup.string().min(10).max(18).required(),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched} = useFormik({
    initialValues : {
      email: "",
      password: "",
    },
    onSubmit: {callLoginApi},
    validationSchema : schema,


  })
  return (
    <>
      <div className="grow bg-gray-200 flex p-10">
        <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
          <form
          onSubmit={handleSubmit} 
          className="flex flex-col items-center justify-center gap-5 m-auto">
            <FaOpencart className="text-white text-7xl lg:text-9xl" />
            <span className="h-11 w-56 lg:w-72 flex border-2 border-solid border-white gap-2">
              <label htmlFor="email">
                <GoPerson className="h-full text-3xl text-white p-1" />
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                
                value={values.email}
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL"
                className="grow text-white bg-transparent p-2 placeholder-white outline-none overflow-scroll"
              />
            </span>
            {touched.email && errors.email && <div className="text-red-600">{errors.email}</div>}
            
            <span className="h-11 w-56 lg:w-72 flex border-2 border-solid border-white gap-2">
              <label htmlFor="password">
                <CiLock className="h-full text-3xl text-white p-1" />
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                id="password"
                name="password"
                placeholder="PASSWORD"
                className="grow text-white bg-transparent p-2 placeholder-white outline-none overflow-scroll"
              />
              
            </span>
            {touched.password && errors.password && <div className="text-red-600">{errors.password}</div>}
            
            <span className="flex flex-col gap-1">
              <button 
              type="submit"
              className="text-sky-500 h-11 w-56 lg:w-72 p-2 text-2xl bg-white rounded-md shadow-md">
                LOGIN
              </button>
              <Link to="/forgot-pass" className="text-white text-left self-end" href="#">Forgot password ?</Link>
              <Link to="/signin" className="text-blue-800 text-left self-end">New here? SignIn </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

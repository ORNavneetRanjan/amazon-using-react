import React from "react";
import { FaOpencart } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";

function Login() {
  function callLoginApi(values){
    console.log("Sending data", values.email, values.password);
  }
  const schema = Yup.object().shape({
    email : Yup.string().email().required(),
    password : Yup.string().min(10).max(18).required(),
  });

  const initialValues = {
    email: "",
    password: "",
  }
    
  return (
    <>
      <div className="grow bg-gray-200 flex p-10">
        <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
          <Formik 
            initialValues={initialValues}
            onSubmit={callLoginApi}
            validationSchema={schema}
            validateOnMount
          
          >
          <Form
          
          noValidate
          className="flex flex-col items-center justify-center gap-1 m-auto">
            <FaOpencart className="p-2 text-white self-center h-28 lg:h-44 w-full" />
            <Input 
              label={<GoPerson className="h-full text-3xl text-white p-1"/>}
              id="email"
              type="email"
              name="email"
              placeholder="EMAIL"
              autoComplete="email"
              required
              className=" mt-3 rounded-b-none "
            />
           
            <Input
              label={<CiLock className="h-full text-3xl text-white p-1"/>}
              id="password"
              type="password"
              name="password"
              placeholder="PASSWORD"
              required
              autoComplete="password"
              className=" mb-2 rounded-t-none"
            />
            <span className="flex flex-col gap-1">
              <button 
              type="submit"
              className="mt-3 text-sky-500 h-11 w-56 lg:w-72 p-2 text-2xl rounded-md shadow-md bg-white " >
                
                LOGIN
              </button>
              <Link to="/forgot-pass" className="text-white text-left self-end" href="#">Forgot password ?</Link>
              <Link to="/signin" className="text-blue-800 text-left self-end">New here? SignIn </Link>
            </span>
          </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Login;

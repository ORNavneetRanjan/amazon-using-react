import React from "react";
import { FaOpencart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { Link, redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn(){

    function callSignInApi(values){
        console.log("email", values.email, "name", values.username, "password", values.password);
    }
    const schema = Yup.object().shape({
        username : Yup.string().concat().lowercase().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).max(18).required(),
        cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    });

    const {handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues : {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        onSubmit : callSignInApi,
        validationSchema : schema,
    })
    return (<>
        <div className="grow bg-gray-200 flex p-10">
            <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
                <form 
                onSubmit={handleSubmit}
                className="gap-2 flex flex-col justify-center items-center">
                    <FaOpencart className="text-white text-7xl lg:text-9xl" />
                    <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
                        <GoPerson className="h-full text-3xl text-white p-1"/>
                        <input 
                        value={values.username}
                        onChange={handleChange}
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="USERNAME"
                        className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll" />
                    </span>
                    {touched.username && errors.username && <div className="text-red-600">* {errors.username}</div>}
                    <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
                        <TfiEmail className="h-full text-3xl text-white p-1"/>
                        <input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="EMAIL"
                        className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
                        />
                    </span>
                    {touched.email && errors.email && <div className="text-red-600">* {errors.email}</div>}
                    <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
                        <CiLock className="h-full text-4xl text-white p-1" />
                        <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="PASSWORD"
                        className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
                        />
                    </span>
                    {touched.password && errors.password && <div className="text-red-600">* {errors.password}</div>}
                    <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
                        <CiLock className="h-full text-4xl text-white p-1" />
                        <input
                        value={values.cpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        placeholder="CONFIRM PASSWORD"
                        className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
                        />
                    </span>
                    {touched.cpassword && errors.cpassword && <div className="text-red-600">* {errors.cpassword}</div>}
                    <span className="flex flex-col gap-1">
                        <button 
                        type="submit"
                        className="text-sky-500 h-11 w-56 lg:w-72 p-2 text-2xl bg-white rounded-md shadow-md">
                            SIGNIN
                        </button>
                        <Link  to="/login" className="text-blue-800 text-left self-end">Already a user? Login</Link>
                    </span>
                </form>
            </div>
        </div>
    </>
    );
};
export default SignIn;
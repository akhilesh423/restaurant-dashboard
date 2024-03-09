

import "./Signin.css"

import { useState } from "react"
import Cookies from "js-cookie";

import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";



const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMsgs, setErrorMsgs] = useState({
        emailError: "",
        passwordError: ""
    })


    const [invalidError, setInvalidError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.email === "" || formData.password === "") {
                if (formData.email === "") {
                    setErrorMsgs(prevErrors => ({
                        ...prevErrors,
                        emailError: "Email is required"
                    }));
                }
                if (formData.email === "") {
                    setErrorMsgs(prevErrors => ({
                        ...prevErrors,
                        passwordError: "Password is required"
                    }));
                }
                return
            }
            const response = await fetch('https://bling-bliss.onrender.com/admin/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (response.status === 200) {
                    const data = await response.json();

                    console.log(data)
                    Cookies.set('token', data.token, { expires: 30 });
                    navigate("/")
                    setFormData({
                        email: "",
                        password: ""
                    })
                    setErrorMsgs({
                        emailError: "",
                        passwordError: ""
                    })
                    setInvalidError("")

                }
            }

        } catch (error) {
            console.error('Error signing in:', error);

        }


    }


    const handleInputData = (e) => {
        const { name, value } = e.target
        if (name === "password" && value !== "") {
            setErrorMsgs(prevErrors => ({
                ...prevErrors,
                ['passwordError']: ""
            }));
        }
        if (name === "email" && value !== '') {
            setErrorMsgs(prevErrors => ({
                ...prevErrors,
                ['emailError']: ""
            }));
        }
        if (name === "email" && value !== '' || name === "password" && value !== '') {
            setInvalidError("")
        }
        setFormData({
            ...formData,
            [name]: value,
        });

    }



    return (
        <div className="sign-in-container">
            <div className="bg-white shadow-lg rounded-xl p-4 pb-8 signin-form">
                <div className="bg-blue-500 rounded-xl w-full card-margin p-3 pt-3 pb-2 ">
                    <h1 className="text-center text-white font-sans text-2xl font-bold	italic">Bling and Bliss</h1>
                    <h2 className=" text-center text-white font-sans text-base mt-3 font-normal">Enter your email and password to login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" class="block mt-5">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Email
                        </span>
                        <input onChange={handleInputData} value={formData.email} type="email" id="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                    </label>
                    {errorMsgs.emailError ? <p className="text-red-500 text-xs">{errorMsgs.emailError}</p> : ""}
                    <label htmlFor="password" class="block mt-5">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Password
                        </span>
                        <input onChange={handleInputData} value={formData.password} id="password" type="password" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password" />
                    </label>
                    {errorMsgs.passwordError ? <p className="text-red-500 text-xs">{errorMsgs.passwordError}</p> : ""}
                    {invalidError && (
                        <p className="text-red-500 text-sm">{invalidError}</p>
                    )}

                    <br />
                    <button id="button" type="submit" className="w-full h-9 bg-blue-500 hover:bg-sky-700 font-sans text-sm font-semibold text-white rounded-lg mt-5">SIGN IN</button>
                </form>
                <Link to="/signup"><p className="mt-5 text-neutral-500 font-sans font-normal text-center" >Don't have a account? <span className="text-blue-500 font-semibold" >Sign Up</span></p></Link>

            </div>
        </div>

    )
}


export default Signin
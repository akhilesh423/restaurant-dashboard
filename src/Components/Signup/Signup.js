import { useState } from "react";
import Cookies from 'js-cookie';
import { Link, Navigate } from "react-router-dom"



import { useNavigate } from "react-router-dom";



import "./Signup.css"

export default function Signup() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const [errorMsgs, setErrorMsgs] = useState({
        userAlreadyExists: "",
        wrongPassword: "",
        wrongEmail: "",
        name: ''

    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.name) {

            const errorMessages = {};
            if (!formData.email) {
                errorMessages['wrongEmail'] = "Email is required*";
            }
            if (!formData.password) {
                errorMessages['wrongPassword'] = "Password is required*";
            }
            if (!formData.name) {
                errorMessages['name'] = "Name is required*";
            }

            setErrorMsgs({
                ...errorMsgs,
                ...errorMessages
            });

            return;
        }


        await handleSignup();
    }


    const handleSignup = async () => {
        const url = "https://bling-bliss.onrender.com/admin/signup";
        try {
            if (formData.password.length < 5) {
                setErrorMsgs({
                    ...errorMsgs,
                    ['wrongPassword']: "Password must be at least 5 characters long"
                });
                return;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('token', data.token, { expires: 30 });

                setFormData({
                    email: '',
                    password: '',
                    name: ''
                });
                setErrorMsgs({
                    userAlreadyExists: '',
                    wrongPassword: '',
                    wrongEmail: "",
                });
                navigate("/");
            } else {
                if (response.status === 401) {
                    const data = await response.json();

                    setErrorMsgs({
                        ...errorMsgs, ['wrongEmail']: data.msg[0].message, ["wrongPassword"]: data.msg[1].message
                    })
                }
                if (response.status === 400) {
                    const data = await response.json();

                    setErrorMsgs(prevErrors => ({
                        ...prevErrors,
                        ['userAlreadyExists']: data.msg, ["wrongEmail"]: ""
                    }));
                } else {
                    throw new Error('Server error');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputData = (e) => {
        const { name, value } = e.target
        if (name === "password" && value.length >= 5) {

            setErrorMsgs(prevErrors => ({
                ...prevErrors,
                ['wrongPassword']: ""
            }));
        }
        if (name === "email" && value !== '') {
            setErrorMsgs(prevErrors => ({
                ...prevErrors,
                ['wrongEmail']: ""
            }));
        }
        if (name === "name" && value !== '') {
            setErrorMsgs(prevErrors => ({
                ...prevErrors,
                ['name']: ""
            }));
        }
        setFormData({
            ...formData,
            [name]: value,
        });

    }

    return (
        <div className="p-3 bg-slate-50">
            <div className="logo-container">
            </div>

            <div className="bg-white form-container shadow-lg rounded-xl p-4 m-auto pb-8">
                <div id="card" className="bg-blue-500 rounded-xl w-full card-margin p-3 pt-3 pb-2 ">
                    <h1 className="text-center text-white font-sans text-2xl font-bold italic">Akhil's Kitchen</h1>
                    <h2 className=" text-center text-white font-sans text-base mt-3 font-normal">Enter your email and password to register</h2>

                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Name
                        </span>
                        <input onChange={handleInputData} value={formData.name} type="text" id="name" name="name" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your name" />
                    </label>
                    {errorMsgs.name && (
                        <p className="text-red-500 text-sm">{errorMsgs.name}</p>
                    )}

                    <label htmlFor="email" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Email
                        </span>
                        <input onChange={handleInputData} value={formData.email} type="email" id="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                    </label>
                    {errorMsgs.userAlreadyExists && (
                        <p className="text-red-500 text-sm">{errorMsgs.userAlreadyExists}</p>
                    )}
                    {errorMsgs.wrongEmail && (
                        <p className="text-red-500 text-xs">{errorMsgs.wrongEmail}</p>
                    )}
                    <label htmlFor="password" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Password
                        </span>
                        <input onChange={handleInputData} value={formData.password} id="password" type="password" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password" />
                    </label>
                    {errorMsgs.wrongPassword && (
                        <p className="text-red-500 text-xs">{errorMsgs.wrongPassword}</p>
                    )}
                    <br />
                    <button id="button" type="submit" className="w-full h-9 bg-blue-500 hover:bg-sky-700 font-sans text-sm font-semibold text-white rounded-lg mt-4">SIGN UP</button>
                </form>

                <Link to="/signin">  <p className="mt-5 text-neutral-500 font-sans font-normal text-center" >Already have a account? <span className="text-blue-500 font-semibold" >Sign In</span></p> </Link>

            </div>

        </div>
    )
}
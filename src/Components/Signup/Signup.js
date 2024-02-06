import { useState } from "react";

import "./Signup.css"

export default function Signup() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleInputData = (e) => {
        const { name, value } = e.target
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
                <div className="bg-blue-500 rounded-xl w-full card-margin p-3 pt-3 pb-2 ">
                    <h1 className="text-center text-white font-sans text-2xl font-bold italic">Bling and Bliss</h1>
                    <h2 className=" text-center text-white font-sans text-base mt-3 font-normal">Enter your email and password to register</h2>

                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Name
                        </span>
                        <input onChange={handleInputData} value={formData.name} type="text" id="name" name="name" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your name" />
                    </label>

                    <label htmlFor="email" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Email
                        </span>
                        <input onChange={handleInputData} value={formData.email} type="email" id="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                    </label>
                    <label htmlFor="password" class="block mt-4">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Password
                        </span>
                        <input onChange={handleInputData} value={formData.password} id="password" type="password" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password" />
                    </label>
                    <br />
                    <button id="button" type="submit" className="w-full h-9 bg-blue-500 hover:bg-sky-700 font-sans text-sm font-semibold text-white rounded-lg mt-4">SIGN IN</button>
                </form>

                <p className="mt-5 text-neutral-500 font-sans font-normal text-center" >Already have a account? <span className="text-blue-500 font-semibold" >Sign In</span></p>

            </div>

        </div>
    )
}
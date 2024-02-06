

import "./Signin.css"

import { useState } from "react"




const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

    }


    const handleInputData = (e) => {
        const { name, value } = e.target
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
                    <label htmlFor="password" class="block mt-5">
                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Password
                        </span>
                        <input onChange={handleInputData} value={formData.password} id="password" type="password" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password" />
                    </label>
                    <br />
                    <button id="button" type="submit" className="w-full h-9 bg-blue-500 hover:bg-sky-700 font-sans text-sm font-semibold text-white rounded-lg mt-5">SIGN IN</button>
                </form>

                <p className="mt-5 text-neutral-500 font-sans font-normal text-center" >Don't have a account? <span className="text-blue-500 font-semibold" >Sign Up</span></p>
            </div>
        </div>

    )
}


export default Signin
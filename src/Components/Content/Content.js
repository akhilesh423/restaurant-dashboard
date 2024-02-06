
import Navbar from "../Navbar/Navbar.js"
import Sidebar from "../Sidebar/Sidebar.js"
import Orders from "../Orders/Orders.js"

import "./Content.css"


export default function Content() {



    // const backgroundColor = {
    //     backgroundColor: "#3e3f3a"

    // }




    return (
        <div className="h-screen flex flex-row bg-slate-50">
            <div className="hidden md:block w-1/5 h-screen">
                <Sidebar />
            </div>
            <div className="w-full overflow-y-auto h-screen">
                <Navbar />
                <div className="">
                    <div className="grid grid-cols-4 gap-4 p-2">
                        <div className=" bg-white p-3 rounded-lg drop-shadow-lg">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-neutral-800 to-neutral-950">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-white">
                                        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
                                    </svg>
                                </div>
                                <h1 className="text-center">Total Revenue</h1>
                            </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg drop-shadow-lg">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-blue-500 to-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-white">
                                        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
                                    </svg>
                                </div>
                                <h1 className="text-center">Total Orders</h1>
                            </div>

                        </div>
                        <div className="p-3 bg-white rounded-lg drop-shadow-lg ">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-green-500 to-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-white">
                                        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
                                    </svg>
                                </div>
                                <h1 className="text-center">Today Revenue</h1>

                            </div>

                        </div>
                        <div className=" p-3 bg-white rounded-lg drop-shadow-lg">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-pink-500 to-pink-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-white">
                                        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
                                    </svg>
                                </div>
                                <h1 className="text-center">Today Orders</h1>

                            </div>

                        </div>
                    </div>
                    <h1 className="font-serif text-2xl mb-2 font-bold p-2">Orders 20</h1>
                    <div className="p-2 overflow-y-auto">

                        <Orders />
                    </div>
                </div>
            </div>

        </div>
    )

}
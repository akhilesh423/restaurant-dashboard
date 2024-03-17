import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.js";
import Orders from "../Orders/Orders.js";
import "./Content.css";
import Cookies from "js-cookie";
import { MdOutlineCurrencyExchange, MdFastfood } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsCurrencyExchange } from "react-icons/bs";



export default function Content() {

    const [ordersAnalytics, setOrdersAnalytics] = useState({
        todayRevenue: null,
        todayTotalOrders: null,
        totalRevenue: null,
        totalOrders: null
    })


    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/signin");
        } else {
            fetchAnalytics();
            const intervalId = setInterval(fetchAnalytics, 30000);
            return () => clearInterval(intervalId);
        }
    }, []);


    const fetchAnalytics = async () => {
        try {
            const token = Cookies.get("token");
            const response = await fetch('https://bling-bliss.onrender.com/admin/analytics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();

                setOrdersAnalytics({
                    todayRevenue: data.todayRevenue,
                    todayTotalOrders: data.todayTotalOrders,
                    totalRevenue: data.totalRevenue,
                    totalOrders: data.totalOrders
                });

            } else {
                console.error("Error fetching placed orders:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching placed orders:", error);
        }
    }



    return (
        <div className="h-screen flex flex-row bg-slate-50">
            <div className="w-full overflow-y-auto h-screen">
                <Navbar />
                <div className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 mt-3">
                        <div className=" bg-white p-3 rounded-lg drop-shadow-lg min-h-32">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-neutral-800 to-neutral-950">
                                    <MdOutlineCurrencyExchange className='icons' />
                                </div>
                                <h1 className="text-center title">Total Revenue</h1>
                            </div>
                            <p className="text-right revenue  text-2xl font-bold mt-4">₹{ordersAnalytics.totalRevenue}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg drop-shadow-lg">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-blue-500 to-blue-600">
                                    <BiSolidFoodMenu className='icons' />
                                </div>
                                <h1 className="text-center title">Total Orders</h1>
                            </div>
                            <p className="text-right revenue text-2xl font-bold mt-4">{ordersAnalytics.totalOrders}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg drop-shadow-lg ">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-green-500 to-green-600">
                                    <BsCurrencyExchange className='icons' />
                                </div>
                                <h1 className="text-center title">Today Revenue</h1>

                            </div>
                            <p className="text-right revenue text-2xl font-bold mt-4">₹{ordersAnalytics.todayRevenue}</p>
                        </div>
                        <div className=" p-3 bg-white rounded-lg drop-shadow-lg">
                            <div className="flex justify-between">
                                <div className="icon-cards bg-gradient-to-r from-pink-500 to-pink-600">
                                    <MdFastfood className='icons' />
                                </div>
                                <h1 className="text-center title">Today Orders</h1>
                            </div>

                            <p className="text-right revenue text-2xl font-bold mt-4">{ordersAnalytics.todayTotalOrders}</p>

                        </div>
                    </div>



                    <div className="p-2 overflow-y-auto">

                        <Orders />
                    </div>
                </div>
            </div>

        </div>
    )

}
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



import "./Order.css"

export default function Orders() {
    const [placedOrders, setPlacedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [showLoad, setShowLoad] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/signin");
        } else {
            fetchPlacedOrders();
            const intervalId = setInterval(fetchPlacedOrders, 30000);
            return () => clearInterval(intervalId);
        }
    }, [page]);


    const fetchPlacedOrders = async () => {
        setShowLoad(true)
        try {
            const token = Cookies.get("token");
            const response = await fetch(`https://bling-bliss.onrender.com/admin/placedOrders?page=${page}&limit=${perPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPlacedOrders(data.orders);
                setPage(data.currentPage)
                setShowLoad(false)


            } else {
                console.error("Error fetching placed orders:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching placed orders:", error);
        }
    };

    const handleOrderClick = (orderId) => {
        if (selectedOrder === orderId) {
            setSelectedOrder(null);
        } else {
            setSelectedOrder(orderId);
        }
    };

    const formatIndianDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        };

        const indianDateTime = new Date(dateTimeString).toLocaleString('en-IN', options);
        return indianDateTime;
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);

        }

    };



    const handleAcknowledge = async (id) => {
        const button = document.getElementById(`btn-order-${id}`);
        if (button.classList.contains('acknowledge-button-disabled')) {
            return;
        }
        try {
            const token = Cookies.get('token');
            const response = await fetch(`https://bling-bliss.onrender.com/admin/acknowledge/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {

                const orderElement = document.getElementById(`order-${id}`);

                if (orderElement) {
                    orderElement.classList.remove("new-order");
                    orderElement.classList.remove("bg-white");
                    orderElement.classList.add("bg-gray-50")
                    orderElement.classList.add("served-order");
                    button.classList.add('acknowledge-button-disabled');
                }


                console.log("Request acknowledged successfully");
            } else {
                console.error("Failed to acknowledge request");
            }
        } catch (err) {
            console.error("Error in acknowledging request:", err);
        }
    };



    return (
        <div className=" mt-5">

            {showLoad && <div className="loader"></div>}
            {placedOrders.length === 0 && (
                <h1 style={{ textAlign: 'center', margin: 'auto', color: '#333', fontSize: "30px", fontWeight: "500" }}>
                    No orders found!
                </h1>
            )}

            {placedOrders.map((order) => (
                <div key={order._id} className={`${order.isNew === false ? "bg-gray-50" : "bg-white"} w-full pb-3 mt-2`}>
                    <div id={`order-${order._id}`} className={`${order.isNew ? "new-order" : "served-order"} rounded-lg shadow p-2`}>
                        <div className="px-6 flex justify-between py-4 cursor-pointer">

                            <div>
                                <p className="placed-order-head">Order #</p>
                                <p className="placed-items-para">{order._id}</p>
                            </div>
                            <div>
                                <p className="placed-order-head">Theatre:</p>
                                <p className="placed-items-para"> {order.roomName}</p>
                            </div>
                            <div>
                                <p className="placed-order-head">Phone:</p>
                                <p className="placed-items-para"> {order.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="placed-order-head">Total Price:</p>
                                <p className="placed-items-para">₹ {order.totalPrice.toLocaleString()} Rupees</p>
                            </div>
                            <div>
                                <p className="placed-order-head">No of Items:</p>
                                <p className="placed-items-para"> {order.orders.length === 1 ? "1 item" : `${order.orders.length} items`}</p>
                            </div>
                            <div>
                                <p className="placed-order-head">Placed At:</p>
                                <p className="placed-items-para">{formatIndianDateTime(order.createdAt)}</p>
                            </div>
                            <div>
                                <button id={`btn-order-${order._id}`} onClick={() => handleAcknowledge(order._id)} className={`acknowledge-button ${!order.isNew ? 'acknowledge-button-disabled' : ''}`}>Acknowledge</button>
                            </div>

                            <div className="mt-auto mb-auto">
                                <button onClick={() => handleOrderClick(order._id)}><IoIosArrowDown /></button>
                            </div>

                        </div>
                        {selectedOrder === order._id && (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-2 px-4 placed-order-head">Item</th>
                                        <th className="py-2 px-4 placed-order-head">Category</th>
                                        <th className="py-2 px-4 placed-order-head placed-order-head-description">Description</th>
                                        <th className="py-2 px-4 placed-order-head">Price</th>
                                        <th className="py-2 px-4 placed-order-head">Quantity</th>
                                        <th className="py-2 px-4 placed-order-head">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orders.map((item) => (
                                        <tr key={item.id} className="border">
                                            <td className="py-2 px-4 placed-items-para">
                                                <span className={item.type === "veg" ? "veg-icon" : item.type === "non-veg" ? "non-veg-icon" : ""}></span>
                                                {item.name}
                                            </td>
                                            <td className="py-2 px-4 placed-items-para">{item.category}</td>
                                            <td className="py-2 px-4 placed-items-para">{item.description}</td>
                                            <td className="py-2 px-4 placed-items-para">₹ {item.price}</td>
                                            <td className="py-2 px-4 placed-items-para">{item.quantity}</td>
                                            <td className="py-2 px-4 placed-items-para">₹ {item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )}

                    </div>
                </div>
            ))}
            <div className="pagination">
                <button onClick={handlePrevPage} ><IoIosArrowBack /></button>
                <span className="page">{page}</span>
                <button onClick={handleNextPage}><IoIosArrowForward /></button>
            </div>
        </div>
    );
}

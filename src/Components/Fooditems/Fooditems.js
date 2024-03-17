import { useEffect, useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import Cookies from "js-cookie";
import './Fooditems.css';
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function Fooditems() {
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemType, setItemType] = useState("");
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemDescription, setItemDescription] = useState("");

    const [menu, setMenu] = useState([]);
    const [showLoad, setShowLoad] = useState(false);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState(menu);



    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/signin");
        }
        fetchGetData();
    }, [pageNumber]);

    const formatItemData = (item) => {
        const { createdAt, itemCategory, _id, itemDescription, itemImage, itemName, itemPrice, itemType, updatedAt } = item;
        const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
        const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

        return {
            createdAt: formattedCreatedAt,
            itemCategory,
            itemDescription,
            itemImage,
            id: _id,
            itemName,
            itemPrice,
            itemType,
            updatedAt: formattedUpdatedAt,
        };
    };


    const fetchGetData = async () => {
        try {
            setShowLoad(true); // Show loading indicator
            const token = Cookies.get("token");
            const response = await fetch(`https://bling-bliss.onrender.com/admin/getitems?page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                    setHasMore(false);
                    return;
                }
                const formattedData = data.map(formatItemData);
                setMenu([...menu, ...formattedData])


            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error(error);
            navigate("/error");
        } finally {
            setShowLoad(false); // Hide loading indicator after data is fetched
        }
    };

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleForm = (e) => {
        if (e.target.name === "itemName") {
            setItemName(e.target.value)
        }
        if (e.target.name === "itemPrice") {
            setItemPrice(e.target.value)
        }
        if (e.target.name === "itemDescription") {
            setItemDescription(e.target.value)
        }
        if (e.target.name === "itemType") {
            setItemType(e.target.value)
        }
        if (e.target.name === "itemCategory") {
            setCategory(e.target.value)
        }
        if (e.target.name === "itemImage") {
            setSelectedFile(e.target.files[0]);

        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
        formData.append('itemType', itemType);
        formData.append('itemCategory', category);
        formData.append('itemDescription', itemDescription);
        formData.append('itemImage', selectedFile);

        setItemName("");
        setItemPrice("");
        setItemType("");
        setCategory("");
        setItemDescription("");
        setSelectedFile(null);
        onCloseModal();

        try {
            const token = Cookies.get("token");
            const response = await fetch('https://bling-bliss.onrender.com/admin/additem', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                toast.success('Item added successfully');
                await fetchGetData()

            } else {
                const responseData = await response.json();
                if (response.status === 400) {
                    const errorMessage = responseData.error.map(err => err.message).join('\n');
                    toast.error('Please enter a valid input');
                } else {
                    toast.error('Failed to add item');
                }
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 15 && !showLoad && hasMore) {
            console.log("Fetching data for page:", pageNumber + 1);
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageNumber, showLoad, hasMore]);



    const handleDelete = async (id) => {
        const token = Cookies.get("token");
        const response = await fetch(`https://bling-bliss.onrender.com/admin/deleteItem/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json();

            toast.success('Item deleted successfully');

            fetchGetData().then(() => {

                window.location.reload();
            }).catch(error => {
                console.error('Failed to fetch updated data:', error);
                toast.error('Failed to fetch updated data');
            });

        } else {
            toast.error('Failed to delete item');
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchQuery(value);


    }

    useEffect(() => {
        const filteredResults = menu.filter(item =>
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchQuery]);

    useEffect(() => {
        setFilteredMenu(searchResults.length > 0 ? searchResults : menu);
    }, [searchResults, menu]);


    return (
        <>
            <Navbar />
            <div className="food-ietms-main-container">

                <div className="search-and-add">
                    <div class="search-container">
                        <input onChange={handleSearch} class="search-bar" type="search" placeholder="search by name,category" />
                    </div>

                    <div className="">
                        <button onClick={onOpenModal} className="bg-blue-500 w-36 h-9 hover:bg-blue-700 font-sans text-medium font-semibold text-white rounded-lg">ADD NEW ITEM</button>
                    </div>
                </div>
                {open ? (
                    <Modal classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                        overlayAnimationIn: 'customEnterOverlayAnimation',
                        overlayAnimationOut: 'customLeaveOverlayAnimation',
                        modalAnimationIn: 'customEnterModalAnimation',
                        modalAnimationOut: 'customLeaveModalAnimation',
                    }} open={open} onClose={onCloseModal} center>
                        <form onSubmit={handleSubmit} className="max-w-2xl p-1" encType="multipart/form-data">
                            <div className="mt-2">
                                <label className="label-industry-standard">Item name:</label>
                                <input
                                    name="itemName"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={itemName}
                                    onChange={handleForm}
                                />
                                <p className="modal-error-msg"></p>
                            </div>
                            <div className="mt-2">
                                <label className="label-industry-standard">Item price:</label>
                                <input
                                    name="itemPrice"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={itemPrice}
                                    onChange={handleForm}
                                />

                            </div>
                            <div className="mt-2">
                                <label className="label-industry-standard">Item Type:</label>
                                <select
                                    name="itemType"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={itemType}
                                    onChange={handleForm}
                                >
                                    <option value="">Select category...</option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-veg</option>
                                </select>

                            </div>
                            <div className="mt-2">
                                <label className="label-industry-standard">Choose category:</label>
                                <select
                                    name="itemCategory"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={category}
                                    onChange={handleForm}
                                >
                                    <option value="">Select category...</option>
                                    <option value="Starters">Starters</option>
                                    <option value="Pizzas">Pizzas</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Burgers and Sandwiches">Burgers and Sandwiches</option>
                                    <option value="Mojitos">Mojitos</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Do-Nuts">Do-Nuts</option>
                                    <option value="Waffles">Waffles</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Add ons">Add ons</option>
                                    <option value="Milkshakes">Milkshakes</option>
                                    <option value="Thickshakes">Thickshakes</option>
                                </select>

                            </div>
                            <div className="mt-2">
                                <label className="label-industry-standard">Item image:</label>
                                <input
                                    name="itemImage"
                                    onChange={handleForm}
                                    type="file"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                />

                            </div>
                            <div className="mt-2">
                                <label className="label-industry-standard">Description:</label>
                                <textarea
                                    name="itemDescription"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={itemDescription}
                                    onChange={handleForm}
                                />

                            </div>
                            <button className="border modal-btn border-slate-500 w-1/2 h-8 mt-2 rounded" type="submit">SUBMIT</button>
                        </form>
                    </Modal>

                ) : null}

                {showLoad && <div className="loader"></div>}
                <div className="menu-wrapper">
                    <div className="menu-container">
                        {filteredMenu.map((eachItem) => (
                            <div className="menu-item" key={eachItem._id}>
                                <img src={eachItem.itemImage} alt={eachItem.itemName} className="menu-item-image" />
                                <div className="menu-details-container">

                                    <h3 className="menu-item-name">{eachItem.itemName}</h3>
                                    <p className="menu-item-description">{eachItem.itemDescription}</p>
                                    <p className="menu-item-price">Price: &#x20B9;{eachItem.itemPrice}</p>

                                    <div className="menu-item-buttons">
                                        <button className="menu-item-button"><FaPencil /></button>
                                        <button onClick={() => handleDelete(eachItem.id)} className="menu-item-button delete-button">
                                            <RiDeleteBinLine />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showLoad && <div className="loader"></div>}
            </div>

        </ >
    );
}





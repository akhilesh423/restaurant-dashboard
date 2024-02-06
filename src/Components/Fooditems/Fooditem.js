


export default function Fooditems() {

    const orderItems = [
        {
            category: "Starters",
            items: [{
                itemName: "French Fries",
                price: 169
            }, {
                itemName: "Potato wedges",
                price: 169
            }, {
                itemName: "Jalapeno Pops",
                price: 169
            }]
        },
        {
            category: "Italian Delights",
            items: [{
                itemName: "Pasta",
                price: 199
            }, {
                itemName: "Lasagna",
                price: 199
            }, {
                itemName: "Pizza",
                price: 219
            }]
        }
        ,
        {
            category: "Chinese Cuisine",
            items: [{
                itemName: "Veg Manchurian",
                price: 149
            }, {
                itemName: "Paneer 65",
                price: 179
            }, {
                itemName: "Crispy Corn",
                price: 199
            }]
        },
        {
            category: "Momos",
            items: [{
                itemName: "Veg momos",
                price: 169
            }, {
                itemName: "Chicken momos",
                price: 169
            }, {
                itemName: "Paneer momos",
                price: 169
            }]
        }
    ]


    const items = [{
        itemName: "Veg momos",
        image: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
        price: 169,
        rating: 4.5,
    }, {
        itemName: "Veg momos",
        image: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
        price: 169,
        rating: 4.5
    }, {
        itemName: "Veg momos",
        image: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
        price: 169,
        rating: 4.5
    }, {
        itemName: "Veg momos",
        image: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
        price: 169,
        rating: 4.5
    }, {
        itemName: "Veg momos",
        image: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
        price: 169,
        rating: 4.5
    }]

    return (
        <div className="min-h-lvh bg-slate-50 p-2" >
            <h1 className="text-2xl font-semibold font-sans mb-1 mt-5">All Fooditems</h1>
            <div className="border-slate-300 border rounded-lg p-3 flex flex-col">
                <div className="self-end mb-5">
                    <button className="bg-blue-500 w-36 h-9 hover:bg-blue-700 font-sans text-sm font-semibold text-white rounded-lg">ADD NEW ITEM</button>
                </div>
                <div className="flex items-center p-2 h-12 min-w-72 w-1/2 border-slate-300 border self-center mb-5 rounded-lg">
                    <input placeholder="Search with name" className="bg-transparent h-full placeholder-slate-400 focus:outline-none w-full font-sans font-normal lg:text-base sm:text-sm" type="search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </div>
                <ul className="flex align-center flex-wrap">
                    {items.map((eachItem, index) => (
                        <li className="bg-white min-w-40 drop-shadow-lg flex flex-col mr-3 mb-3 p-2  rounded-lg" key={index}>
                            <div >
                                <img className="h-28 w-full rounded-lg" src={eachItem.image} />
                            </div>

                            <div>


                                <div>
                                    <h1>name:{eachItem.itemName}</h1>
                                    <h2>Rating:{eachItem.rating}</h2>
                                    <p>₹:{eachItem.price}</p>
                                </div>

                                <div className="">
                                    <button >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                        </svg>
                                    </button>

                                </div>

                            </div>

                        </li>

                    ))}
                </ul>

            </div>

        </div>
    )
}
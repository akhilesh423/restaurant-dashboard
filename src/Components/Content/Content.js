
import Navbar from "../Navbar/Navbar.js"
import Sidebar from "../Sidebar/Sidebar.js"


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
                    <div className="grid grid-cols-3 gap-4 p-2">
                        <div className="h-44  bg-white rounded-lg drop-shadow-lg">
                            <h1 className="text-center">Total Revenue</h1>
                        </div>
                        <div className="h-44 bg-white rounded-lg drop-shadow-lg">
                            <h1 className="text-center">Total Orders</h1>
                        </div>
                        <div className="h-44 bg-white rounded-lg drop-shadow-lg">
                            <h1 className="text-center">Today Revenue</h1>
                        </div>
                    </div>
                    <h1 className="font-serif text-2xl mb-2 font-bold p-2">Orders 20</h1>
                    <div className="p-2 overflow-y-auto">
                        <div className="flex flex-row justify-between bg-white rounded-lg drop-shadow-md p-4 mb-2">
                            <h1>Order id</h1>
                            <h1>room No</h1>
                            <h1>Items Count</h1>
                            <h1>price</h1>
                            <h1>Time</h1>
                            <button className="border bg-blue-500 text-white w-20 h-8 rounded-md">Done</button>
                        </div>
                        <div className="flex flex-row justify-between bg-neutral-200 rounded-lg drop-shadow-md p-4 mb-2">
                            <h1>Order id</h1>
                            <h1>room No</h1>
                            <h1>Items Count</h1>
                            <h1>price</h1>
                            <h1>Time</h1>
                            <button className="border bg-blue-500 text-white w-20 h-8 rounded-md">Done</button>
                        </div>
                        <div className="flex flex-row justify-between bg-neutral-200 rounded-lg drop-shadow-md p-4 mb-2">
                            <h1>Order id</h1>
                            <h1>room No</h1>
                            <h1>Items Count</h1>
                            <h1>price</h1>
                            <h1>Time</h1>
                            <button className="border bg-blue-500 text-white w-20 h-8 rounded-md">Done</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
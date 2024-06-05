import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './Navbar.css';
import Popup from '../Modals/Popup';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        Cookies.remove("token");
        navigate("/signin");
    };

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    return (
        <nav>
            <div className="navbar">
                <h1 className="logo-name">Akhil's Kitchen</h1>

                <ul className="flex">
                    <Link to="/">
                        <li className="flex items-center p-3 h-18">
                            <h1 className="text-white  text-md ml-2 mt-1 font-medium">Dashboard</h1>
                        </li>
                    </Link>
                    <Link to="/items">
                        <li className="flex items-center p-3 h-18 ">


                            <h1 className="text-white text-md ml-2 mt-1 font-medium">Food Items</h1>
                        </li>
                    </Link>
                    <li className="flex items-center p-3 h-18 ">
                        <h1 className="text-white text-md ml-2 mt-1 font-medium">Analytics</h1>
                    </li>
                    <li className="flex items-center p-3 h-18 " onClick={onOpenModal}>
                        <h1 id='signout' className="text-white text-md ml-2 mt-1 font-medium">Sign Out</h1>
                    </li>

                    {/* <Modal classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                        overlayAnimationIn: 'customEnterOverlayAnimation',
                        overlayAnimationOut: 'customLeaveOverlayAnimation',
                        modalAnimationIn: 'customEnterModalAnimation',
                        modalAnimationOut: 'customLeaveModalAnimation',
                    }} open={open} onClose={onCloseModal} center>
                        <div className="modal-content">
                            <h1 className="confirmation-message">Are you sure you want to sign out?</h1>

                            <div className="button-container">
                                <button onClick={handleSignOut} className="confirm-button">Confirm</button>
                                <button onClick={onCloseModal} className="cancel-button">Cancel</button>
                            </div>
                        </div>
                    </Modal> */}

                    <Popup
                        title={"Are you sure you want to sign out?"}
                        open={open}
                        handleSignOut={handleSignOut} // Pass the handleSignOut function
                        onCloseModal={onCloseModal} // Pass the onCloseModal function
                    />
                </ul>
            </div>

        </nav>
    );
}

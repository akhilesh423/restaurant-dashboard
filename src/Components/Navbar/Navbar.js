import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './Navbar.css';

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
                <h1 className="logo-name">Bling and Bliss</h1>
                <div class="search-container">
                    <input class="search-bar" type="search" />
                    <button class="search-separator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="search-icon">
                            <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <ul className="flex">
                    <Link to="/">
                        <li className="flex items-center p-3 h-18">
                            <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Dashboard</h1>
                        </li>
                    </Link>
                    <Link to="/items">
                        <li className="flex items-center p-3 h-18 ">


                            <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Food Items</h1>
                        </li>
                    </Link>
                    <li className="flex items-center p-3 h-18 ">
                        <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Analytics</h1>
                    </li>
                    <li className="flex items-center p-3 h-18 " onClick={onOpenModal}>
                        <h1 id='signout' className="text-white font-serif text-md ml-2 font-medium">Sign Out</h1>
                    </li>

                    <Modal classNames={{
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
                    </Modal>

                </ul>
            </div>

        </nav>
    );
}

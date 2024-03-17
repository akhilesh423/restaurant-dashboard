
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function Popup(props) {
    const { title, open, handleSignOut, onCloseModal } = props;

    return (
        <Modal
            classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
                overlayAnimationIn: 'customEnterOverlayAnimation',
                overlayAnimationOut: 'customLeaveOverlayAnimation',
                modalAnimationIn: 'customEnterModalAnimation',
                modalAnimationOut: 'customLeaveModalAnimation',
            }}
            open={open}
            onClose={onCloseModal}
            center
        >
            <div className="modal-content">
                <h1 className="confirmation-message">{title}</h1>

                <div className="button-container">
                    <button onClick={handleSignOut} className="confirm-button">Confirm</button>
                    <button onClick={onCloseModal} className="cancel-button">Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

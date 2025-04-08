import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useHandleLogout } from "../utils/logout.js"; // Import the logout function
import "../css/DeleteButton.css";

const DeleteButton = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const handleLogout = useHandleLogout(); // Get the logout function

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/deleteUser/${id}`, {
                withCredentials: true,
            });

            alert("Account deleted successfully!");
            await handleLogout(); // Logout the user after deletion
            navigate("/")
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    };

    return (
        <div className="delete-container">
            <div className="delete-content">
                <h1>Delete Your Account</h1>
                <h2>Warning: This action is irreversible!</h2>
                <button className="delete-btn" onClick={() => setShowConfirm(true)}>
                    Delete Account
                </button>
            </div>

            {showConfirm && (
                <div className="confirm-popup">
                    <div className="popup-content">
                        <h2>Are you sure?</h2>
                        <p>Your account and all associated data will be permanently deleted.</p>
                        <div className="popup-actions">
                            <button className="confirm-btn" onClick={handleDelete}>
                                Yes, Delete
                            </button>
                            <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteButton;

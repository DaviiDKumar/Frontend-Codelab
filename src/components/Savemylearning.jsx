import { useDispatch, useSelector } from "react-redux";
import { savemyLearn } from "../redux/myLearningSlice";
import { useState } from "react";
import "../css/Savemylearning.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveMyLearningButton = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);
  const myLearningItems = useSelector((state) => state.myLearning.myLearning);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSaveMyLearning = async () => {
    if (!userId || !myLearningItems.length) {
      console.error("❌ User ID or My Learning Items are missing!");
      return;
    }

    setLoading(true);
    console.log("📡 Saving My Learning Items:", myLearningItems);

    try {
      await dispatch(savemyLearn({ userId, myLearningItems }));
      console.log("✅ My Learning Items Saved Successfully");

      // Show success toast
      toast.success("✅ Courses saved successfully!", { position: "top-center" });

      // Show popup for navigation options
      setShowPopup(true);
    } catch (error) {
      console.error("❌ Error Saving My Learning Items:", error);
      toast.error("❌ Error saving courses!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="save-my-learning-container">
      <div className="save-my-learning-box">
        {/* Arrow animation pointing to the button */}
        <div className="save-arrow">⬇ Click Below to Save! ⬇</div>

        <h2 className="save-warning">
          ⚠ <span className="highlight">Important:</span> Save Your Courses!
        </h2>
        <p className="save-message">
          Your payment is successful, but your purchased courses are <span className="highlight">not unlocked yet.</span>  
          To unlock them, click the <strong className="save-highlight">&quot;Save My Learning&quot;</strong>
        </p>

        <p className="save-note">
          If you leave without saving, you <span className="highlight">will not have access</span> to your courses.
        </p>

        <button
          onClick={handleSaveMyLearning}
          disabled={loading}
          className="save-my-learning-btn"
        >
          {loading ? "Saving..." : "Save My Learning"}
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Courses Saved Successfully!</h3>
            <p>Your courses are now unlocked. Where do you want to go next?</p>
            <div className="popup-buttons">
              <button onClick={() => navigate("/my-learning")} className="popup-btn">
                Go to My Learning
              </button>
              <button onClick={() => setShowPopup(false)} className="popup-btn cancel">
                Stay Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveMyLearningButton;

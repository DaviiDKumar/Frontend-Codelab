import PropTypes from "prop-types";
import "./CourseCard1.css";

const Card1 = ({ course, onAddToCart }) => {
  return (
    <div className="course-card-unq-wrapper">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="course-card-unq-image"
      />
      <div className="course-card-unq-content">
        <h3>{course.title}</h3>
        <p className="course-card-unq-desc">{course.description}</p>
        <p className="course-card-unq-price">₹{course.price}</p>
        <button className="course-card-unq-footer-button" onClick={() => onAddToCart(course)}>🛒 Add to Cart</button>
      </div>
    </div>
  );
};

Card1.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Card1;

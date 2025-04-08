import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../CSS/Home.css';

const Hero = () => {


  return (
    <div className="home-container">
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={10000}>
        {/* Slide 1: Welcome Slide with Username */}
        <div className="carousel-slide hero-slide">
          <div className='hero-slide-content'>
            <h1 className="hero-title">

              Give Your career a Boost

            </h1>

            <button className="cta-button">Explore Courses</button>
          </div>
        </div>

        {/* Slide 2: Background Image - Web Development */}
        <div className="carousel-slide web-dev-slide">
          <div className="hero-content">
            <h1 className="hero-title">Web Development Bootcamp</h1>
            <p className="hero-subtitle">Build responsive websites and web apps.</p>
            <button className="cta-button">Join Now</button>
          </div>
        </div>

        {/* Slide 3: Background Image - Data Science */}
        <div className="carousel-slide data-science-slide">
          <div className="hero-content">
            <h1 className="hero-title">Data Science Mastery</h1>
            <p className="hero-subtitle">Analyze data and uncover hidden insights.</p>
            <button className="cta-button">Join Now</button>
          </div>
        </div>



      </Carousel>
    </div>
  );
};

export default Hero;

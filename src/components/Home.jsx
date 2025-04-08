
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../CSS/Home.css';
import Hero from './Hero';
// 
import Courses from './Courses';
import Strip from './Strip';
import Welcome from './Welcome';
import Search from './Search';


const Home = () => {



  return (

    <>
      <Search />
      <Strip />
      <Welcome />
      <Hero />
      <Courses />

    </>
  );
};

export default Home;

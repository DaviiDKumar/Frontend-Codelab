
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Home.css';
import Hero from './Hero';
// 
import Courses from './Courses';
import Strip from './Strip';
import Welcome from './Welcome';
import Search from './Search';
import Herosec2 from './Herosec2';
import LearningGoals from './Learninggoals';


const Home = () => {



  return (

    <>
      <Search />
      <Strip />
      <Welcome />
      <Hero />
      <Courses />
      <LearningGoals />
      <Herosec2 />

    </>
  );
};

export default Home;

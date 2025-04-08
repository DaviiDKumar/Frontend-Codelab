import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Popular Certifications</h3>
          <ul>
            <li><a href="/">AWS Certification</a></li>
            <li><a href="/">Microsoft Certification</a></li>
            <li><a href="/">Google Cloud Certification</a></li>
            <li><a href="/">Cisco Certification</a></li>
            <li><a href="/">See all</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Web Development</h3>
          <ul>
            <li><a href="/">JavaScript</a></li>
            <li><a href="/">React</a></li>
            <li><a href="/">Angular</a></li>
            <li><a href="/">Vue.js</a></li>
            <li><a href="/">More...</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Data Science</h3>
          <ul>
            <li><a href="/">Python</a></li>
            <li><a href="/">Machine Learning</a></li>
            <li><a href="/">Deep Learning</a></li>
            <li><a href="/">AI & ChatGPT</a></li>
            <li><a href="/">More...</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Business Tools</h3>
          <ul>
            <li><a href="/">Excel</a></li>
            <li><a href="/">SQL</a></li>
            <li><a href="/">Power BI</a></li>
            <li><a href="/">Tableau</a></li>
            <li><a href="/">More...</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Code Lab | <a href="/">Privacy Policy</a> | <a href="/">Terms & Conditions</a></p>
      </div>
    </footer>
  );
};

export default Footer;

import "../css/Herosec2.css"; // Import your CSS file for styling

const Herosec2 = () => {
    return (
        <div className="herosec2-container">
            <div className="herosec2-left">
                <div className="herosec2-text-box">
                    <h2>Top trends for the future of work</h2>
                    <p>
                        Our 2025 Global Learning & Skills Trends Report is out now! Find out how to build the skills to keep pace with change</p>

                        <button className="herosec2-button">Get the report</button>
                </div>

            </div>

            <div className="herosec2-right">
                <img
                    src="/asdf.webp" // Replace with your image URL
                    alt="Sample"
                    className="herosec2-image"
                />
            </div>
        </div>
    );
};

export default Herosec2;

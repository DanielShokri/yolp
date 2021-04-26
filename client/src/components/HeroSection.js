import "../styles/HeroSection.css";

const HeroSection = ({ children }) => {
  return (
    <div className="hero">
      <div className="overlay"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default HeroSection;

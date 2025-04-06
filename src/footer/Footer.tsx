import './Footer.css'

const Footer = () => {
  return (
    <footer className="magical-footer">
      <div className="footer-content">
        <h2>Fun Buddy</h2>
        <p>Making learning fun for everyone!</p>
        <div className="footer-links">
          <a href="#about-us" className="footer-link">About Us</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="#facebook" className="footer-social-link">Facebook</a>
          <a href="#twitter" className="footer-social-link">Twitter</a>
          <a href="#instagram" className="footer-social-link">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
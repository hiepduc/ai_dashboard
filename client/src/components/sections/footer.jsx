const Footer = () => {
  return (
    <footer className="global__footer">
      <div className="section__content">
        <div className="global__footer__navigation">
          <nav className="nav" role="navigation" aria-label="Footer">
            <ul>
              <li>News & Resources</li>
              <li>Need Help?</li>
              <li>Contact Us</li>
            </ul>
          </nav>
        </div>
        <hr />
        <div className="global__footer__meta">
          <span>© 2023 NSW DPE</span>
          <nav
            className="nav nav--inline"
            role="navigation"
            aria-label="Footer Meta"
          >
            <ul>
              <li>Accessibility</li>
              <li>Privacy</li>
              <li>Copyright & Disclaimer</li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

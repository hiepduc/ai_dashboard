import nswLogo from "../../assets/images/nsw-logo.svg";
const Header = () => {
  return (
    <header className="nsw-header">
      <div className="nsw-header__container">
        <div className="nsw-header__wrapper">
          <div className="nsw-header__center">
            <a
              href="https://www.dpie.nsw.gov.au"
              className="nsw-header__logo-link"
            >
              <svg
                className="nsw-icon nsw-header__logo"
                focusable="false"
                aria-hidden="true"
                width="300"
                height="320"
                viewBox="0 0 300 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image href={nswLogo} width="280" height="300" />
              </svg>
              <span className="nsw-header__logo-text">
                Planning and
                <br />
                Environment
              </span>
            </a>
          </div>
        </div>
        <div className="banner">
          <h1>Air Quality Forecast Dashboard</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// Import specific icons
import { faPhotoVideo, faHouse } from "@fortawesome/free-solid-svg-icons";

// Add icons to library
library.add(faPhotoVideo, faHouse);

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm nav-css">
      <div className="container-fluid">

        <Link className="navbar-brand text-white" to="/">
          <b>PERSONAL-BLOG</b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse justify-content-center" id="mynavbar">
          <ul className="navbar-nav">

            <li className="nav-item nav-line">
              <Link className="nav-link text-light" to="/home">
                Home <FontAwesomeIcon className="ms-1" icon={faHouse} />
              </Link>
            </li>

            <li className="nav-item nav-line-2">
              <Link className="nav-link text-light" to="/Upload">
                Upload <FontAwesomeIcon className="ms-1" icon={faPhotoVideo} />
              </Link>
            </li>
             <li className="nav-item nav-line-2">
              <Link className="nav-link text-light" to="/AddBlogPage">
                blogs <FontAwesomeIcon className="ms-1" icon={faPhotoVideo} />
              </Link>
            </li>

            <li className="nav-item nav-line-3">
              <Link className="nav-link text-light" to="/profile">
                Profile
              </Link>
            </li>

          </ul>
        </div>

        {/* Login Button */}
        <div className="d-flex">
          <Link to="/login">
            <button className="btn text-light login-btn" type="button">
              LOG IN
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

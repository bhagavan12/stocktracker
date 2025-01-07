import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/userSlice";

export default function TemplateDemo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

  return (
    <nav
            className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${
                isVisible ? "d-block" : "d-none"
            }`}
            style={{
                width: "max-content",
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
                margin: "auto",
                borderRadius: "5px",
                marginTop: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
        >
      <div className="container" >
        <span className="icon-park--stock-market"></span>
        <a className="navbar-brand text-primary" href="/home">
          Stock Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex justify-content-center align-items-center">
              <span className="tabler--home-search"></span>
              <a
                className="nav-link text-primary"
                href="/home"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center">
              <span className="marketeq--money-alt-1"></span>
              <a
                className="nav-link text-primary text-decoration-none"
                href="/portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/portfolio");
                }}

              >
                My Portfolio
              </a>
            </li>

            {/* <li className="nav-item d-flex justify-content-center align-items-center">
              <span className="marketeq--money-alt-1"></span>
              <a
                className="nav-link text-primary text-decoration-none"
                href="/profile"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/profile");
                }}
              >

                Profile
              </a>
            </li> */}
            <li className="nav-item d-flex justify-content-center align-items-center">
              <span className="solar--logout-bold-duotone"></span>
              <a
                className="nav-link text-primary text-decoration-none"
                href="#logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

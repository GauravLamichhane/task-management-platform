import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Taskify
          </Link>

          {/* Desktop links */}
          {isAuthenticated && (
            <>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className={`hover:text-blue-600 transition ${isActive(
                    "/dashboard"
                  )}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className={`hover:text-blue-600 transition ${isActive(
                    "/analytics"
                  )}`}
                >
                  Analytics
                </Link>
                <Link
                  to="/activity"
                  className={`hover:text-blue-600 transition ${isActive(
                    "/activity"
                  )}`}
                >
                  Activity
                </Link>

                <div className="flex items-center space-x-4 border-l pl-6">
                  <span className="text-sm text-gray-600">
                    Hello,{" "}
                    <span className="font-semibold">
                      {user?.first_name || user?.username || user?.email}
                    </span>
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle menu"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {open ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Mobile dropdown */}
              {open && (
                <div className="md:hidden absolute left-0 right-0 bg-white shadow-md mt-16">
                  <div className="px-4 py-4 space-y-3">
                    <Link
                      to="/dashboard"
                      className={`block ${isActive("/dashboard")}`}
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/analytics"
                      className={`block ${isActive("/analytics")}`}
                      onClick={() => setOpen(false)}
                    >
                      Analytics
                    </Link>
                    <Link
                      to="/activity"
                      className={`block ${isActive("/activity")}`}
                      onClick={() => setOpen(false)}
                    >
                      Activity
                    </Link>
                    <div className="border-t pt-3">
                      <div className="text-sm text-gray-600 mb-2">
                        Hello,{" "}
                        <span className="font-semibold">
                          {user?.first_name || user?.username || user?.email}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

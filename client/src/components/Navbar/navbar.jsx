import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="flex items-center bg-orange-500 justify-between p-5 rounded-tr-2xl rounded-tl-2xl">
        <Link
          className="font-['Montserrat'] font-semibold text-orange-700 hover:text-orange-800 transition-all text-xl"
          to="/"
        >
          Notes
        </Link>
        <Link
          className="font-['Montserrat'] font-semibold text-orange-700 hover:text-orange-800 transition-all text-base"
          to="/about"
        >
          About
        </Link>
      </header>
    </>
  );
}

export default Navbar;

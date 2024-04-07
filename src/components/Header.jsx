import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleWriteButtonClick = () => {
    navigate("/write");
  };
  return (
    <div
      className={`fixed t-0 l-0 w-full h-16 flex justify-center items-center backdrop-blur z-10 ${
        location.pathname === "/" ? "" : "shadow-xl"
      }`}
    >
      <div className="flex justify-between w-full max-w-screen-lg min-w-[360px] px-3">
        <h1
          onClick={handleLogoClick}
          className="text-2xl text-black font-merriweather tracking-tight hover:cursor-pointer"
        >
          Yummy Diary
        </h1>
        <button
          onClick={handleWriteButtonClick}
          className="text-sm w-[70px] rounded-sm text-black border border-black"
        >
          Record
        </button>
      </div>
    </div>
  );
};

export default Header;

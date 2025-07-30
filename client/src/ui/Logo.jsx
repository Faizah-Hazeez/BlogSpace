import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/">
      <h1 className="text-2xl font-default-family">
        Blog<span className="text-blue-300 font-serif italic">Space</span>
      </h1>
    </Link>
  );
}

export default Logo;

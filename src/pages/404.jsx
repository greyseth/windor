import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="font-bold">
          The URL at {location.pathname} was not found. Make sure the path is
          correct
        </p>
        <button className="btn primary" onClick={() => navigate("/app")}>
          Back to Home
        </button>
      </div>
    </>
  );
}

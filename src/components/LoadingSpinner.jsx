import "../assets/css/loading_spinner.css";

export default function LoadingSpinner({
  size,
  thickness,
  spinColor,
  backColor,
}) {
  // Optional parameters
  const _size = size ?? "w-[5em]";
  const _thickness = thickness ?? "border-[10px]";
  const _spinColor = spinColor ?? "border-b-(--primary-color)";
  const _backColor = backColor ?? "border-(--secondary-color)";

  return (
    <div className="loading-spinner-container">
      <div
        className={`loading-spinner ${_size} ${_thickness} ${_spinColor} ${_backColor}`}
        style={
          {
            // width: _size,
            // border: `${_thickness} solid`,
          }
        }
      ></div>
    </div>
  );
}

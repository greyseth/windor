import "../assets/css/extrapage.css";

export default function ExtraPageContainer({ zIndex, children }) {
  return (
    <div className={`extrapage-container`} style={{ zIndex: zIndex ?? 30 }}>
      <div className="w-full h-full overflow-y-scroll">{children}</div>
    </div>
  );
}

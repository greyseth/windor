export default function LoadingError({ message, onRetry, btnMessage }) {
  return (
    <div className="w-full">
      <p className="font-bold mb-3 w-full text-center">
        {message ?? "An Error Has Occurred"}
      </p>
      <button className="btn primary block mx-auto text-xs" onClick={onRetry}>
        {btnMessage ?? "Try Again"}
      </button>
    </div>
  );
}

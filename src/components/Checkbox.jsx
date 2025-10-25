export default function Checkbox({ label, isChecked, onChange, customStyle }) {
  return (
    <div
      className={`checkbox bg-gray-400/45 ${customStyle}`}
      onClick={() => onChange(!isChecked)}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.isChecked)}
      />
      <p>{label}</p>
    </div>
  );
}

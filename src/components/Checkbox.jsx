export default function Checkbox({ label, isChecked, onChange }) {
  return (
    <div className="checkbox" onClick={() => onChange(!isChecked)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.isChecked)}
      />
      <p>{label}</p>
    </div>
  );
}

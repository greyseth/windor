export default function TextInput({
  type,
  value,
  placeholder,
  onChange,
  img,
  customStyle,
}) {
  return (
    <div className={`textinput ${customStyle}`}>
      {img ? <img src={img} /> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

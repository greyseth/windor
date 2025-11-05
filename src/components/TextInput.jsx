export default function TextInput({
  type,
  value,
  placeholder,
  onChange,
  onEnter,
  img,
  customStyle,
}) {
  return (
    <div className={`textinput text-white bg-gray-400/45 ${customStyle}`}>
      {img ? <img src={img} /> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
      />
    </div>
  );
}

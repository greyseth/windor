export default function TextInput({
  type,
  value,
  placeholder,
  onChange,
  onEnter,
  img,
  customStyle,
  readonly,
}) {
  return (
    <div className={`textinput text-black bg-gray-400/45 ${customStyle}`}>
      {img ? <img src={img} /> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        onInput={(e) => {
          if (e.inputType === "insertLineBreak") onEnter();
        }}
      />
    </div>
  );
}

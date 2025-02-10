export default function FormInput({
  name,
  type,
  placeholder,
  mainName,
  defaultValue,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{mainName}</span>
      </div>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="input input-bordered w-full"
      />
    </label>
  );
}

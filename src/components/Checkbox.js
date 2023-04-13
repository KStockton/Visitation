import "./Checkbox.css";

const Checkbox = ({ checked, onChange, label, name, isDisabled }) => (
  <>
    <input
      type="checkbox"
      id={`${isDisabled ? "disable" : "enable"}-checkbox`}
      checked={checked}
      onChange={onChange}
      name={name}
    />
    <label htmlFor={`${label}-checkbox`}>{label}</label>
  </>
);

export default Checkbox;

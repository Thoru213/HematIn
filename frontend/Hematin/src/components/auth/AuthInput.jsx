const AuthInput = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="form-control mb-3"
    />
  );
};

export default AuthInput;
const SearchBox = ({
  placeholder,
  mobile = false,
  value,
  onChange,
}) => {
  return (

    <div
      className={
        mobile
          ? "mobile-search-box"
          : "search-box"
      }
    >

      <span
        className={
          mobile
            ? "mobile-search-icon"
            : "search-icon"
        }
      >
        🔍
      </span>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>

  );
};

export default SearchBox;
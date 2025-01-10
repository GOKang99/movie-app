import React from "react";

function SearchBox(props) {
  function handleChange(e) {
    props.setSearchValue(e.target.value);
  }
  return (
    <div className="col col-sm-4">
      <input
        value={props.searchValue}
        onChange={handleChange}
        className="form-control"
        placeholder="영화 검색..."
      ></input>
    </div>
  );
}

export default SearchBox;

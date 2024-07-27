import React from "react";
import Select from "react-select";
import "./SearchableDropDown.css";

const SearchableDropDown = ({ handler, options, index }) => {
  return (
    <Select
      onChange={(item) => {
        handler(item?.value, index);
      }}
      options={options}
      noOptionsMessage={() => "No Travelers"}
    />
  );
};

export default SearchableDropDown;

import React from "react";
import { Select } from "antd";
import Search from "antd/es/input/Search";
import "./style.css";
const Header = ({ setSearch, setMonth}) => {
  function onSearch(value) {
    setSearch(value);
  }
  function onChange(value){
    setMonth(value);
  }
  return (
    <div className="header">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 400,
        }}
      />

      <Select
        defaultValue="1"
        style={{
          width: 200,
        }}
        popupMatchSelectWidth={true}
        placement="bottomRight"
        onChange={onChange}
        options={[
          {
            value: "1",
            label: "January",
          },
          {
            value: "2",
            label: "February",
          },
          {
            value: "3",
            label: "March",
          },
          {
            value: "4",
            label: "April",
          },
          {
            value: "5",
            label: "May",
          },
          {
            value: "6",
            label: "June",
          },
          {
            value: "7",
            label: "July",
          },
          {
            value: "8",
            label: "August",
          },
          {
            value: "9",
            label: "September",
          },
          {
            value: "10",
            label: "October",
          },
          {
            value: "11",
            label: "November",
          },
          {
            value: "12",
            label: "December",
          },
        ]}
      />
    </div>
  );
};

export default Header;

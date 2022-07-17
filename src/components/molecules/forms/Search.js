import React from "react";

import { Cascader, Col, Row } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { categories } from "@/fakeAPI";

const options = categories.map((category) => ({
  value: category.slug,
  label: category.name,
  children: [],
}));

const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};

const filter = (inputValue, path) =>
  path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

const Search = () => {
  return (
    <Row gutter={16}>
      <Col>
        <span
          style={{ color: "#000000", fontSize: "20px", fontWeight: "bold" }}
        >
          BUSCAR
        </span>
      </Col>
      <Col>
        <Cascader
          options={options}
          onChange={onChange}
          suffixIcon={<SearchOutlined style={{ color: "#C0C0C0" }} />}
          placeholder="Búsqueda por categorías"
          showSearch={{
            filter,
          }}
          onSearch={(value) => console.log(value)}
          style={{ width: "550px" }}
        />
      </Col>
    </Row>
  );
};

export default Search;

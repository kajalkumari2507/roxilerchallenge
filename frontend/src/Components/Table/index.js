import React from "react";
import { Avatar, Table, Tooltip } from "antd";
const MyTable = ({ data }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (desc) => (
        <Tooltip placement="topLeft" title={desc}>
          {desc}
        </Tooltip>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      render: (sold) => (sold ? "True" : "False"),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <Avatar shape="square" size="large" src={image} />,
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default MyTable;

import React from "react";
import { Tag } from "antd";

export default function TagRoles({ roles }) {
  const role = roles[0];
  return (
    <Tag
      color={
        role === "ROLE_ADMIN"
          ? "red"
          : role === "ROLE_TECH"
            ? "orange"
            : "geekblue"
      }
      key={role}
    >
      {role}
    </Tag>
  );
}

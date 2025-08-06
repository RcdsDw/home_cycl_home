import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { getUsers } from "../actions/user";
import { parseID } from "./ParseID";

const { Option } = Select;

export default function SelectUser({
  selectedUser,
  setSelectedUser,
  onShowUser,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.member);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const handleUserChange = (value) => {
    const newTechSelected = users.find((target) => parseID(target) === value);
    setSelectedUser(newTechSelected);
  };

  return (
    <>
      {!onShowUser ? (
        <Select
          value={parseID(selectedUser)}
          onChange={handleUserChange}
          allowClear
          style={{ width: "100%", margin: "5px" }}
          placeholder="Sélectionnez un utilisateur"
        >
          {users &&
            users.map((user) => (
              <Option key={parseID(user)} value={parseID(user)}>
                {user.firstname} {user.lastname}
              </Option>
            ))}
        </Select>
      ) : (
        <Input
          disabled
          value={
            selectedUser
              ? `${selectedUser?.firstname} ${selectedUser?.lastname}`
              : "En chargement..."
          }
        />
      )}
    </>
  );
}

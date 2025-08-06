import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getUsersBikes } from "../actions/user";
import { parseID } from "./ParseID";

const { Option } = Select;

export default function SelectBikes({
  selectedBike,
  setSelectedBike,
  clientId,
}) {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    if (clientId) {
      fetchBikes();
    }
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await getUsersBikes(clientId);
      setBikes(res.bikes);
    } catch (error) {
      console.error("Erreur lors de la récupération des techniciens", error);
    }
  };

  const handleBikesChange = (value) => {
    const newBikeSelected = bikes.find((target) => parseID(target) === value);
    setSelectedBike(newBikeSelected);
  };

  return (
    <Select
      value={parseID(selectedBike)}
      onChange={handleBikesChange}
      allowClear
      style={{ width: "100%", margin: "5px" }}
      placeholder="Sélectionnez un de vos vélos"
    >
      <Option disabled value={null}>
        Sélectionnez un de vos vélos
      </Option>

      {bikes &&
        bikes.map((bike) => (
          <Option key={parseID(bike)} value={parseID(bike)}>
            {bike.name} {bike.type}
          </Option>
        ))}
    </Select>
  );
}

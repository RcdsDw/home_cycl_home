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
  const [loading, setLoading] = useState([]);
  const [bikes, setBikes] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const res = await getUsersBikes(clientId);
      setBikes(res.bikes);
    } catch (error) {
      console.error("Erreur lors de la récupération des techniciens", error);
    } finally {
      setLoading(false);
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
      loading={loading}
    >
      {bikes &&
        bikes.map((bike) => (
          <Option key={parseID(bike)} value={parseID(bike)}>
            {bike.name} {bike.type}
          </Option>
        ))}
    </Select>
  );
}

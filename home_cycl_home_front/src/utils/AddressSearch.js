import React, { useState } from "react";
import { Select, Spin } from "antd";

const AddressSearch = ({ onAddressSelect }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refactoAddress = (address) => {
    onAddressSelect({
      street: address.data?.name,
      city: address.data?.city,
      code: address.data?.citycode,
      coords: {
        lat: address.geo?.coordinates[1],
        lng: address.geo?.coordinates[0],
      },
    });
  };

  const fetchAddresses = async (value) => {
    if (value.trim().length < 3) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${value}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const addresses = json.features.map((feature) => ({
        value: feature.properties.label,
        data: feature.properties,
        geo: feature.geometry
      }));
      setOptions(addresses);
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    fetchAddresses(value);
  };

  const handleSelect = (selected) => {
    const selectedOption = options.find(opt => opt.value === selected.value);
    if (selectedOption) {
      refactoAddress(selectedOption);
    }
  };

  return (
    <Select
      showSearch
      placeholder="Tapez une adresse complète"
      notFoundContent={loading ? <Spin size="small" /> : "Aucun résultat"}
      filterOption={false}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={options}
      style={{ width: "100%" }}
      labelInValue
    />
  );
};

export default AddressSearch;

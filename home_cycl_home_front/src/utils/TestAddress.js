import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { message, Select, Spin } from "antd";
import { testAddress } from "../actions/zones";

const TestAddress = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState();

  const nav = useNavigate();

  useEffect(() => {
    if (address?.geo?.coordinates) {
      checkAddress();
    }
  }, [address]);

  const checkAddress = async () => {
    setLoading(true);
    const [lng, lat] = address.geo.coordinates;

    try {
      const res = await testAddress({ latitude: lat, longitude: lng });

      if (res.inside) {
        message.success(`
                    Zone couverte par 
                    ${res?.insideZones[0]?.technician?.firstname} 
                    ${res?.insideZones[0]?.technician?.lastname}
                `);

        localStorage.setItem("validatedAddress", JSON.stringify(address));
        localStorage.setItem("zoneId", res.insideZones[0].id);
        nav("/auth/register");
      } else {
        message.error("Zone non couverte actuellement");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async (value) => {
    if (value.trim().length < 3) {
      setOptions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${value}`,
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const addresses = json.features.map((feature) => ({
        value: feature.properties.label,
        data: feature.properties,
        geo: feature.geometry,
      }));
      setOptions(addresses);
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses :", error);
    }
  };

  const handleSearch = (value) => {
    fetchAddresses(value);
  };

  const handleSelect = (selected) => {
    const selectedOption = options.find((opt) => opt.value === selected.value);
    if (selectedOption) {
      setAddress(selectedOption);
    }
  };

  return (
    <div style={styles.container}>
      <Select
        aria-label="Test d'adresse postale"
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
      {loading && <Spin size="small" />}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default TestAddress;

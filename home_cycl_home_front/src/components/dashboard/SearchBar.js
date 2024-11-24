import { Button } from "antd";
import AddressSearch from "../../utils/AdressSearch";
import { useState } from "react";

export default function SearchBar({ setNewZone }) {
  const [address, setAddress] = useState({})
  return (
    <div style={styles.searchContainer}>
      <AddressSearch
        onAddressSelect={(address) => {
          const updatedAddress = {
            housenumber: address.data.housenumber && address.data.housenumber,
            street: address.data.street,
            postcode: address.data.postcode,
            city: address.data.city,
            lat: address.geo.coordinates[1],
            lng: address.geo.coordinates[0]
          }
          console.log("upodatedAddress", updatedAddress)
          setAddress(updatedAddress)
        }}
      />
      <Button type="primary" onClick={() => setNewZone(address)}>Ajouter la zone</Button>
    </div>
  );
}

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

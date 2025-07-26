import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { getUsersBikes } from '../actions/user';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectMyBikes({ selectedBike, setSelectedBike, clientId }) {
    const [myBikes, setMyBikes] = useState([]);
    console.log("🚀 ~ SelectMyBikes ~ myBikes:", myBikes)

    const fetchMyBikes = useCallback(async () => {
        try {
            const res = await getUsersBikes(clientId);
            console.log("🚀 ~ fetchMyBikes ~ res:", res)
            setMyBikes(res.bikes);
        } catch (error) {
            console.error("Erreur lors de la récupération des techniciens", error);
        }
    }, [clientId]);

    useEffect(() => {
        fetchMyBikes();
    }, [fetchMyBikes]);

    const handleMyBikesChange = (value) => {
        const newTypeSelected = myBikes.find((target) => parseID(target) === value)
        setSelectedBike(newTypeSelected);
    };

    return (
        <Select
            value={parseID(selectedBike)}
            onChange={handleMyBikesChange}
            allowClear
            style={{ width: '100%', margin: "5px" }}
            placeholder="Sélectionnez un de vos vélos"
        >
            <Option disabled value={null}>Sélectionnez un de vos vélos</Option>

            {myBikes && myBikes.map((bike) => (
                <Option key={parseID(bike)} value={parseID(bike)}>
                    {bike.name} {bike.type}
                </Option>
            ))}
        </Select>
    );
}

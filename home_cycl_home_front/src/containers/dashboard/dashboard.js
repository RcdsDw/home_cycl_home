import React, { useState, useEffect } from 'react';

import { Card, Divider } from 'antd';

import Map from '../../components/dashboard/map.js';
import SearchBar from '../../components/dashboard/searchBar.js';

export default function Dashboard () {
  const [newZone, setNewZone] = useState({})
  
  useEffect(() => {
  }, [newZone])

  return (
    <>
      <Card>
        <SearchBar setNewZone={setNewZone}/>
        <Divider/>
        <Map newZone={newZone}/>
      </Card>
    </>
  );
};

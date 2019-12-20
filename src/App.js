import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import Map from "./Components/Map";
import FirstButtons from "./Components/FirstButtons";
import Papa from "papaparse";
import { AddressText, Body, DistanceText } from "./Style.js";

function App() {
  const [residents, setResidents] = useState(0);

  const [address, setAddress] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const [center, setCenter] = useState({ lat: 40.8529221, lng: 14.2723433 });

  const [zoom, setZoom] = useState(16);

  const [distance, setDistance] = useState(0);

  const updateData = result => {
    setResidents(kFormatter(result.data.length));
    uniqueAddress(result.data);
  };

  const changeValue = value => {
    setDistance(kFormatterDistance(value));
  };

  const loadCSV = e => {
    Papa.parse(e[0], {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: updateData
    });
    setUploaded(true);
  };

  const kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * (Math.abs(num) / 1000).toFixed(1);
  };

  const kFormatterDistance = num => {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1);
  };

  const uniqueAddress = result => {
    const uniqueTags = [];
    result.map(item => {
      if (uniqueTags.indexOf(item.Indirizzo) === -1) {
        uniqueTags.push(item.Indirizzo);
      }
    });
    setAddress(uniqueTags);
  };

  const getCoordinates = async result => {
    await geocodeByAddress(result)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => setCenter({ lat: lat, lng: lng }));
    setSelectedAddress(true);
  };

  return (
    <div className="App">
      <Body>
        <FirstButtons residents={residents} loadCSV={loadCSV} />
        {uploaded ? (
          <>
            <AddressText>INDIRIZZO</AddressText>
            <DistanceText>DISTANZA</DistanceText>
            <br />
            <Map
              center={center}
              zoom={zoom}
              getCoordinates={getCoordinates}
              changeValue={changeValue}
              distance={distance}
              selectedAddress={selectedAddress}
            />
          </>
        ) : null}
      </Body>
    </div>
  );
}

export default App;

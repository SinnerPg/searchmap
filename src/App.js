import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Map from "./Components/Map";
import FirstButtons from "./Components/FirstButtons";
import SecondButtons from "./Components/SecondButtons";
import Papa from "papaparse";
import { AddressText, Body, DistanceText, AddressTextArea } from "./Style.js";

function App() {
  const [residents, setResidents] = useState(0);

  const [address, setAddress] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const [center, setCenter] = useState({ lat: 40.8529221, lng: 14.2723433 });

  const [zoom, setZoom] = useState(15);

  const [textAreaValue, setTextAreaValue] = useState();

  const [distance, setDistance] = useState(0);

  const updateCsvData = result => {
    setResidents(kFormatter(result.data.length));
  };

  const changeValue = value => {
    setDistance(kFormatterDistance(value));
  };

  const loadCSV = e => {
    Papa.parse(e[0], {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: updateCsvData
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
    result.elements.map(item => {
      if (item.tags.name) {
        if (uniqueTags.indexOf(item.tags.name) === -1) {
          uniqueTags.push(item.tags.name);
        }
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

  const getNearbyAddress = async distance => {
    const res = await fetch(
      "https://overpass-api.de/api/interpreter?data=[out:json];way(around:" +
        distance * 1000 +
        "," +
        center.lat +
        "," +
        center.lng +
        ")[%22highway%22~%22secondary|tertiary|primary|residential%22];(._;way(r););out;"
    );
    await res
      .json()
      .then(result => uniqueAddress(result))
      .then(
        setTextAreaValue(
          address.map(address => {
            return address;
          })
        )
      );
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
            <AddressText>INDIRIZZI VICINI</AddressText>
            <SecondButtons
              address={address}
              distance={distance}
              getNearbyAddress={getNearbyAddress}
            />
            <AddressTextArea readOnly value={textAreaValue} />
          </>
        ) : null}
      </Body>
    </div>
  );
}

export default App;

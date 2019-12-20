import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";
import Papa from "papaparse";
import {
  LoadFile,
  DBResident,
  RegularText,
  Body,
  DistanceText,
  SelectAddress,
  LoadFileLabel,
  FirstButtons,
  ContainerLoadFileLabel,
  ResidentsLabel,
  MapDiv,
  Map
} from "./Style.js";

function App() {
  const [residents, setResidents] = useState(0);

  const [address, setAddress] = useState([]);

  const updateData = result => {
    setResidents(kFormatter(result.data.length));
    uniqueAddress(result.data);
  };
  const loadCSV = e => {
    Papa.parse(e[0], {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: updateData
    });
  };

  const kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
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

  return (
    <div className="App">
      <Body>
        <FirstButtons>
          <DBResident>
            <ResidentsLabel>
              Residenti in DB: <b>{residents}</b>
            </ResidentsLabel>
          </DBResident>
          <LoadFile
            id="file"
            type="file"
            accept=".csv"
            onChange={e => loadCSV(e.target.files)}
          ></LoadFile>
          <ContainerLoadFileLabel>
            <LoadFileLabel htmlFor="file">Carica CSV residenti</LoadFileLabel>
          </ContainerLoadFileLabel>
        </FirstButtons>
        <RegularText>INDIRIZZO</RegularText>
        <DistanceText>DISTANZA</DistanceText>
        <br />
        <SelectAddress>
          {address.map(item => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </SelectAddress>
        <GooglePlacesAutocomplete onSelect={console.log} />
        <MapDiv>
          <Map
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.6369400493177!2d14.246593915715081!3d40.83593763796039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUwJzA5LjQiTiAxNMKwMTQnNTUuNiJF!5e0!3m2!1sit!2sit!4v1576799436705!5m2!1sit!2sit"
            frameborder="0"
            allowfullscreen=""
          ></Map>
        </MapDiv>
      </Body>
    </div>
  );
}

export default App;

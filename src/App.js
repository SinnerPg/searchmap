import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Map from "./Components/Map";
import FirstButtons from "./Components/FirstButtons";
import SecondButtons from "./Components/SecondButtons";
import ThirdButtons from "./Components/ThirdButtons";
import convertArrayToCSV from "convert-array-to-csv";
import Papa from "papaparse";
import { AddressText, Body, DistanceText, AddressTextArea } from "./Style.js";

function App() {
  const [residentsNumber, setResidentsNumber] = useState(0); //Numero residenti

  const [rangeResidents, setRangeResidents] = useState(null); //Residenti nel raggio scelto

  const [residents, setResidents] = useState(null); //Dati di tutti i residenti nel csv caricato

  const [searchedAddress, setSearchedAddress] = useState(false); //Booleana che permette di attivare la ricerca dei residenti

  const [searchedResidents, setSearchedResidents] = useState(false); //Booleana che permette di attivare l'esportazione del csv

  const [csvAddress, setCsvAddress] = useState();

  const [address, setAddress] = useState(null); //Indirizzi cercati nel raggio

  const [selectedAddress, setSelectedAddress] = useState(false); //Booleana che permette di attivare la ricerca degli indirizzi nel raggio

  const [textSelectedAddress, setTextSelectedAddress] = useState(); //Booleana che permette di attivare la ricerca degli indirizzi nel raggio

  const [uploaded, setUploaded] = useState(false); //Booleana che permette di cercare l'indirizzo sulla mappa

  const [center, setCenter] = useState({ lat: 40.8529221, lng: 14.2723433 }); //Posiziona il centro della mappa Google

  const [zoom, setZoom] = useState(15); //Zoom mappa

  const [textAreaValue, setTextAreaValue] = useState(null); //Testo da stampare nella textArea. (Necessitavo per poter usare il break line correttamente)

  const [distance, setDistance] = useState(0.0); //Raggio scelto per la ricerca

  useEffect(() => {
    document.title = "Search Map AsteDirect";
  }, []);

  const updateCsvData = result => {
    let arrOfStr;
    setResidentsNumber(kFormatter(result.data.length));
    setResidents(
      //Funzione che aggiorna lo stato con tutti i residenti del CV. Si impiega nella traduzione degli indirizzi
      result.data.map(item => {
        if (item.Indirizzo.split(" ")[0] === "V.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return { ...item, Indirizzo: "VIA" + array };
        } else if (item.Indirizzo.split(" ")[0] === "V.LE") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "VIALE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "ALTRO") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 2; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "VIALE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "VLE") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "VIALE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "TRAV.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "TRAVERSA" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "LGMARE") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "LUNGOMARE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "P.LE") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "PIAZZALE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "C.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return { ...item, Indirizzo: "CORSO" + array };
        } else if (item.Indirizzo.split(" ")[0] === "P.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "PIAZZA" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "SAL.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "SALITA" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "LG.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return { ...item, Indirizzo: "LARGO" + array };
        } else if (item.Indirizzo.split(" ")[0] === "LOC.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "LOCALITÀ" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "VC.") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "VICOLO" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "P.TTA") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "PIAZZETTA" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "VAI") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return { ...item, Indirizzo: "VIA" + array };
        } else if (item.Indirizzo.split(" ")[0] === "LNM") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "LUNGOMARE" + array
          };
        } else if (item.Indirizzo.split(" ")[0] === "PTA") {
          arrOfStr = item.Indirizzo.split(" ");
          let array = "";
          for (let i = 1; i < arrOfStr.length; i++) {
            array = array + " " + arrOfStr[i];
          }
          return {
            ...item,
            Indirizzo: "PATRONATO" + array
          };
        } else {
          return item;
        }
      })
    );
  };

  const changeValue = value => {
    setDistance(kFormatterDistance(value)); //Funzione che aggiorna il range di ricerca degli indirizzi
  };

  const loadCSV = e => {
    Papa.parse(e[0], {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: updateCsvData //Funzione che carica il file csv e nasconde il resto della pagina
    });
    setSelectedAddress(false);
    setTextAreaValue(null);
    setAddress(null);
    setUploaded(true);
    setSearchedAddress(false);
  };

  const exportCSV = () => {
    const header = [
      "Cognome",
      "Nome",
      "Indirizzo",
      "Civico",
      "CAP",
      "Citta",
      "Prov",
      "Pref",
      "Tel"
    ];
    const csvFromArrayOfObjects = convertArrayToCSV(csvAddress);
    let blob = new Blob([csvFromArrayOfObjects]);
    let testLink = document.createElement("a");
    testLink.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    testLink.download = "lista.csv";
    document.body.appendChild(testLink);
    testLink.click();
    document.body.removeChild(testLink);
  };

  const kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num).toFixed(1); //Funzione che formatta i numeri nel formato "K" se superano le 1000 unità.
  };

  const kFormatterDistance = num => {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1);
  };

  const uniqueAddress = result => {
    const uniqueTags = [];
    const uniqueTags2 = [];
    uniqueTags.push(textSelectedAddress[0]);
    result.elements.map(item => {
      if (item.tags.name) {
        if (uniqueTags.indexOf(item.tags.name) === -1) {
          uniqueTags.push(item.tags.name);
        }
      }
    });
    uniqueTags.map(item => {
      //Funzione che popola gli indirizzi nel raggio scelto. Permette di non duplicare gli indirizzi.
      uniqueTags2.push(item + " \n \n");
    });
    setAddress(uniqueTags);
    setTextAreaValue(uniqueTags2);
    setSearchedAddress(true);
  };

  const getCoordinates = async result => {
    await geocodeByAddress(result)
      .then(setTextSelectedAddress(result.split(",")))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => setCenter({ lat: lat, lng: lng })); //Funzione che posiziona la mappa sull'indirizzo scelto.
    setSelectedAddress(true);
  };

  const getNearbyResidents = () => {
    let arrOfStr, arrOfStr2;
    const uniqueTags = [];
    const uniqueTags2 = [];
    residents.map(item => {
      address.map(item2 => {
        arrOfStr = item.Indirizzo.split(" ");
        let array = "";
        for (let i = 1; i < arrOfStr.length; i++) {
          array = array + " " + arrOfStr[i];
        }
        arrOfStr2 = item2.toUpperCase().split(" ");
        let array2 = "";
        for (let i = 1; i < arrOfStr2.length; i++) {
          array2 = array2 + " " + arrOfStr2[i];
        }
        if (array2 === array) {
          uniqueTags.push(
            item.Nome +
            " " +
            item.Cognome +
            ", " +
            item.Pref +
            item.Tel +
            " " +
            item.Indirizzo + //Funzione che ricerca tutti i residenti nel raggio scelto.
              ", " +
              item.Civico +
              " " +
              item.CAP +
              " " +
              item.Citta +
              " " +
              item.Prov +
              " \n \n"
          );
          uniqueTags2.push({
            Cognome: item.Cognome,
            Nome: item.Nome,
            Indirizzo: item.Indirizzo,
            Civico: item.Civico,
            CAP: item.CAP,
            Citta: item.Citta,
            Prov: item.Prov,
            Pref: item.Pref,
            Tel: item.Tel
          });
        }
      });
    });
    setRangeResidents(uniqueTags);
    setCsvAddress(uniqueTags2);
    setSearchedResidents(true);
  };

  const getNearbyAddress = async distance => {
    const res = await fetch(
      "https://overpass-api.de/api/interpreter?data=[out:json];way(around:" +
      distance * 1000 +
      "," +
      center.lat + //Funzione che ricerca gli indirizzi nel raggio scelto.
        "," +
        center.lng +
        ")[%22highway%22~%22secondary|tertiary|primary|residential%22];(._;way(r););out;"
    );
    await res.json().then(result => uniqueAddress(result));
  };

  return (
    <div className="App">
      <Body>
        <FirstButtons residentsNumber={residentsNumber} loadCSV={loadCSV} />
        {uploaded && (
          <>
            <AddressText>INDIRIZZO</AddressText>
            {selectedAddress && <DistanceText>DISTANZA</DistanceText>}
            <br />
            <Map
              center={center}
              zoom={zoom}
              setZoom={setZoom}
              getCoordinates={getCoordinates}
              changeValue={changeValue}
              distance={distance}
              selectedAddress={selectedAddress}
              setDistance={setDistance}
            />
            {selectedAddress && (
              <>
                <AddressText>INDIRIZZI VICINI</AddressText>
                <SecondButtons
                  address={address}
                  distance={distance}
                  getNearbyAddress={getNearbyAddress}
                  zoom={zoom}
                  searchedAddress={searchedAddress}
                />
                <AddressTextArea
                  readOnly
                  value={textAreaValue !== null ? textAreaValue.join(" ") : ""}
                />
                <br />
                {searchedAddress && (
                  <>
                    <AddressText>RESIDENTI NEL RAGGIO</AddressText>
                    <ThirdButtons
                      rangeResidents={rangeResidents}
                      getNearbyResidents={getNearbyResidents}
                      kFormatter={kFormatter}
                      exportCSV={exportCSV}
                      searchedResidents={searchedResidents}
                    />
                    <AddressTextArea
                      readOnly
                      style={{ marginBottom: "94px" }}
                      value={
                        rangeResidents !== null ? rangeResidents.join(" ") : ""
                      }
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Body>
    </div>
  );
}

export default App;

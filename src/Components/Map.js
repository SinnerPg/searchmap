import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import "../App.css";
import {
  MapDiv,
  GoogleMap,
  FlexMap,
  Range,
  RangeTextBox,
  RangeText
} from "../Style.js";

function Map(props) {
  const getMapOptions = {
    disableDefaultUI: true,
    mapTypeControl: false,
    streetViewControl: false,
    minZoom: 14,
    maxZoom: 14
  };

  const {
    getCoordinates,
    center,
    zoom,
    changeValue,
    distance,
    selectedAddress
  } = props;

  return (
    <>
      <FlexMap>
        <GooglePlacesAutocomplete
          onSelect={result => getCoordinates(result.description)}
          placeholder=""
          autocompletionRequest={{
            componentRestrictions: {
              country: ["it"]
            }
          }}
        />
        {selectedAddress && (
          <>
            <Range onChange={event => changeValue(event.target.value)} />
            <RangeTextBox value={distance} />
            <RangeText>Km</RangeText>
          </>
        )}
      </FlexMap>
      <br></br>
      <MapDiv>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyC2Q3RQFcWWAZk30ctZRWYEIxveiAHsJKk"
          }}
          center={center}
          defaultZoom={zoom}
          options={getMapOptions}
        ></GoogleMap>
      </MapDiv>
    </>
  );
}

export default Map;

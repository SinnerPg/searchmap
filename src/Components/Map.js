import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Marker from "./Marker";
import RangeComponent from "./RangeComponent";
import RangeMarker from "./RangeMarker";
import "../App.css";
import { MapDiv, GoogleMap, FlexMap } from "../Style.js";
import { meters2ScreenPixels } from "google-map-react/utils";

function Map(props) {
  const getMapOptions = {
    disableDefaultUI: true,
    mapTypeControl: false,
    streetViewControl: false,
    minZoom: 15,
    maxZoom: 20
  };

  const {
    getCoordinates,
    center,
    zoom,
    changeValue,
    distance,
    selectedAddress,
    setZoom,
    setDistance
  } = props;

  const lat = center.lat;

  const lng = center.lng;
  function handleZoomChanged(newZoom) {
    setZoom(newZoom);
  }
  const { w, h } = meters2ScreenPixels(distance * 1000, { lat, lng }, zoom);

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
          <RangeComponent changeValue={changeValue} distance={distance} setDistance={setDistance} />
        )}
      </FlexMap>
      <br />
      <MapDiv>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyC2Q3RQFcWWAZk30ctZRWYEIxveiAHsJKk"
          }}
          center={center}
          zoom={zoom}
          onZoomAnimationEnd={handleZoomChanged}
          options={getMapOptions}
        >
          {selectedAddress && (
            <Marker lat={center.lat} lng={center.lng} color="red"></Marker>
          )}
          {selectedAddress && distance !== 0 && (
            <RangeMarker
              lat={center.lat}
              lng={center.lng}
              width={w * 2}
              height={h * 2}
            ></RangeMarker>
          )}
        </GoogleMap>
      </MapDiv>
    </>
  );
}

export default Map;

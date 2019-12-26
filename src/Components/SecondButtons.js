import React from "react";
import {
  AddressLabel,
  LeftButton,
  SearchAddressButton,
  InitialButtons,
  SearchAddressLabel
} from "../Style.js";

function SecondButtons(props) {
  const { address, getNearbyAddress, distance } = props;
  return (
    <>
      <InitialButtons>
        <LeftButton style={{ backgroundColor: "#F0F0F0" }}>
          <AddressLabel>
            Indirizzi trovati: <b>{address !== null && address.length}</b>
          </AddressLabel>
        </LeftButton>
        <SearchAddressButton onClick={() => getNearbyAddress(distance)}>
          <SearchAddressLabel>Cerca indirizzi</SearchAddressLabel>
        </SearchAddressButton>
      </InitialButtons>
    </>
  );
}

export default SecondButtons;
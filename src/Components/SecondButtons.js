import React from "react";
import {
  AddressLabel,
  LeftButton,
  SearchAddressButton,
  InitialButtons,
  SearchAddressLabel
} from "../Style.js";

function SecondButtons(props) {
  const { address, getNearbyAddress, distance, searchedAddress } = props;

  return (
    <>
      <InitialButtons>
        {searchedAddress && (
          <LeftButton style={{ backgroundColor: "#F0F0F0" }}>
            <AddressLabel>
              Indirizzi trovati: <b>{address !== null && address.length}</b>
            </AddressLabel>
          </LeftButton>
        )}
        <SearchAddressButton
          style={{ marginLeft: !searchedAddress && 0 }}
          onClick={() => getNearbyAddress(distance)}
        >
          <SearchAddressLabel>Cerca indirizzi</SearchAddressLabel>
        </SearchAddressButton>
      </InitialButtons>
    </>
  );
}

export default SecondButtons;

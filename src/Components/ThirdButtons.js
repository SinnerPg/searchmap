import React from "react";
import {
  FoundResidents,
  LeftButton,
  SearchAddressButton,
  InitialButtons,
  SearchAddressLabel,
  ContainerExportFileLabel,
  ExportFileLabel
} from "../Style.js";

function ThirdButtons(props) {
  const {
    rangeResidents,
    getNearbyResidents,
    kFormatter,
    exportCSV,
    searchedResidents
  } = props;

  return (
    <>
      <InitialButtons>
        {searchedResidents && (
          <LeftButton style={{ backgroundColor: "#F0F0F0" }}>
            <FoundResidents>
              Residenti trovati:{" "}
              <b>
                {rangeResidents !== null && kFormatter(rangeResidents.length)}
              </b>
            </FoundResidents>
          </LeftButton>
        )}
        <SearchAddressButton
          style={{ marginLeft: !searchedResidents && 0 }}
          onClick={() => getNearbyResidents()}
        >
          <SearchAddressLabel>Cerca residenti</SearchAddressLabel>
        </SearchAddressButton>
        {searchedResidents && (
          <ContainerExportFileLabel onClick={() => exportCSV()}>
            <ExportFileLabel>Esporta CSV</ExportFileLabel>
          </ContainerExportFileLabel>
        )}
      </InitialButtons>
    </>
  );
}

export default ThirdButtons;

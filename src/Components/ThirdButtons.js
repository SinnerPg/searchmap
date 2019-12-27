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
  const { rangeResidents, getNearbyResidents, kFormatter, exportCSV } = props;

  return (
    <>
      <InitialButtons>
        <LeftButton style={{ backgroundColor: "#F0F0F0" }}>
          <FoundResidents>
            Residenti trovati: <b>{rangeResidents !== null && kFormatter(rangeResidents.length)}</b>
          </FoundResidents>
        </LeftButton>
        <SearchAddressButton onClick={() => getNearbyResidents()}>
          <SearchAddressLabel>Cerca residenti</SearchAddressLabel>
        </SearchAddressButton>
          <ContainerExportFileLabel onClick={() => exportCSV()}>
            <ExportFileLabel>Esporta CSV</ExportFileLabel>
          </ContainerExportFileLabel>
      </InitialButtons>
    </>
  );
}

export default ThirdButtons;

import React from "react";
import {
  LoadFile,
  LeftButton,
  LoadFileLabel,
  InitialButtons,
  ContainerLoadFileLabel,
  ResidentsLabel,
} from "../Style.js";

function FirstButtons(props) {
const { residents, loadCSV } = props;
  return (
      <>
        <InitialButtons>
          <LeftButton style={{ backgroundColor: "#9d9eaa"}}>
            <ResidentsLabel>
              Residenti in DB: <b>{residents}</b>
            </ResidentsLabel>
          </LeftButton>
          <LoadFile
            id="file"
            type="file"
            accept=".csv"
            onChange={e => loadCSV(e.target.files)}
          ></LoadFile>
          <ContainerLoadFileLabel>
            <LoadFileLabel htmlFor="file">Carica CSV residenti</LoadFileLabel>
          </ContainerLoadFileLabel>
        </InitialButtons>
      </>
  );
}

export default FirstButtons;

import styled from "styled-components";
import GoogleMapReact from "google-map-react";

export const Body = styled.div`
  margin-left: 71px;
  margin-top: 79px;
`;

export const LoadFile = styled.input.attrs(props => ({
  type: "file"
}))`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
export const InitialButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexMap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ContainerLoadFileLabel = styled.div`
  background-color: #7692d3;
  border: none;
  margin-left: 11px;
  width: 349px;
  height: 61px;
  align-items: center;
  display: flex;
`;

export const SearchAddressButton = styled.div`
  background-color: #7692d3;
  border: none;
  margin-left: 11px;
  width: 349px;
  height: 61px;
  align-items: center;
  display: flex;
`;

export const LeftButton = styled.div.attrs(props => ({
  backgroundColor: props.color
}))`
  border: none;
  width: 347px;
  height: 61px;
  align-items: center;
  display: flex;
`;

export const MapDiv = styled.div`
  width: 1196px;
  height: 409px;
  position: relative;
  overflow: hidden;
`;

export const GoogleMap = styled(GoogleMapReact)``;

export const ResidentsLabel = styled.label`
  border: none;
  font-size: 25px;
  padding-left: 28px;
  padding-right: 41px;
  margin: 0 auto;
  color: white;
  font-family: "Montserrat", sans-serif;
`;

export const AddressLabel = styled.label`
  border: none;
  font-size: 25px;
  padding-left: 28px;
  padding-right: 66px;
  margin: 0 auto;
  color: black;
  font-family: "Montserrat", sans-serif;
`;

export const LoadFileLabel = styled.label`
  border: none;
  font-size: 28px;
  padding-left: 34px;
  padding-right: 30px;
  margin: 0 auto;
  color: white;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
`;

export const SearchAddressLabel = styled.label`
  border: none;
  font-size: 28px;
  padding-left: 64px;
  padding-right: 60px;
  margin: 0 auto;
  color: white;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
`;

export const AddressTextArea = styled.textarea`
  width: 1196px;
  height: 341px;
  margin-top: 26px;
  resize: none;
`

export const AddressText = styled.p`
  font-size: 20px;
  margin-top: 30px;
  text-decoration: none;
  color: #707070;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: inline-block;
`;

export const Range = styled.input.attrs(props => ({
  type: "range",
  min: 0,
  max: 2000,
  step: 200
}))``;

export const RangeTextBox = styled.input.attrs(props => ({
  type: "text"
}))`
  width: 50px;
  height: 42px;
  margin-left: 35px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const RangeText = styled.p`
  margin-left: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const DistanceText = styled.p`
  font-size: 20px;
  margin-top: 30px;
  margin-left: 536px;
  text-decoration: none;
  color: #707070;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: inline-block;
`;

export const GoogleMarker = styled.div.attrs(props => ({
  backgroundColor: props.color
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  z-index: 2;
  &:hover {
    z-index: 1;
  }
`;

export const RangeCircle = styled.div.attrs(props => ({
  width: props.width,
  height: props.height,
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  z-index: 3;
  border: 1px solid red;
  user-select: none;
  transform: translate(-50%, -50%);
`;

import React from "react";
import { Input } from "../core/Input";
import { BtnSearchCar } from "../core/BtnSearchCar";
import { BtnDecodeVIN } from "../core/BtnDecodeVIN";
import { BtnVariablesList } from "../core/BtnVariablesList";
import carLogo from "../img/carLogo.png";

export function SearchVin() {
  return (
    <>
      <div className="form">
        <img src={carLogo} />
        <Input />
        <div className="buttons">
          <BtnSearchCar />
          <BtnDecodeVIN />
          <BtnVariablesList />
        </div>
      </div>
      <textarea id="results"></textarea>
      <pre id="results1"></pre>
    </>
  );
}

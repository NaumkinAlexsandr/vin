import React from "react";
import $ from "jquery";

export function BtnVariablesList() {
  async function handleInput() {
    let vin = document.getElementById("vinCode").value.toUpperCase();
    if (vin.length === 17) {
      const params = await getVehicleVariableList(vin);
      console.log(params);
      showResults(params);
    }
  }

  async function getVehicleVariableList(vin) {
    try {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json&vin=${vin}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        return data.Results.reduce((accumulator, current) => {
          if (current.DataType && current.Description) {
            accumulator[current.ID] = {
              DataType: current.DataType,
              Description: current.Description,
              GroupName: current.GroupName,
              Name: current.Name,
            };
          }
          return accumulator;
        }, {});
      } else {
        throw new Error("No results found.");
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }

  function showResults(param_data) {
    let output_text = "";

    for (let key in param_data) {
      let result = param_data[key];
      output_text += `${result.Name}: ${result.Description} \n`;
    }

    document.getElementById("results").value = output_text;
  }

  return (
    <>
      <button id="variableList" onClick={handleInput}>
        Variable
      </button>
    </>
  );
}

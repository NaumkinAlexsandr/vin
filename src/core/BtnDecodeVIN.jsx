import React from "react";
import $ from "jquery";

export function BtnDecodeVIN() {
  function handleInput() {
    let vin = document.getElementById("vinCode").value;
    if (vin.length === 17) {
      CheckVin(vin);
    }
  }

  async function CheckVin(vin) {
    var response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );
    let result = await response.json();
    result = result.Results.reduce((accumulator, crr) => {
      if (crr.Value && crr.Value != "Not Applicable") {
        accumulator[crr.VariableId] = {
          variable: crr.Variable,
          value: crr.Value,
        };
      }
      showResults(result);

      return accumulator;
    }, {});

    if (result["143"].value !== "0") {
      throw result["191"].value;
    }
    console.log(result);
    return result;
  }

  function showResults(param_data) {
    let output_text = "";

    for (let i = 0; i < param_data.Results.length; i++) {
      let result = param_data.Results[i];

      for (let prop in result) {
        if (result.hasOwnProperty(prop) && result[prop] !== "") {
          output_text += prop + ": " + result[prop] + "\n";
        }
      }
    }

    document.getElementById("results").value = output_text;
  }

  return (
    <>
      <button id="decodeVIN" onClick={handleInput}>
        Decode VIN
      </button>
    </>
  );
}

import React from "react";
import $ from "jquery";

export function BtnVariablesList() {
  function handleInput() {
    let vin = document.getElementById("vinCode").value;
    if (vin.length === 17) {
      CheckVin(vin);
    }
  }

  function CheckVin(vin) {
    return $.ajax({
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`,
      type: "GET",
      dataType: "json",
      success: function (result) {
        console.log(result);
        result = result.Results.reduce((accumulator, crr) => {
          if (crr.Value && crr.Value != "Not Applicable") {
            accumulator[crr.VariableId] = {
              variable: crr.Variable,
              value: crr.Value,
            };
          }
          showResults(result);
        }, {});
        if (result["143"].value !== "0") {
          throw result["191"].value;
        }
        console.log(result);
        return result;
      },
    });
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
      <button id="variableList" onClick={handleInput}>
        Variable
      </button>
    </>
  );
}

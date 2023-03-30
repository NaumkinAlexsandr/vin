import React from "react";

export function BtnDecodeVIN() {
  function handleInput() {
    let vin = document.getElementById("vinCode").value.toUpperCase();
    if (vin.length === 17) {
      checkVin(vin);
    }
  }

  async function checkVin(vin) {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        const result = data.Results.reduce((accumulator, current) => {
          if (current.Value && current.Value != "Not Applicable") {
            accumulator[current.VariableId] = {
              variable: current.Variable,
              value: current.Value,
            };
          }
          return accumulator;
        }, {});

        if (result["143"].value !== "0") {
          throw new Error(result["191"].value);
        }

        console.log(result);
        showResults(result);
        return result;
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
      output_text += result.variable + ": " + result.value + "\n";
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

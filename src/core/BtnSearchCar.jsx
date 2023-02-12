import React from "react";
import $ from "jquery";

export function BtnSearchCar() {
  function handleInput() {
    let vin = document.getElementById("vinCode").value;
    if (vin.length === 17) {
      getDataByVIN(vin);
    }
  }

  function getDataByVIN(vin) {
    $.ajax({
      url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
      type: "POST",
      data: { format: "json", data: vin },
      dataType: "json",
      success: function (result) {
        console.log(result);
        showResults(result);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
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
      <button id="getCar" onClick={handleInput}>
        SearchCar
      </button>
    </>
  );
}

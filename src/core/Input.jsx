import React from "react";
import $ from "jquery";

export function Input({ onClick }) {
  $(function () {
    let $ctrl = $("#vinCode");
    let $msg = $("#validation-message");

    $ctrl.keyup(function () {
      if (validateVin($ctrl.val())) {
        $msg.html("VIN is valid!").removeClass("not-valid").addClass("valid");
      } else {
        $msg
          .html("VIN is not valid! Try 1FTFW1CT5DFC10312")
          .removeClass("valid")
          .addClass("not-valid");
      }
    });
  });

  function validateVin(vin) {
    return validate(vin);
    function transliterate(c) {
      return "0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ".indexOf(c) % 10;
    }

    function get_check_digit(vin) {
      let map = "0123456789X";
      let weights = "8765432X098765432";
      let sum = 0;
      for (let i = 0; i < 17; ++i)
        sum += transliterate(vin[i]) * map.indexOf(weights[i]);
      return map[sum % 11];
    }

    function validate(vin) {
      if (vin.length !== 17) return false;
      return get_check_digit(vin) === vin[8];
    }
  }
  return (
    <>
      <input
        id="vinCode"
        type="text"
        maxLength="17"
        placeholder="Enter VIN Code"
        onClick={onClick}
        required
      />
      <span id="validation-message"></span>
    </>
  );
}

import React, { useState } from "react";

export default function TelephoneFormatter() {
  const [phoneValue, setPhoneValue] = useState("");

  const formatString = (e) => {
    const raw = e.target.value;
    const numstr = raw.replace(/\D/g, ""); 

    const formatted =
      numstr.length > 3
        ? "+(" + numstr.slice(0, 3) + ") - " + numstr.slice(3)
        : numstr;

    setPhoneValue(formatted);
  };

  return (
    <div className="container text-center">
      <input
        type="tel"
        id="phone"
        maxLength={16}
        placeholder="Mobile number"
        autoComplete="off"
        style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        value={phoneValue}
        onChange={formatString}
      />

      <div>
        <label htmlFor="phone">+(123) - 4567890</label>
      </div>
    </div>
  );
}

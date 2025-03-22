import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Masts from "./masts";
import Forks from "./forks";
import SideShifts from "./sideshifts";
import "typeface-roboto";

const Kbd = () => {
  // Static data
  const modelData = {
    modelname: "KBD15",
    imgName: require("../photos/KB20.jpg"),
    engType: "Diesel",
    engine: "ISUZU Diesel Engine C240-30 Euro 5",
    rangeName: "D Series",
    rangeCat: "1-1.5T",
    liftcapacity: 1500,
  };

  const mastsData = [
    {
      _id: 1,
      masttype: "2 Stage Mast",
      sizes: [
        { _id: 1, length: 3000, price: 0 },
        { _id: 2, length: 3300, price: 225 },
        { _id: 3, length: 4000, price: 395 },
        { _id: 4, length: 4500, price: 640 },
        { _id: 5, length: 5000, price: 760 }
      ]
    },
    {
      _id: 2,
      masttype: "2 Stage Full Free Mast",
      sizes: [
        { _id: 1, length: 3000, price: 501 },
        { _id: 3, length: 4000, price: 896 }
      ]
    },
    {
      _id: 3,
      masttype: "3 Stage Full Free Mast",
      sizes: [
        { _id: 1, length: 4350, price: 1200 },
        { _id: 2, length: 4500, price: 1350 },
        { _id: 3, length: 4700, price: 1490 },
        { _id: 4, length: 5000, price: 1620 },
        { _id: 5, length: 5500, price: 1710 },
        { _id: 6, length: 6000, price: 1988 }
      ]
    }
  ];

  const forksData = [
    { _id: 1, length: 1070, price: 0 },
    { _id: 2, length: 1200, price: 95 },
    { _id: 3, length: 1370, price: 169 },
    { _id: 4, length: 1500, price: 265 },
    { _id: 5, length: 1670, price: 311 }
  ];

  const sideshiftsData = [
    { _id: 1, type: "None", price: 0 },
    { _id: 2, type: " Hook On", price: 350 },
    { _id: 3, type: "Integral", price: 800 }
  ];

  // State
  const [totalprice, setTotalprice] = useState(11303);
  const [selectedMast, setSelectedMast] = useState(null);
  const [selectedMastSize, setSelectedMastSize] = useState(null);
  const [selectedFork, setSelectedFork] = useState(null);
  const [selectedSideShift, setSelectedSideShift] = useState(null);

  // Event handlers
  const handleMastSel = (mast) => {
    console.log("Current Mast Selected", selectedMast);
    console.log("Passedmask", mast);
    console.log("Mast Selected ", mast);
    setSelectedMast(mast);
  };

  const handleMastSizeSel = (mastsize) => {
    console.log("Current Mast Size Selected", selectedMastSize);
    console.log("Passedmask", mastsize);
    console.log("Mast Selected ", mastsize);

    const oldprice = selectedMastSize ? selectedMastSize.price : 0;
    const newprice = totalprice + mastsize.price - oldprice;

    setSelectedMastSize(mastsize);
    setTotalprice(newprice);
  };

  const handleForkSel = (fork) => {
    console.log("Current Fork Selected", selectedFork);
    console.log("PassedmFork", fork);

    const oldprice = selectedFork ? selectedFork.price : 0;
    const newprice = totalprice + fork.price - oldprice;

    setSelectedFork(fork);
    setTotalprice(newprice);
  };

  const handleSideShiftSel = (sideshift) => {
    console.log("Current Side Shift Selected", selectedSideShift);
    console.log("Side Shift Selected ", sideshift);

    const oldprice = selectedSideShift ? selectedSideShift.price : 0;
    const newprice = totalprice + sideshift.price - oldprice;

    setSelectedSideShift(sideshift);
    setTotalprice(newprice);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>KBD 15</h1>

          <ul id="forkliftranges">
            <h2>
              {modelData.engType} {modelData.rangeCat} INTERNAL COMBUSTION
            </h2>
            <img src={modelData.imgName} alt="" />
            <div></div>
            <li>
              {modelData.modelName} 1.5T {modelData.rangeCat}{" "}
              {modelData.engType} forklift
              <br />
              {modelData.liftcapacity}Kg
              <br /> {modelData.engType}
              <br />
              {modelData.engine} <br />
              {selectedMast ? (
                selectedMast.masttype
              ) : (
                <span>Please Select a Mast Type</span>
              )}
              <br />
              {selectedMastSize
                ? "Mast Size - " + selectedMastSize.length
                : null}
              <br />
              {selectedFork
                ? "Fork Length - " + selectedFork.length
                : null}
              <br />
              {selectedSideShift
                ? "Side Shift - " + selectedSideShift.type
                : null}
              <br />
              Side Lever
              <br />
              ISO Safety System
              <br />
              Full LED Road Lighting
              <br />
              Amber Beacon, Safety Blue Spot
              <br />
              Reverse Alarm
              <br />
              <br />
              <strong>Quote Price : £{totalprice}</strong>
            </li>
          </ul>
        </Grid>
        <Grid item xs={6}>
          <Masts
            masts={mastsData}
            selectedMast={selectedMast}
            onMastSel={handleMastSel}
            onMastSizeSel={handleMastSizeSel}
            selectedMastSize={selectedMastSize}
          />

          <Forks
            forks={forksData}
            selectedFork={selectedFork}
            onForkSel={handleForkSel}
          />

          <SideShifts
            sideshifts={sideshiftsData}
            selectedSideShift={selectedSideShift}
            onSideShiftSel={handleSideShiftSel}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Kbd;

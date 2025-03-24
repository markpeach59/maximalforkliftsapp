import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";
import { getForkliftDetail } from "../services/forkliftDetailService";
import { savequote } from "../services/quotesService";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Import components
import ForkliftImg from "./forkliftimg";
import ResetOptions from "./resetoptions";
import QuoteSave from "./quotesave";
import Markup from "./markup";
import Offertext from "./offertext";
import Voltage from "./voltage";
import Chassis from "./chassis";
import Engines from "./engines";
import Masts from "./masts";
import Valves from "./valves";
import Forks from "./forks";
import Fork2ds from "./fork2d";
import SideShifts from "./sideshifts";
import Forkpositioners from "./forkpositioner";
import Controller from "./controller";
import Viewtyres from "./viewtyres";
import Tyres from "./tyres";
import Halolight from "./halolight";
import Safetybluespot from "./safetybluespot";
import ColdStoreProts from "./coldstoreprot";
import Reargrabs from "./reargrab";
import Platforms from "./platform";
import Armguards from "./armguard";
import Sideleverhydraulics from "./sideleverhydraulic";
import Steerings from "./steering";
import Rollers from "./rollers";
import Stabiliser from "./stabiliser";
import Liftybutton from "./liftybutton";
import Displaywithcamera from "./displaywithcamera";
import Pincode from "./pincode";
import Loadbackrests from "./loadbackrest";
import Viewseats from "./viewseats";
import Seats from "./seats";
import Batterycompartments from "./batterycompartment";
import Batterys from "./battery";
import Chargers from "./charger";
import Sparebatteries from "./sparebatteries";
import Bfs from "./bfs";
import Trolley from "./trolley";
import Blinkey from "./blinkey";
import Sideextractionbatterys from "./sideextractionbattery";
import Cabins from "./cabins";
import Heaters from "./heater";
import Aircons from "./aircon";
import Upsweptexhausts from "./upsweptexhaust";
import Precleaners from "./precleaner";
import Heavydutyairfilters from "./heavydutyairfilter";

const ForkliftDetail = () => {
  // Hooks
  const { modelName } = useParams();
  const navigate = useNavigate();

  // State
  const [forkliftData, setForkliftData] = useState(null);
  const [user, setUser] = useState(null);
  const [restricted, setRestricted] = useState(false);
  const [totalprice, setTotalprice] = useState(0);
  const [baseprice, setBaseprice] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Option states
  const [selectedVoltage, setSelectedVoltage] = useState(null);
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedMast, setSelectedMast] = useState(null);
  const [selectedMastSize, setSelectedMastSize] = useState(null);
  const [selectedValve, setSelectedValve] = useState(null);
  const [selectedFork, setSelectedFork] = useState(null);
  const [selectedFork2d, setSelectedFork2d] = useState(null);
  const [selectedSideShift, setSelectedSideShift] = useState(null);
  const [selectedForkpositioner, setSelectedForkpositioner] = useState(null);
  const [selectedController, setSelectedController] = useState(null);
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [selectedHalolight, setSelectedHalolight] = useState(null);
  const [selectedSafetybluespot, setSelectedSafetybluespot] = useState(null);
  const [selectedColdStoreProt, setSelectedColdStoreProt] = useState(null);
  const [selectedReargrab, setSelectedReargrab] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedArmguard, setSelectedArmguard] = useState(null);
  const [selectedSideleverhydraulic, setSelectedSideleverhydraulic] = useState(null);
  const [selectedSteering, setSelectedSteering] = useState(null);
  const [selectedRoller, setSelectedRoller] = useState(null);
  const [selectedStabiliser, setSelectedStabiliser] = useState(null);
  const [selectedLiftybutton, setSelectedLiftybutton] = useState(null);
  const [selectedDisplaywithcamera, setSelectedDisplaywithcamera] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [selectedLoadbackrest, setSelectedLoadbackrest] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedBatterycompartment, setSelectedBatterycompartment] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [batteryconstraint, setBatteryconstraint] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [selectedSpare, setSelectedSpare] = useState(null);
  const [selectedBfs, setSelectedBfs] = useState(null);
  const [selectedTrolley, setSelectedTrolley] = useState(null);
  const [selectedBlinkey, setSelectedBlinkey] = useState(null);
  const [selectedSideextractionbattery, setSelectedSideextractionbattery] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [selectedHeater, setSelectedHeater] = useState(null);
  const [selectedAircon, setSelectedAircon] = useState(null);
  const [selectedUpsweptexhaust, setSelectedUpsweptexhaust] = useState(null);
  const [selectedPrecleaner, setSelectedPrecleaner] = useState(null);
  const [selectedHeavydutyairfilter, setSelectedHeavydutyairfilter] = useState(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("ForkliftDetail component mounting");
        
        const currentUser = auth.getCurrentUser();
        if (!currentUser) {
          console.error("No user found in auth.getCurrentUser()");
          setError("Authentication required");
          setLoading(false);
          return;
        }
        
        setUser(currentUser);
        
        let isRestricted = false;

        if (currentUser.dealerId) {
          try {
            const { data: dealery } = await getDealerDetail(currentUser.dealerId);
            if (dealery.isRestricted) {
              isRestricted = true;
            }
          } catch (error) {
            console.error("Error fetching dealer details:", error);
          }
        }

        if (currentUser.isMaximGB || currentUser.isAdmin) {
          const test = localStorage.getItem("restricted");
          if (test) {
            isRestricted = true;
          }
        }

        setRestricted(isRestricted);
        
        try {
          console.log("Requesting forklift details for model:", modelName);
          
          try {
            const { data: forklift } = await getForkliftDetail(modelName);
            console.log("Forklift data received:", forklift);
            
            if (!forklift) {
              console.error("No forklift data received");
              setError("Forklift not found");
              setLoading(false);
              return;
            }

            let initialbaseprice = forklift.basePrice;
            if (isRestricted && forklift.basePriceR) initialbaseprice = forklift.basePriceR;

            setForkliftData(forklift);
            setTotalprice(initialbaseprice);
            setBaseprice(initialbaseprice);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching forklift details:", error);
            
            // Check if it's an authentication error
            if (error.message.includes("Authentication required")) {
              // Redirect to login page
              auth.logout();
              window.location = "/login";
              return;
            }
            
            if (error.response) {
              console.error("Response status:", error.response.status);
              console.error("Response data:", error.response.data);
              
              if (error.response.status === 401) {
                setError("Authentication required. Please log in again.");
                auth.logout();
                setTimeout(() => {
                  window.location = "/login";
                }, 2000);
                return;
              }
            }
            
            setError(`Failed to load forklift details: ${error.message}`);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error in loadData:", error);
          setError("An unexpected error occurred");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in loadData:", error);
        setError("An error occurred");
        setLoading(false);
      }
    };

    loadData();
  }, [modelName]);

  // Handler for reset options
  const handleResetOptions = async () => {
    setTotalprice(baseprice);
    
    // Reset all selected options to null
    setSelectedVoltage(null);
    setSelectedChassis(null);
    setSelectedEngine(null);
    setSelectedMast(null);
    setSelectedMastSize(null);
    setSelectedValve(null);
    setSelectedFork(null);
    setSelectedFork2d(null);
    setSelectedSideShift(null);
    setSelectedForkpositioner(null);
    setSelectedController(null);
    setSelectedTyre(null);
    setSelectedHalolight(null);
    setSelectedSafetybluespot(null);
    setSelectedColdStoreProt(null);
    setSelectedReargrab(null);
    setSelectedPlatform(null);
    setSelectedArmguard(null);
    setSelectedSideleverhydraulic(null);
    setSelectedSteering(null);
    setSelectedRoller(null);
    setSelectedStabiliser(null);
    setSelectedLiftybutton(null);
    setSelectedDisplaywithcamera(null);
    setSelectedPincode(null);
    setSelectedLoadbackrest(null);
    setSelectedSeat(null);
    setSelectedBatterycompartment(null);
    setSelectedBattery(null);
    setSelectedCharger(null);
    setSelectedSpare(null);
    setSelectedBfs(null);
    setSelectedTrolley(null);
    setSelectedBlinkey(null);
    setSelectedSideextractionbattery(null);
    setSelectedCabin(null);
    setSelectedHeater(null);
    setSelectedAircon(null);
    setSelectedUpsweptexhaust(null);
    setSelectedPrecleaner(null);
    setSelectedHeavydutyairfilter(null);
    
    // Reset the forkliftData state to remove any battery options
    try {
      console.log("Resetting forklift data to original state");
      const { data: forklift } = await getForkliftDetail(modelName);
      
      // Preserve the original state but remove any battery/charger options
      setForkliftData(prevData => ({
        ...prevData,
        battery: null,
        batterys: null,
        charger: null,
        chargers: null
      }));
      
      // Clear the debug reference
      if (window.debugBatteries) {
        window.debugBatteries = null;
      }
    } catch (error) {
      console.error("Error resetting forklift data:", error);
    }
    
    console.log("Reset options, new total price:", baseprice);
  };

  // Handler for quote save
  const handleQuoteSave = async () => {
    if (!forkliftData || !user) return;
    
    // Create the quote object with all the individual fields
    const quote = {
      userid: user._id,
      model: forkliftData.model,
      price: totalprice,
      markup: markup,
      capacity: forkliftData.capacity,
      engtype: forkliftData.engType,
      powertrain: forkliftData.powertrain,
      baseprice: baseprice,
      imgname: forkliftData.imgName, // Include the image name
      
      // Include all selected options as individual fields
      masttype: selectedMast || "",
      mastsize: selectedMastSize ? selectedMastSize.mastlength : "",
      closedheight: selectedMastSize ? selectedMastSize.closedheight : "",
      freeliftheight: selectedMastSize ? selectedMastSize.freelift : "",
      
      valve: selectedValve ? selectedValve.valvetype : "",
      forks: selectedFork ? selectedFork.forklength : "",
      fork2d: selectedFork2d ? selectedFork2d.forklength : "",
      sideshift: selectedSideShift ? selectedSideShift.sideshifttype : "",
      forkpositioner: selectedForkpositioner ? true : false,
      
      controller: selectedController ? selectedController.controllertype : "",
      tyre: selectedTyre ? selectedTyre.tyretype : "",
      
      pincode: selectedPincode ? true : false,
      liftybutton: selectedLiftybutton ? true : false,
      roller: selectedRoller ? selectedRoller.rollertype : "",
      displaywithcamera: selectedDisplaywithcamera ? true : false,
      safetybluespot: selectedSafetybluespot ? true : false,
      
      halolight: selectedHalolight ? true : false,
      upsweptexhaust: selectedUpsweptexhaust ? true : false,
      precleaner: selectedPrecleaner ? true : false,
      heavydutyairfilter: selectedHeavydutyairfilter ? true : false,
      
      coldstoreprot: selectedColdStoreProt ? true : false,
      seat: selectedSeat ? selectedSeat.seattype : "",
      cabin: selectedCabin ? selectedCabin.cabinoption : "",
      
      aircon: selectedAircon ? true : false,
      heater: selectedHeater ? true : false,
      reargrab: selectedReargrab ? true : false,
      sideleverhydraulic: selectedSideleverhydraulic ? true : false,
      
      battery: selectedBattery ? selectedBattery.batterytype : "",
      charger: selectedCharger ? selectedCharger.chargertype : "",
      spare: selectedSpare ? selectedSpare.sparetype : "",
      
      armguard: selectedArmguard ? true : false,
      platform: selectedPlatform ? true : false,
      loadbackrest: selectedLoadbackrest ? true : false,
      steering: selectedSteering ? true : false,
      
      bfs: selectedBfs ? true : false,
      manualtrolley: selectedTrolley ? true : false,
      blinkey: selectedBlinkey ? true : false,
      stabiliser: selectedStabiliser ? true : false,
      sideextractionbattery: selectedSideextractionbattery ? true : false,
      
      order: false
    };
    
    console.log("Saving quote:", quote);
    
    try {
      const response = await savequote(quote);
      console.log("Quote saved successfully:", response.data);
      navigate(`/quotes/${response.data._id}`);
    } catch (error) {
      console.error("Failed to save quote:", error);
    }
  };

  // Handler for markup
  const handleMarkup = (newMarkup) => {
    setMarkup(newMarkup);
  };

  // Option handlers
  const handleVoltageSel = (voltage) => {
    setSelectedVoltage(voltage);
    updateTotalPrice(voltage, selectedVoltage);
  };

  const handleChassisSel = (chassis) => {
    setSelectedChassis(chassis);
    
    // For reach models, batteries are nested inside chassis
    if (chassis && chassis.batteries) {
      console.log("Chassis has batteries:", chassis.batteries);
      
      // Log the structure of the batteries array for debugging
      console.log("Battery structure:", JSON.stringify(chassis.batteries));
      
      // For reach models, we need to ensure the batteries array is properly formatted
      // The battery component expects an array of battery objects with _id and batterytype properties
      const formattedBatteries = chassis.batteries.map((battery, index) => {
        // Create a new battery object with required properties
        return {
          ...battery,
          _id: `battery-${index}-${Date.now()}`, // Ensure each battery has a unique _id
          batterytype: battery.batterytype || `Battery ${index + 1}`, // Ensure batterytype exists
          price: battery.price || 0 // Ensure price exists
        };
      });
      
      console.log("Formatted batteries:", JSON.stringify(formattedBatteries));
      
      // Create a direct reference to the batteries for debugging
      window.debugBatteries = formattedBatteries;
      console.log("Debug batteries set to window.debugBatteries");
      
      // If this is a reach model with batteries in the chassis, update the forkliftData
      // We need to use a callback to ensure we're working with the latest state
      setForkliftData(prevData => {
        console.log("Updating forkliftData with batteries");
        
        // Create a new object with the updated battery property
        // Use 'batterys' instead of 'battery' to match the component's expected prop name
        const updatedData = {
          ...prevData,
          battery: formattedBatteries,
          batterys: formattedBatteries // Add both singular and plural forms
        };
        
        console.log("Updated forklift data:", updatedData);
        return updatedData;
      });
      
      // Reset selected battery and charger when chassis changes
      setSelectedBattery(null);
      setSelectedCharger(null);
      
      // Enable battery selection
      setBatteryconstraint(false);
      
      // Make batteries available for selection but don't auto-select
      console.log("Making batteries available for selection");
      
      // If the battery has chargers, update the forkliftData with them
      if (chassis.batteries.length === 1 && chassis.batteries[0].chargers) {
        console.log("Battery has chargers:", chassis.batteries[0].chargers);
        setForkliftData(prevData => ({
          ...prevData,
          charger: chassis.batteries[0].chargers
        }));
      }
    }
    
    updateTotalPrice(chassis, selectedChassis);
  };

  const handleEngineSel = (engine) => {
    setSelectedEngine(engine);
    
    // Reset battery constraint when engine type is lead acid or lithium
    if (engine && (engine.enginetype.toLowerCase().includes('lead acid') || 
                   engine.enginetype.toLowerCase().includes('lithium'))) {
      setBatteryconstraint(false);
      console.log("Engine selected is lead acid or lithium, enabling battery selection");
    } else {
      setBatteryconstraint(true);
      console.log("Engine selected is not lead acid or lithium, disabling battery selection");
    }
    
    updateTotalPrice(engine, selectedEngine);
  };

  const handleMastSel = (mast) => {
    setSelectedMast(mast);
    updateTotalPrice(mast, selectedMast);
  };

  const handleMastSizeSel = (mastSize, mastType) => {
    setSelectedMastSize(mastSize);
    setSelectedMast(mastType);
    updateTotalPrice(mastSize, selectedMastSize);
  };

  const handleValveSel = (valve) => {
    setSelectedValve(valve);
    updateTotalPrice(valve, selectedValve);
  };

  const handleForkSel = (fork) => {
    setSelectedFork(fork);
    updateTotalPrice(fork, selectedFork);
  };

  const handleFork2dSel = (fork2d) => {
    setSelectedFork2d(fork2d);
    updateTotalPrice(fork2d, selectedFork2d);
  };

  const handleSideShiftSel = (sideShift) => {
    // If selecting a side shift and fork positioner is already selected
    if (sideShift && selectedForkpositioner) {
      // Store the current fork positioner price to subtract it
      const forkPositionerPrice = 1510;
      
      // Calculate the new total by removing fork positioner price and adding side shift price
      let newTotal = totalprice - forkPositionerPrice;
      
      // Add the side shift price
      if (sideShift.price) {
        newTotal += sideShift.price;
      }
      
      // Subtract the old side shift price if it exists
      if (selectedSideShift && selectedSideShift.price) {
        newTotal -= selectedSideShift.price;
      }
      
      // Update the state
      setSelectedSideShift(sideShift);
      setSelectedForkpositioner(null);
      setTotalprice(newTotal);
      
      console.log("Selected side shift, deselected fork positioner, new total:", newTotal);
    } else if (sideShift) {
      // When selecting a side shift (not deselecting)
      
      // Find the "3rd" valve option if it exists
      let thirdValve = null;
      if (forkliftData.valves) {
        thirdValve = forkliftData.valves.find(valve => valve.valvetype === "3rd");
      }
      
      // Calculate the new total price
      let newTotal = totalprice;
      
      // Subtract the old side shift price if it exists
      if (selectedSideShift && selectedSideShift.price) {
        newTotal -= selectedSideShift.price;
      }
      
      // Add the new side shift price
      if (sideShift.price) {
        newTotal += sideShift.price;
      }
      
      // If a valve was already selected, subtract its price
      if (selectedValve) {
        newTotal -= selectedValve.price;
      }
      
      // If we found a 3rd valve, add its price and select it
      if (thirdValve) {
        newTotal += thirdValve.price;
        setSelectedValve(thirdValve);
        console.log("Automatically selected 3rd valve with side shift");
      }
      
      // Update the state
      setSelectedSideShift(sideShift);
      setTotalprice(newTotal);
      
      console.log("Selected side shift, new total:", newTotal);
    } else {
      // Deselecting side shift
      setSelectedSideShift(null);
      updateTotalPrice(null, selectedSideShift);
    }
  };

  const handleForkpositionerSel = (forkpositioner) => {
    // If deselecting the fork positioner
    if (!forkpositioner) {
      // Store the current fork positioner price to subtract it
      const oldForkPositionerPrice = selectedForkpositioner ? 1510 : 0;
      
      // Store the current valve price to potentially subtract it
      const oldValvePrice = selectedValve && selectedValve.valvetype === "3rd + 4th" ? 220 : 0;
      
      // Clear the selected fork positioner
      setSelectedForkpositioner(null);
      
      // Calculate the new total by subtracting the fork positioner price
      let newTotal = totalprice - oldForkPositionerPrice;
      
      // If the valve was automatically selected with the fork positioner, keep it selected
      // but subtract its price from the total (it will be added back if needed)
      if (selectedValve && selectedValve.valvetype === "3rd + 4th") {
        newTotal -= oldValvePrice;
      }
      
      console.log("Deselected fork positioner, new total:", newTotal);
      setTotalprice(newTotal);
      return;
    }
    
    // Log the fork positioner details for debugging
    console.log("Fork positioner selected:", forkpositioner);
    console.log("Current total price:", totalprice);
    
    // Hard-coded prices from the seed data
    const forkPositionerPrice = 1510;
    const valvePrice = 220;
    
    // Create a new fork positioner object with the correct price
    const forkPositionerWithPrice = {
      ...forkpositioner,
      price: forkPositionerPrice
    };
    
    // Calculate the new total price by adding the fork positioner price
    let newTotal = totalprice;
    
    // If there was already a fork positioner selected, subtract its price first
    if (selectedForkpositioner) {
      newTotal -= 1510; // Subtract the old fork positioner price
      console.log("Subtracted old fork positioner price, new total:", newTotal);
    }
    
    // If a side shift is selected, deselect it and subtract its price
    if (selectedSideShift) {
      newTotal -= selectedSideShift.price || 0;
      console.log("Deselected side shift, subtracted price, new total:", newTotal);
      setSelectedSideShift(null);
    }
    
    // Add the fork positioner price
    newTotal += forkPositionerPrice;
    console.log("Added fork positioner price, new total:", newTotal);
    
    // Set the selected fork positioner with the correct price
    setSelectedForkpositioner(forkPositionerWithPrice);
    
    // Find the "3rd + 4th" valve option
    let thirdPlusFourthValve = null;
    if (forkliftData.valves) {
      thirdPlusFourthValve = forkliftData.valves.find(valve => valve.valvetype === "3rd + 4th");
      if (thirdPlusFourthValve) {
        // If there was already a valve selected, subtract its price first
        if (selectedValve) {
          newTotal -= selectedValve.price;
          console.log("Subtracted old valve price, new total:", newTotal);
        }
        
        // Add the new valve price
        newTotal += valvePrice;
        console.log("Added new valve price, new total:", newTotal);
        
        // Set the selected valve
        setSelectedValve(thirdPlusFourthValve);
      }
    }
    
    console.log("Final total price:", newTotal);
    
    // Update the state
    setTotalprice(newTotal);
  };

  const handleControllerSel = (controller) => {
    setSelectedController(controller);
    updateTotalPrice(controller, selectedController);
  };

  const handleTyreSel = (tyre) => {
    setSelectedTyre(tyre);
    updateTotalPrice(tyre, selectedTyre);
  };

  const handleHalolightSel = (halolight) => {
    setSelectedHalolight(halolight);
    updateTotalPrice(halolight, selectedHalolight);
  };

  const handleSafetybluespotSel = (safetybluespot) => {
    setSelectedSafetybluespot(safetybluespot);
    updateTotalPrice(safetybluespot, selectedSafetybluespot);
  };

  const handleColdStoreProtSel = (coldStoreProt) => {
    setSelectedColdStoreProt(coldStoreProt);
    updateTotalPrice(coldStoreProt, selectedColdStoreProt);
  };

  const handleReargrabSel = (reargrab) => {
    setSelectedReargrab(reargrab);
    updateTotalPrice(reargrab, selectedReargrab);
  };

  const handlePlatformSel = (platform) => {
    setSelectedPlatform(platform);
    updateTotalPrice(platform, selectedPlatform);
  };

  const handleArmguardSel = (armguard) => {
    setSelectedArmguard(armguard);
    updateTotalPrice(armguard, selectedArmguard);
  };

  const handleSideleverhydraulicSel = (sideleverhydraulic) => {
    setSelectedSideleverhydraulic(sideleverhydraulic);
    updateTotalPrice(sideleverhydraulic, selectedSideleverhydraulic);
  };

  const handleSteeringSel = (steering) => {
    setSelectedSteering(steering);
    updateTotalPrice(steering, selectedSteering);
  };

  const handleRollerSel = (roller) => {
    setSelectedRoller(roller);
    updateTotalPrice(roller, selectedRoller);
  };

  const handleStabiliserSel = (stabiliser) => {
    setSelectedStabiliser(stabiliser);
    updateTotalPrice(stabiliser, selectedStabiliser);
  };

  const handleLiftybuttonSel = (liftybutton) => {
    setSelectedLiftybutton(liftybutton);
    updateTotalPrice(liftybutton, selectedLiftybutton);
  };

  const handleDisplaywithcameraSel = (displaywithcamera) => {
    setSelectedDisplaywithcamera(displaywithcamera);
    updateTotalPrice(displaywithcamera, selectedDisplaywithcamera);
  };

  const handlePincodeSel = (pincode) => {
    setSelectedPincode(pincode);
    updateTotalPrice(pincode, selectedPincode);
  };

  const handleLoadbackrestSel = (loadbackrest) => {
    setSelectedLoadbackrest(loadbackrest);
    updateTotalPrice(loadbackrest, selectedLoadbackrest);
  };

  const handleSeatSel = (seat) => {
    setSelectedSeat(seat);
    updateTotalPrice(seat, selectedSeat);
  };

  const handleBatterycompartmentSel = (batterycompartment) => {
    setSelectedBatterycompartment(batterycompartment);
    updateTotalPrice(batterycompartment, selectedBatterycompartment);
  };

  const handleBatterySel = (battery) => {
    setSelectedBattery(battery);
    updateTotalPrice(battery, selectedBattery);
  };

  const handleChargerSel = (charger) => {
    setSelectedCharger(charger);
    updateTotalPrice(charger, selectedCharger);
  };

  const handleSpareSel = (spare) => {
    setSelectedSpare(spare);
    updateTotalPrice(spare, selectedSpare);
  };

  const handleBfsSel = (bfs) => {
    setSelectedBfs(bfs);
    updateTotalPrice(bfs, selectedBfs);
  };

  const handleTrolleySel = (trolley) => {
    setSelectedTrolley(trolley);
    updateTotalPrice(trolley, selectedTrolley);
  };

  const handleBlinkeySel = (blinkey) => {
    setSelectedBlinkey(blinkey);
    updateTotalPrice(blinkey, selectedBlinkey);
  };

  const handleSideextractionbatterySel = (sideextractionbattery) => {
    setSelectedSideextractionbattery(sideextractionbattery);
    updateTotalPrice(sideextractionbattery, selectedSideextractionbattery);
  };

  const handleCabinSel = (cabin) => {
    setSelectedCabin(cabin);
    updateTotalPrice(cabin, selectedCabin);
  };

  const handleHeaterSel = (heater) => {
    setSelectedHeater(heater);
    updateTotalPrice(heater, selectedHeater);
  };

  const handleAirconSel = (aircon) => {
    setSelectedAircon(aircon);
    updateTotalPrice(aircon, selectedAircon);
  };

  const handleUpsweptexhaustSel = (upsweptexhaust) => {
    setSelectedUpsweptexhaust(upsweptexhaust);
    updateTotalPrice(upsweptexhaust, selectedUpsweptexhaust);
  };

  const handlePrecleanerSel = (precleaner) => {
    setSelectedPrecleaner(precleaner);
    updateTotalPrice(precleaner, selectedPrecleaner);
  };

  const handleHeavydutyairfilterSel = (heavydutyairfilter) => {
    setSelectedHeavydutyairfilter(heavydutyairfilter);
    updateTotalPrice(heavydutyairfilter, selectedHeavydutyairfilter);
  };

  // Helper function to update total price
  const updateTotalPrice = (newOption, oldOption) => {
    let newTotal = totalprice;
    
    // Subtract old option price if it exists
    if (oldOption && oldOption.price) {
      newTotal -= oldOption.price;
    }
    
    // Add new option price if it exists
    if (newOption && newOption.price) {
      newTotal += newOption.price;
    }
    
    setTotalprice(newTotal);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render if no forklift data
  if (!forkliftData) {
    return <div>No forklift data available</div>;
  }

  // Check if "Coming Soon"
  if (forkliftData.modeldescription && 
      forkliftData.modeldescription[0].description === 'Coming Soon') {
    return (
      <React.Fragment>
        <h2>{forkliftData.model}</h2>
        <h3>Coming Soon</h3>
      </React.Fragment>
    );
  }

  // Main render
  return (
    <React.Fragment>
      {forkliftData.offer && (
        <div>
          <Offertext model={forkliftData.model} />
        </div>
      )}

      <Grid container>
        {user && (user.isAdmin || user.isMaximGB) && 
          !restricted && (
            <Typography>Normal Pricing</Typography>
          )}
        {user && (user.isAdmin || user.isMaximGB) && 
          restricted && (
            <Typography>Restricted Pricing</Typography>
          )}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>{forkliftData.model}</h2>
          
          {forkliftData.imgName && forkliftData.imgName.length > 0 && (
            <ForkliftImg imgName={forkliftData.imgName} />
          )}
          
          <div>
            <p>{forkliftData.engType}</p>
            {forkliftData.powertrain && <p>{forkliftData.powertrain}</p>}
            <p>Capacity: {forkliftData.capacity}Kg 
              {forkliftData.loadcenter && ` @${forkliftData.loadcenter}mm LC`}
            </p>
          </div>
          
          {/* Display selected options */}
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            {selectedMast && selectedMastSize && (
              <p>Mast: {selectedMast} {selectedMastSize.mastlength}mm</p>
            )}
            {selectedValve && <p>Valve: {selectedValve.valvetype}</p>}
            {selectedFork && <p>Fork: {selectedFork.forklength}mm</p>}
            {selectedFork2d && <p>Fork 2D: {selectedFork2d.forklength}mm</p>}
            {selectedSideShift && <p>Side Shift: {selectedSideShift.sideshifttype}</p>}
            {selectedForkpositioner && <p>Fork Positioner: {selectedForkpositioner.forkpositionertype}</p>}
            {selectedController && <p>Controller: {selectedController.controllertype}</p>}
            {selectedTyre && <p>Tyre: {selectedTyre.tyretype}</p>}
            {selectedHalolight && <p>Halo Light: {selectedHalolight.halolighttype || 'Yes'}</p>}
            {selectedSafetybluespot && <p>Safety Blue Spot: {selectedSafetybluespot.safetybluespottype || 'Yes'}</p>}
            {selectedColdStoreProt && <p>Cold Store Protection: {selectedColdStoreProt.coldstoreprot}</p>}
            {selectedReargrab && <p>Rear Grab: {selectedReargrab.reargrabtype}</p>}
            {selectedPlatform && <p>Platform: {selectedPlatform.platformtype}</p>}
            {selectedArmguard && <p>Arm Guard: {selectedArmguard.armguardtype}</p>}
            {selectedSideleverhydraulic && <p>Side Lever Hydraulic: {selectedSideleverhydraulic.sideleverhydraulictype}</p>}
            {selectedSteering && <p>Steering: {selectedSteering.steeringtype}</p>}
            {selectedRoller && <p>Roller: {selectedRoller.rollertype}</p>}
            {selectedStabiliser && <p>Stabiliser: {selectedStabiliser.stabilisertype}</p>}
            {selectedLiftybutton && <p>Lifty Button: {selectedLiftybutton.liftybuttontype}</p>}
            {selectedDisplaywithcamera && <p>Display with Camera: {selectedDisplaywithcamera.displaywithcameratype}</p>}
            {selectedPincode && <p>Pin Code: {selectedPincode.pincodetype}</p>}
            {selectedLoadbackrest && <p>Load Backrest: {selectedLoadbackrest.loadbackresttype}</p>}
            {selectedSeat && <p>Seat: {selectedSeat.seattype}</p>}
            {selectedBatterycompartment && <p>Battery Compartment: {selectedBatterycompartment.batterycompartmenttype}</p>}
            {selectedBattery && <p>Battery: {selectedBattery.batterytype}</p>}
            {selectedCharger && <p>Charger: {selectedCharger.chargertype}</p>}
            {selectedSpare && <p>Spare Battery: {selectedSpare.sparetype}</p>}
            {selectedBfs && <p>BFS: {selectedBfs.bfstype}</p>}
            {selectedTrolley && <p>Trolley: {selectedTrolley.trolleytype}</p>}
            {selectedBlinkey && <p>Blinkey: {selectedBlinkey.blinkeytype}</p>}
            {selectedSideextractionbattery && <p>Side Extraction Battery: {selectedSideextractionbattery.sideextractionbatterytype}</p>}
            {selectedCabin && <p>Cabin: {selectedCabin.cabinoption}</p>}
            {selectedHeater && <p>Heater: {selectedHeater.heatertype}</p>}
            {selectedAircon && <p>Air Conditioning: {selectedAircon.aircontype}</p>}
            {selectedUpsweptexhaust && <p>Upswept Exhaust: {selectedUpsweptexhaust.upsweptexhausttype}</p>}
            {selectedPrecleaner && <p>Precleaner: {selectedPrecleaner.precleanertype}</p>}
            {selectedHeavydutyairfilter && <p>Heavy Duty Air Filter: {selectedHeavydutyairfilter.heavydutyairfiltertype}</p>}
          </div>
          
          <div>
            <strong>
              Quote Price: £{totalprice + parseInt(markup)}
            </strong>
          </div>
          
          <div>
            <QuoteSave 
              onQuoteSave={handleQuoteSave} 
              forklift={{
                ...forkliftData, 
                totalprice, 
                markup, 
                selectedSeat, 
                selectedVoltage, 
                selectedChassis
              }} 
            />
            <Markup currentMarkup={markup} onMarkup={handleMarkup} />
          </div>
        </Grid>
        
        <Grid item xs={8}>
          <ResetOptions onResetOptions={handleResetOptions} />
          
          {forkliftData.voltage && forkliftData.voltage.length > 0 && (
            <Voltage
              voltages={forkliftData.voltage}
              selectedVoltage={selectedVoltage}
              onVoltageSel={handleVoltageSel}
            />
          )}

          {forkliftData.chassis && forkliftData.chassis.length > 0 && (
            <Chassis
              chassis={forkliftData.chassis}
              selectedChassis={selectedChassis}
              onChassisSel={handleChassisSel}
            />
          )}

          {forkliftData.engines && forkliftData.engines.length > 0 && (
            <Engines
              engines={forkliftData.engines}
              selectedEngine={selectedEngine}
              onEngineSel={handleEngineSel}
            />
          )}

          {forkliftData.masts && forkliftData.masts.length > 0 && (
            <Masts
              masts={forkliftData.masts}
              selectedMast={selectedMast}
              onMastSel={handleMastSel}
              onMastSizeSel={handleMastSizeSel}
              selectedMastSize={selectedMastSize}
              selectedSideShift={selectedSideShift}
              selectedForkpositioner={selectedForkpositioner}
            />
          )}

          {forkliftData.valves && forkliftData.valves.length > 0 && (
            <Valves
              valves={forkliftData.valves}
              selectedValve={selectedValve}
              selectedForkpositioner={selectedForkpositioner}
              onValveSel={handleValveSel}
            />
          )}

          {forkliftData.forks && forkliftData.forks.length > 0 && (
            <Forks
              forks={forkliftData.forks}
              selectedFork={selectedFork}
              onForkSel={handleForkSel}
            />
          )}

          {(forkliftData.fork2ds || forkliftData.fork2d || forkliftData.forks2d) && 
           (forkliftData.fork2ds?.length > 0 || forkliftData.fork2d?.length > 0 || forkliftData.forks2d?.length > 0) && (
            <Fork2ds
              fork2ds={forkliftData.fork2ds || forkliftData.fork2d || forkliftData.forks2d}
              selectedFork2d={selectedFork2d}
              onFork2dSel={handleFork2dSel}
            />
          )}

          {(forkliftData.sideshifts || forkliftData.sideshift) && 
           (forkliftData.sideshifts?.length > 0 || forkliftData.sideshift?.length > 0) && (
            <SideShifts
              sideshifts={forkliftData.sideshifts || forkliftData.sideshift}
              selectedSideShift={selectedSideShift}
              onSideShiftSel={handleSideShiftSel}
            />
          )}

          {(forkliftData.forkpositioners || forkliftData.forkpositioner) && 
           (forkliftData.forkpositioners?.length > 0 || forkliftData.forkpositioner?.length > 0) && (
            <Forkpositioners
              forkpositioners={forkliftData.forkpositioners || forkliftData.forkpositioner}
              selectedForkpositioner={selectedForkpositioner}
              onForkpositionerSel={handleForkpositionerSel}
            />
          )}

          {forkliftData.controllers && forkliftData.controllers.length > 0 && (
            <Controller
              controllers={forkliftData.controllers}
              selectedController={selectedController}
              onControllerSel={handleControllerSel}
            />
          )}

          {forkliftData.tyres && forkliftData.tyres.length > 0 && (
            <React.Fragment>
              <Viewtyres /><br />
              <Tyres
                tyres={forkliftData.tyres}
                selectedTyre={selectedTyre}
                onTyreSel={handleTyreSel}
              />
            </React.Fragment>
          )}

          {(forkliftData.halolights || forkliftData.halolight) && 
           (forkliftData.halolights?.length > 0 || forkliftData.halolight?.length > 0) && (
            <Halolight
              halolights={forkliftData.halolights || forkliftData.halolight}
              selectedHalolight={selectedHalolight}
              onHalolightSel={handleHalolightSel}
            />
          )}

          {(forkliftData.safetybluespots || forkliftData.safetybluespot) && 
           (forkliftData.safetybluespots?.length > 0 || forkliftData.safetybluespot?.length > 0) && (
            <Safetybluespot
              safetybluespots={forkliftData.safetybluespots || forkliftData.safetybluespot}
              selectedSafetybluespot={selectedSafetybluespot}
              onSafetybluespotSel={handleSafetybluespotSel}
            />
          )}

          {forkliftData.coldstoreprots && forkliftData.coldstoreprots.length > 0 && (
            <ColdStoreProts
              coldstoreprots={forkliftData.coldstoreprots}
              selectedColdStoreProt={selectedColdStoreProt}
              onColdStoreProtSel={handleColdStoreProtSel}
            />
          )}

          {forkliftData.reargrabs && forkliftData.reargrabs.length > 0 && (
            <Reargrabs
              reargrabs={forkliftData.reargrabs}
              selectedReargrab={selectedReargrab}
              onReargrabSel={handleReargrabSel}
            />
          )}

          {(forkliftData.platforms?.length > 0 || 
            (forkliftData.platform && Array.isArray(forkliftData.platform) && forkliftData.platform.length > 0) ||
            (forkliftData.platform && typeof forkliftData.platform === 'object' && 
             forkliftData.platform.platformtype)) && (
            <Platforms
              platforms={forkliftData.platforms || 
                (Array.isArray(forkliftData.platform) ? forkliftData.platform : 
                 (forkliftData.platform ? [forkliftData.platform] : []))}
              selectedPlatform={selectedPlatform}
              onPlatformSel={handlePlatformSel}
            />
          )}

          {forkliftData.armguards && forkliftData.armguards.length > 0 && (
            <Armguards
              armguards={forkliftData.armguards}
              selectedArmguard={selectedArmguard}
              onArmguardSel={handleArmguardSel}
            />
          )}

          {forkliftData.sideleverhydraulics && forkliftData.sideleverhydraulics.length > 0 && (
            <Sideleverhydraulics
              sideleverhydraulics={forkliftData.sideleverhydraulics}
              selectedSideleverhydraulic={selectedSideleverhydraulic}
              onSideleverhydraulicSel={handleSideleverhydraulicSel}
            />
          )}

          {(forkliftData.steerings?.length > 0 || 
            (forkliftData.steering && Array.isArray(forkliftData.steering) && forkliftData.steering.length > 0) ||
            (forkliftData.steering && typeof forkliftData.steering === 'object' && 
             forkliftData.steering.steeringtype)) && (
            <Steerings
              steerings={forkliftData.steerings || 
                (Array.isArray(forkliftData.steering) ? forkliftData.steering : 
                 (forkliftData.steering ? [forkliftData.steering] : []))}
              selectedSteering={selectedSteering}
              onSteeringSel={handleSteeringSel}
            />
          )}

          {forkliftData.rollers && forkliftData.rollers.length > 0 && (
            <Rollers
              rollers={forkliftData.rollers}
              selectedRoller={selectedRoller}
              onRollerSel={handleRollerSel}
            />
          )}

          {(forkliftData.stabilisers || forkliftData.stabiliser) && 
           (forkliftData.stabilisers?.length > 0 || forkliftData.stabiliser?.length > 0) && (
            <Stabiliser
              stabilisers={forkliftData.stabilisers || forkliftData.stabiliser}
              selectedStabiliser={selectedStabiliser}
              onStabiliserSel={handleStabiliserSel}
            />
          )}

          {(forkliftData.liftybuttons || forkliftData.liftybutton) && 
           (forkliftData.liftybuttons?.length > 0 || forkliftData.liftybutton?.length > 0) && (
            <Liftybutton
              liftybuttons={forkliftData.liftybuttons || forkliftData.liftybutton}
              selectedLiftybutton={selectedLiftybutton}
              onLiftybuttonSel={handleLiftybuttonSel}
            />
          )}

          {(forkliftData.displaywithcameras || forkliftData.displaywithcamera) && 
           (forkliftData.displaywithcameras?.length > 0 || forkliftData.displaywithcamera?.length > 0) && (
            <Displaywithcamera
              displaywithcameras={forkliftData.displaywithcameras || forkliftData.displaywithcamera}
              selectedDisplaywithcamera={selectedDisplaywithcamera}
              onDisplaywithcameraSel={handleDisplaywithcameraSel}
            />
          )}

          {(forkliftData.pincodes?.length > 0 || 
            (forkliftData.pincode && Array.isArray(forkliftData.pincode) && forkliftData.pincode.length > 0) ||
            (forkliftData.pincode && typeof forkliftData.pincode === 'object' && 
             forkliftData.pincode.pincodetype)) && (
            <Pincode
              pincodes={forkliftData.pincodes || 
                (Array.isArray(forkliftData.pincode) ? forkliftData.pincode : 
                 (forkliftData.pincode ? [forkliftData.pincode] : []))}
              selectedPincode={selectedPincode}
              onPincodeSel={handlePincodeSel}
            />
          )}

          {(forkliftData.loadbackrests?.length > 0 || 
            (forkliftData.loadbackrest && Array.isArray(forkliftData.loadbackrest) && forkliftData.loadbackrest.length > 0) ||
            (forkliftData.loadbackrest && typeof forkliftData.loadbackrest === 'object' && 
             forkliftData.loadbackrest.loadbackresttype !== undefined)) && (
            <Loadbackrests
              loadbackrests={forkliftData.loadbackrests || 
                (Array.isArray(forkliftData.loadbackrest) ? forkliftData.loadbackrest : 
                 (forkliftData.loadbackrest ? [forkliftData.loadbackrest] : []))}
              selectedLoadbackrest={selectedLoadbackrest}
              onLoadbackrestSel={handleLoadbackrestSel}
            />
          )}

          {(forkliftData.seats || forkliftData.seat) && 
           (forkliftData.seats?.length > 0 || forkliftData.seat?.length > 0) && (
            <React.Fragment>
              <Viewseats /><br />
              <Seats
                seats={forkliftData.seats || forkliftData.seat}
                selectedSeat={selectedSeat}
                onSeatSel={handleSeatSel}
              />
            </React.Fragment>
          )}

          {forkliftData.batterycompartments && forkliftData.batterycompartments.length > 0 && (
            <Batterycompartments
              batterycompartments={forkliftData.batterycompartments}
              selectedBatterycompartment={selectedBatterycompartment}
              onBatterycompartmentSel={handleBatterycompartmentSel}
            />
          )}

          {(forkliftData.batterys || forkliftData.batteries || forkliftData.battery) && 
           (forkliftData.batterys?.length > 0 || forkliftData.batteries?.length > 0 || forkliftData.battery?.length > 0) && (
            <Batterys
              batterys={forkliftData.batterys || forkliftData.batteries || forkliftData.battery}
              selectedBattery={selectedBattery}
              onBatterySel={handleBatterySel}
              batteryConstraint={batteryconstraint}
            />
          )}

          {(forkliftData.chargers || forkliftData.charger) && 
           (forkliftData.chargers?.length > 0 || forkliftData.charger?.length > 0) && (
            <Chargers
              chargers={forkliftData.chargers || forkliftData.charger}
              selectedCharger={selectedCharger}
              onChargerSel={handleChargerSel}
            />
          )}

          {(forkliftData.spares || forkliftData.spare) && 
           (forkliftData.spares?.length > 0 || forkliftData.spare?.length > 0) && (
            <Sparebatteries
              spares={forkliftData.spares || forkliftData.spare}
              selectedSpare={selectedSpare}
              onSpareSel={handleSpareSel}
            />
          )}

          {(forkliftData.bfss || forkliftData.bfs) && 
           (forkliftData.bfss?.length > 0 || forkliftData.bfs?.length > 0) && (
            <Bfs
              bfss={forkliftData.bfss || forkliftData.bfs}
              selectedBfs={selectedBfs}
              onBfsSel={handleBfsSel}
            />
          )}

          {(forkliftData.trolleys || forkliftData.trolley) && 
           (forkliftData.trolleys?.length > 0 || forkliftData.trolley?.length > 0) && (
            <Trolley
              trolleys={forkliftData.trolleys || forkliftData.trolley}
              selectedTrolley={selectedTrolley}
              onTrolleySel={handleTrolleySel}
            />
          )}

          {(forkliftData.blinkeys || forkliftData.blinkey) && 
           (forkliftData.blinkeys?.length > 0 || forkliftData.blinkey?.length > 0) && (
            <Blinkey
              blinkeys={forkliftData.blinkeys || forkliftData.blinkey}
              selectedBlinkey={selectedBlinkey}
              onBlinkeySel={handleBlinkeySel}
            />
          )}

          {(forkliftData.sideextractionbatterys || forkliftData.sideextractionbattery) && 
           (forkliftData.sideextractionbatterys?.length > 0 || forkliftData.sideextractionbattery?.length > 0) && (
            <Sideextractionbatterys
              sideextractionbatterys={forkliftData.sideextractionbatterys || forkliftData.sideextractionbattery}
              selectedSideextractionbattery={selectedSideextractionbattery}
              onSideextractionbatterySel={handleSideextractionbatterySel}
            />
          )}

          {(forkliftData.cabins || forkliftData.cabin) && 
           (forkliftData.cabins?.length > 0 || forkliftData.cabin?.length > 0) && (
            <Cabins
              cabins={forkliftData.cabins || forkliftData.cabin}
              selectedCabin={selectedCabin}
              onCabinSel={handleCabinSel}
              selectedUpsweptexhaust={selectedUpsweptexhaust}
            />
          )}

          {(forkliftData.heaters || forkliftData.heater) && 
           (forkliftData.heaters?.length > 0 || forkliftData.heater?.length > 0) && (
            <Heaters
              heaters={forkliftData.heaters || forkliftData.heater}
              selectedHeater={selectedHeater}
              onHeaterSel={handleHeaterSel}
            />
          )}

          {(forkliftData.aircons || forkliftData.aircon) && 
           (forkliftData.aircons?.length > 0 || forkliftData.aircon?.length > 0) && (
            <Aircons
              aircons={forkliftData.aircons || forkliftData.aircon}
              selectedAircon={selectedAircon}
              onAirconSel={handleAirconSel}
            />
          )}

          {(forkliftData.upsweptexhausts || forkliftData.upsweptexhaust) && 
           (forkliftData.upsweptexhausts?.length > 0 || forkliftData.upsweptexhaust?.length > 0) && (
            <Upsweptexhausts
              upsweptexhausts={forkliftData.upsweptexhausts || forkliftData.upsweptexhaust}
              selectedUpsweptexhaust={selectedUpsweptexhaust}
              onUpsweptexhaustSel={handleUpsweptexhaustSel}
              selectedCabin={selectedCabin}
            />
          )}

          {(forkliftData.precleaners || forkliftData.precleaner) && 
           (forkliftData.precleaners?.length > 0 || forkliftData.precleaner?.length > 0) && (
            <Precleaners
              precleaners={forkliftData.precleaners || forkliftData.precleaner}
              selectedPrecleaner={selectedPrecleaner}
              onPrecleanerSel={handlePrecleanerSel}
            />
          )}

          {(forkliftData.heavydutyairfilters || forkliftData.heavydutyairfilter) && 
           (forkliftData.heavydutyairfilters?.length > 0 || forkliftData.heavydutyairfilter?.length > 0) && (
            <Heavydutyairfilters
              heavydutyairfilters={forkliftData.heavydutyairfilters || forkliftData.heavydutyairfilter}
              selectedHeavydutyairfilter={selectedHeavydutyairfilter}
              onHeavydutyairfilterSel={handleHeavydutyairfilterSel}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ForkliftDetail;

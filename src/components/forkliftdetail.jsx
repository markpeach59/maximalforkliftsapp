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
  const handleResetOptions = () => {
    setTotalprice(baseprice);
    // In a full implementation, this would reset all selected options
  };

  // Handler for quote save
  const handleQuoteSave = async () => {
    if (!forkliftData || !user) return;
    
    const quote = {
      userid: user._id,
      model: forkliftData.model,
      price: totalprice,
      markup: markup,
      capacity: forkliftData.capacity,
      engtype: forkliftData.engType,
      powertrain: forkliftData.powertrain,
      baseprice: baseprice
    };
    
    try {
      const response = await savequote(quote);
      navigate(`/quotes/${response.data._id}`);
    } catch (error) {
      console.log("Failed to save quote:", error);
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
    updateTotalPrice(chassis, selectedChassis);
  };

  const handleEngineSel = (engine) => {
    setSelectedEngine(engine);
    updateTotalPrice(engine, selectedEngine);
  };

  const handleMastSel = (mast) => {
    setSelectedMast(mast);
    updateTotalPrice(mast, selectedMast);
  };

  const handleMastSizeSel = (mastSize) => {
    setSelectedMastSize(mastSize);
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
    setSelectedSideShift(sideShift);
    updateTotalPrice(sideShift, selectedSideShift);
  };

  const handleForkpositionerSel = (forkpositioner) => {
    setSelectedForkpositioner(forkpositioner);
    updateTotalPrice(forkpositioner, selectedForkpositioner);
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
          
          <div>
            <strong>
              Quote Price: £{totalprice + parseInt(markup)}
            </strong>
          </div>
          
          <div>
            <QuoteSave onQuoteSave={handleQuoteSave} forklift={{...forkliftData, totalprice, markup}} />
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

          {forkliftData.fork2ds && forkliftData.fork2ds.length > 0 && (
            <Fork2ds
              fork2ds={forkliftData.fork2ds}
              selectedFork2d={selectedFork2d}
              onFork2dSel={handleFork2dSel}
            />
          )}

          {forkliftData.sideshifts && forkliftData.sideshifts.length > 0 && (
            <SideShifts
              sideshifts={forkliftData.sideshifts}
              selectedSideShift={selectedSideShift}
              onSideShiftSel={handleSideShiftSel}
            />
          )}

          {forkliftData.forkpositioners && forkliftData.forkpositioners.length > 0 && (
            <Forkpositioners
              forkpositioners={forkliftData.forkpositioners}
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

          {forkliftData.halolights && forkliftData.halolights.length > 0 && (
            <Halolight
              halolights={forkliftData.halolights}
              selectedHalolight={selectedHalolight}
              onHalolightSel={handleHalolightSel}
            />
          )}

          {forkliftData.safetybluespots && forkliftData.safetybluespots.length > 0 && (
            <Safetybluespot
              safetybluespots={forkliftData.safetybluespots}
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

          {forkliftData.platforms && forkliftData.platforms.length > 0 && (
            <Platforms
              platforms={forkliftData.platforms}
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

          {forkliftData.steerings && forkliftData.steerings.length > 0 && (
            <Steerings
              steerings={forkliftData.steerings}
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

          {forkliftData.stabilisers && forkliftData.stabilisers.length > 0 && (
            <Stabiliser
              stabilisers={forkliftData.stabilisers}
              selectedStabiliser={selectedStabiliser}
              onStabiliserSel={handleStabiliserSel}
            />
          )}

          {forkliftData.liftybuttons && forkliftData.liftybuttons.length > 0 && (
            <Liftybutton
              liftybuttons={forkliftData.liftybuttons}
              selectedLiftybutton={selectedLiftybutton}
              onLiftybuttonSel={handleLiftybuttonSel}
            />
          )}

          {forkliftData.displaywithcameras && forkliftData.displaywithcameras.length > 0 && (
            <Displaywithcamera
              displaywithcameras={forkliftData.displaywithcameras}
              selectedDisplaywithcamera={selectedDisplaywithcamera}
              onDisplaywithcameraSel={handleDisplaywithcameraSel}
            />
          )}

          {forkliftData.pincodes && forkliftData.pincodes.length > 0 && (
            <Pincode
              pincodes={forkliftData.pincodes}
              selectedPincode={selectedPincode}
              onPincodeSel={handlePincodeSel}
            />
          )}

          {forkliftData.loadbackrests && forkliftData.loadbackrests.length > 0 && (
            <Loadbackrests
              loadbackrests={forkliftData.loadbackrests}
              selectedLoadbackrest={selectedLoadbackrest}
              onLoadbackrestSel={handleLoadbackrestSel}
            />
          )}

          {forkliftData.seats && forkliftData.seats.length > 0 && (
            <React.Fragment>
              <Viewseats /><br />
              <Seats
                seats={forkliftData.seats}
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

          {forkliftData.batterys && forkliftData.batterys.length > 0 && (
            <Batterys
              batterys={forkliftData.batterys}
              selectedBattery={selectedBattery}
              onBatterySel={handleBatterySel}
              batteryConstraint={batteryconstraint}
            />
          )}

          {forkliftData.chargers && forkliftData.chargers.length > 0 && (
            <Chargers
              chargers={forkliftData.chargers}
              selectedCharger={selectedCharger}
              onChargerSel={handleChargerSel}
            />
          )}

          {forkliftData.spares && forkliftData.spares.length > 0 && (
            <Sparebatteries
              spares={forkliftData.spares}
              selectedSpare={selectedSpare}
              onSpareSel={handleSpareSel}
            />
          )}

          {forkliftData.bfss && forkliftData.bfss.length > 0 && (
            <Bfs
              bfss={forkliftData.bfss}
              selectedBfs={selectedBfs}
              onBfsSel={handleBfsSel}
            />
          )}

          {forkliftData.trolleys && forkliftData.trolleys.length > 0 && (
            <Trolley
              trolleys={forkliftData.trolleys}
              selectedTrolley={selectedTrolley}
              onTrolleySel={handleTrolleySel}
            />
          )}

          {forkliftData.blinkeys && forkliftData.blinkeys.length > 0 && (
            <Blinkey
              blinkeys={forkliftData.blinkeys}
              selectedBlinkey={selectedBlinkey}
              onBlinkeySel={handleBlinkeySel}
            />
          )}

          {forkliftData.sideextractionbatterys && forkliftData.sideextractionbatterys.length > 0 && (
            <Sideextractionbatterys
              sideextractionbatterys={forkliftData.sideextractionbatterys}
              selectedSideextractionbattery={selectedSideextractionbattery}
              onSideextractionbatterySel={handleSideextractionbatterySel}
            />
          )}

          {forkliftData.cabins && forkliftData.cabins.length > 0 && (
            <Cabins
              cabins={forkliftData.cabins}
              selectedCabin={selectedCabin}
              onCabinSel={handleCabinSel}
              selectedUpsweptexhaust={selectedUpsweptexhaust}
            />
          )}

          {forkliftData.heaters && forkliftData.heaters.length > 0 && (
            <Heaters
              heaters={forkliftData.heaters}
              selectedHeater={selectedHeater}
              onHeaterSel={handleHeaterSel}
            />
          )}

          {forkliftData.aircons && forkliftData.aircons.length > 0 && (
            <Aircons
              aircons={forkliftData.aircons}
              selectedAircon={selectedAircon}
              onAirconSel={handleAirconSel}
            />
          )}

          {forkliftData.upsweptexhausts && forkliftData.upsweptexhausts.length > 0 && (
            <Upsweptexhausts
              upsweptexhausts={forkliftData.upsweptexhausts}
              selectedUpsweptexhaust={selectedUpsweptexhaust}
              onUpsweptexhaustSel={handleUpsweptexhaustSel}
              selectedCabin={selectedCabin}
            />
          )}

          {forkliftData.precleaners && forkliftData.precleaners.length > 0 && (
            <Precleaners
              precleaners={forkliftData.precleaners}
              selectedPrecleaner={selectedPrecleaner}
              onPrecleanerSel={handlePrecleanerSel}
            />
          )}

          {forkliftData.heavydutyairfilters && forkliftData.heavydutyairfilters.length > 0 && (
            <Heavydutyairfilters
              heavydutyairfilters={forkliftData.heavydutyairfilters}
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

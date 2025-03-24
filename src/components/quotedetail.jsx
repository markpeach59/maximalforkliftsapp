import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ForkliftImg from "./forkliftimg";
import {
  getQuoteDetail,
  createOrderFromQuote,
  saveMarkup
} from "../services/quotesService";
import Markup from "./markup";
import Generateorder from "./generateorder";
import "typeface-roboto";

const QuoteDetail = () => {
  const [quoteData, setQuoteData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchQuoteDetail = async () => {
      try {
        const handle = params._id;
        console.log("Quote ID:", handle);
        const { data: forky } = await getQuoteDetail(handle);
        console.log("Quote detail data:", forky);
        console.log("Image name:", forky.imgname);
        console.log("Options:", {
          masttype: forky.masttype,
          mastsize: forky.mastsize,
          forks: forky.forks,
          valve: forky.valve,
          sideshift: forky.sideshift,
          forkpositioner: forky.forkpositioner,
          tyre: forky.tyre
        });
        
        setQuoteData({
          model: forky.model,
          price: forky.price,
          markup: forky.markup,
          saving: forky.saving,
          offerprice: forky.offerprice,
          capacity: forky.capacity,
          engtype: forky.engtype,
          powertrain: forky.powertrain,
          imgName: forky.imgname,
          masttype: forky.masttype,
          mastsize: forky.mastsize,
          closedheight: forky.closedheight,
          freeliftheight: forky.freeliftheight,
          forks: forky.forks,
          valve: forky.valve,
          sideshift: forky.sideshift,
          forkpositioner: forky.forkpositioner,
          pincode: forky.pincode,
          displaywithcamera: forky.displaywithcamera,
          liftybutton: forky.liftybutton,
          roller: forky.roller,
          controller: forky.controller,
          safetybluespot: forky.safetybluespot,
          precleaner: forky.precleaner,
          heavydutyairfilter: forky.heavydutyairfilter,
          halolight: forky.halolight,
          upsweptexhaust: forky.upsweptexhaust,
          tyre: forky.tyre,
          coldstoreprot: forky.coldstoreprot,
          seat: forky.seat,
          cabin: forky.cabin,
          aircon: forky.aircon,
          heater: forky.heater,
          reargrab: forky.reargrab,
          sideleverhydraulic: forky.sideleverhydraulic,
          battery: forky.battery,
          charger: forky.charger,
          spare: forky.spare,
          armguard: forky.armguard,
          platform: forky.platform,
          loadbackrest: forky.loadbackrest,
          steering: forky.steering,
          fork2d: forky.fork2d,
          bfs: forky.bfs,
          trolley: forky.manualtrolley,
          blinkey: forky.blinkey,
          stabiliser: forky.stabiliser,
          sideextractionbattery: forky.sideextractionbattery,
          loadcenter: forky.loadcenter,
          liftcapacity: forky.liftcapacity
        });
      } catch (error) {
        console.error("Error fetching quote details:", error);
      }
    };

    fetchQuoteDetail();
  }, [params._id]);

  const handleMarkup = async (markup) => {
    setQuoteData({ ...quoteData, markup });

    // need to store this back in MongoDB
    const handle = params._id;
    try {
      await saveMarkup(handle, markup);
    } catch(error){
      console.error("Could not save Markup in DB:", error);
      // should be resetting markup to prev value
    }
  };

  const handleCreateOrder = async (ponumber) => {
    // _id of Quote Object
    const handle = params._id;

    console.log("PO", handle, ponumber);
    
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
      await createOrderFromQuote(handle, ponumber);

      // go to specific order page
      console.log('Delaying 2 seconds');
      await delay(2000);
     
      window.location = "/orders/" + handle;
    } catch (error) {
      console.error("Did not create order:", error);
    }
  };

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : null;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>{quoteData.model}</h2>
          {quoteData.imgName && quoteData.imgName.length > 0 ? (
            <ForkliftImg imgName={quoteData.imgName} />
          ) : null}

          <br /> 
          
          {quoteData.engtype ? (quoteData.engtype + " "):null} 
          
          <ConditionalWrapper
            condition={quoteData.powertrain}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.powertrain + " "}
          </ConditionalWrapper>

          Capacity : {quoteData.capacity}Kg 
          <ConditionalWrapper
            condition={quoteData.loadcenter}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.loadcenter
              ? " @" + quoteData.loadcenter + "mm LC"
              : null}
          </ConditionalWrapper>

          <br />
          <ConditionalWrapper
            condition={quoteData.masttype}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.masttype + " "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.mastsize}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.mastsize + "mm"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.closedheight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"," +quoteData.closedheight + "mm Closed"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.freeliftheight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"," + quoteData.freeliftheight + "mm Free Lift"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.valve || quoteData.forks || quoteData.fork2d || quoteData.sideshift || quoteData.forkpositioner}
            wrapper={(children) => (
              <React.Fragment>
                <br />
              </React.Fragment>
            )}
          >
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.valve}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.valve + " Valve, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.forks}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.forks + "mm Forks, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.fork2d}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.fork2d + "mm Forks, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.sideshift}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.sideshift + " Side Shift, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.sideshift === ""}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Shift, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.forkpositioner}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Sideshifting Fork Positioner, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.sideleverhydraulic}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Lever Hydraulic, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.controller}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.controller + " Controller, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.pincode}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Pincode, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.displaywithcamera}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Display with Camera, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.liftybutton}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"2 Sided Lifty Button, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.roller}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.roller + " Roller, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.stabiliser}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            { "Stabiliser Caster Wheel, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.coldstoreprot}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Cold Store Protection, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.tyre}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.tyre + " Tyres"}
          </ConditionalWrapper>
          
          <br />

          <ConditionalWrapper
            condition={quoteData.battery}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.battery + " Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.charger}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.charger + " Charger, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.spare}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.spare + " Spare Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.bfs}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"BFS, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.trolley}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Trolley, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.blinkey}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Blinkey, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.sideextractionbattery}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Extraction Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.armguard}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Arm Guard, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.platform}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Platform, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.loadbackrest}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Load Backrest, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={quoteData.steering}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Electric Steering, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.safetybluespot || quoteData.seat || quoteData.cabin || quoteData.aircon || quoteData.heater}
            wrapper={(children) => (
              <React.Fragment>
                <br />
              </React.Fragment>
            )}
          >
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.halolight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Halo Light, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.safetybluespot}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Safety Blue Spot, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.seat}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.seat + " Seat, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.cabin}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {quoteData.cabin + ", "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.aircon}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Air Con, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.heater}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Heater, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.upsweptexhaust}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Upswept Exhaust, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.precleaner}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Pre Cleaner, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={quoteData.heavydutyairfilter}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Heavy Duty Air Filter, "}
          </ConditionalWrapper>
          
          <br />

          {quoteData.engtype !== "Warehouse" ? (
            <React.Fragment>
              OPS Safety System, Amber Beacon, Reverse Alarm
            </React.Fragment>
          ) : null}
          
          {quoteData.engtype === "Electric" ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}
           
          {(quoteData.engtype === "Diesel" && quoteData.liftcapacity < 6000 ) ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}

          {(quoteData.engtype === "Diesel" ) ? (
            <React.Fragment>
              , Upswept Exhaust
            </React.Fragment>
          ) : null}

          {quoteData.engtype === "LPG" ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}

          {quoteData.engtype === "LPG" ? (
            <React.Fragment>
              , Upswept Exhaust
            </React.Fragment>
          ) : null}

          {quoteData.engtype !== "Warehouse" ? (
            <React.Fragment>
              , Full LED Lighting
            </React.Fragment>
          ) : null}
          <br />
          <br />
          <strong>
            Quote Full Price : £{quoteData.price + parseInt(quoteData.markup || 0)}
          </strong>
          {quoteData.saving ? (
            <React.Fragment>
              <div>
                Saving : £{quoteData.saving}
              </div>
              <div>
                Quote Offer Price : £{quoteData.offerprice + parseInt(quoteData.markup || 0)}
              </div>
            </React.Fragment>
          ):null}

          <br /><strong>Or on a 5 year contract Hire at £ per week<br />
          3 year lease purchase at £  per week</strong>

          <br /><br />

          <Generateorder onOrderCreate={handleCreateOrder} />

          <br />

          <Markup currentMarkup={quoteData.markup} onMarkup={handleMarkup} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default QuoteDetail;

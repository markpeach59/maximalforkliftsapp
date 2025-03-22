import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ForkliftImg from "./forkliftimg";
import { getOrderDetail } from "../services/ordersService";
import "typeface-roboto";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const handle = params._id;
        console.log("Order ID:", handle);
        const { data: forky } = await getOrderDetail(handle);
        console.log("Order detail data:", forky);
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
        
        setOrderData({
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
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetail();
  }, [params._id]);

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : null;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>{orderData.model}</h2>
          {orderData.imgName && orderData.imgName.length > 0 ? (
            <ForkliftImg imgName={orderData.imgName} />
          ) : null}

          <br /> 
          
          {orderData.engtype ? (orderData.engtype + " "):null} 
          
          <ConditionalWrapper
            condition={orderData.powertrain}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.powertrain + " "}
          </ConditionalWrapper>

          Capacity : {orderData.capacity}Kg 
          <ConditionalWrapper
            condition={orderData.loadcenter}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.loadcenter
              ? " @" + orderData.loadcenter + "mm LC"
              : null}
          </ConditionalWrapper>

          <br />
          <ConditionalWrapper
            condition={orderData.masttype}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.masttype + " "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.mastsize}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.mastsize + "mm"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.closedheight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"," +orderData.closedheight + "mm Closed"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.freeliftheight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"," + orderData.freeliftheight + "mm Free Lift"}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.valve || orderData.forks || orderData.fork2d || orderData.sideshift || orderData.forkpositioner}
            wrapper={(children) => (
              <React.Fragment>
                <br />
              </React.Fragment>
            )}
          >
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.valve}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.valve + " Valve, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.forks}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.forks + "mm Forks, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.fork2d}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.fork2d + "mm Forks, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.sideshift}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.sideshift + " Side Shift, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.sideshift === ""}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Shift, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.forkpositioner}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Sideshifting Fork Positioner, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.sideleverhydraulic}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Lever Hydraulic, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.controller}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.controller + " Controller, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.pincode}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Pincode, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.displaywithcamera}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Display with Camera, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.liftybutton}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"2 Sided Lifty Button, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.roller}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.roller + " Roller, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.stabiliser}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            { "Stabiliser Caster Wheel, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.coldstoreprot}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Cold Store Protection, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.tyre}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.tyre + " Tyres"}
          </ConditionalWrapper>
          
          <br />

          <ConditionalWrapper
            condition={orderData.battery}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.battery + " Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.charger}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.charger + " Charger, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.spare}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.spare + " Spare Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.bfs}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"BFS, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.trolley}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Trolley, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.blinkey}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Blinkey, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.sideextractionbattery}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Side Extraction Battery, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.armguard}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Arm Guard, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.platform}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Platform, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.loadbackrest}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Load Backrest, "}
          </ConditionalWrapper>
          <ConditionalWrapper
            condition={orderData.steering}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Electric Steering, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.safetybluespot || orderData.seat || orderData.cabin || orderData.aircon || orderData.heater}
            wrapper={(children) => (
              <React.Fragment>
                <br />
              </React.Fragment>
            )}
          >
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.halolight}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Halo Light, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.safetybluespot}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Safety Blue Spot, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.seat}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.seat + " Seat, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.cabin}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {orderData.cabin + ", "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.aircon}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Air Con, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.heater}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Heater, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.upsweptexhaust}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Upswept Exhaust, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.precleaner}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Pre Cleaner, "}
          </ConditionalWrapper>

          <ConditionalWrapper
            condition={orderData.heavydutyairfilter}
            wrapper={(children) => (
              <React.Fragment>
                {children}
              </React.Fragment>
            )}
          >
            {"Heavy Duty Air Filter, "}
          </ConditionalWrapper>
          
          <br />

          {orderData.engtype !== "Warehouse" ? (
            <React.Fragment>
              OPS Safety System, Amber Beacon, Reverse Alarm
            </React.Fragment>
          ) : null}
          
          {orderData.engtype === "Electric" ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}
           
          {(orderData.engtype === "Diesel" && orderData.liftcapacity < 6000 ) ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}

          {(orderData.engtype === "Diesel" ) ? (
            <React.Fragment>
              , Upswept Exhaust
            </React.Fragment>
          ) : null}

          {orderData.engtype === "LPG" ? (
            <React.Fragment>
              , Rear Grab Handle with Horn
            </React.Fragment>
          ) : null}

          {orderData.engtype === "LPG" ? (
            <React.Fragment>
              , Upswept Exhaust
            </React.Fragment>
          ) : null}

          {orderData.engtype !== "Warehouse" ? (
            <React.Fragment>
              , Full LED Lighting
            </React.Fragment>
          ) : null}
          <br />
          <br />
          <strong>
            Order Price : £{orderData.price + parseInt(orderData.markup || 0)}
          </strong>
          {orderData.saving ? (
            <React.Fragment>
              <div>
                Saving : £{orderData.saving}
              </div>
              <div>
                Order Offer Price : £{orderData.offerprice + parseInt(orderData.markup || 0)}
              </div>
            </React.Fragment>
          ):null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderDetail;

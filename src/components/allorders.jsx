import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../services/allOrdersService";
import { confirmOrder } from "../services/ordersService";
import { getUsers } from "../services/userService";
import { getDealers } from "../services/dealerService";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Confirmorder from "./confirmorder";
import "typeface-roboto";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: ordersData } = await getAllOrders();
        const { data: usersData } = await getUsers();
        const { data: dealersData } = await getDealers();

        setOrders(ordersData);
        setUsers(usersData);
        setDealers(dealersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleConfirmation = async (orderid, stocknumber) => {
    const theorder = _.find(orders, ["_id", orderid]);

    if (theorder === undefined) return;

    console.log("the Order", theorder);
    
    // Create a new array with the updated order
    const updatedOrders = orders.map(order => {
      if (order._id === orderid) {
        return {
          ...order,
          confirmedorder: true,
          stocknumber: stocknumber
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);

    // Store this back in MongoDB
    try {
      await confirmOrder(orderid, stocknumber);
    } catch (error) {
      console.log("Could not Confirm Order ", orderid, " in DB");
      // Should be resetting to previous state
    }
  };

  const dealername = (id) => {
    const ptr = _.find(users, ["_id", id]);

    if (ptr === undefined) return " - ";

    const m = ptr.dealerId;

    if (m === undefined) return " - ";

    const dealer = _.find(dealers, ["_id", m]);
    if (!dealer) return " - ";
    
    return dealer.dealername;
  };

  const username = (id) => {
    const ptr = _.find(users, ["_id", id]);

    if (ptr === undefined) return " - ";

    return ptr.name;
  };

  const emailaddr = (id) => {
    const ptr = _.find(users, ["_id", id]);

    if (ptr === undefined) return " - ";

    return ptr.email;
  };

  const { length: count } = orders;

  if (count === 0) return <p>There are no Orders in the database</p>;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <h2>List of Orders</h2>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dealer</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Offer</TableCell>
                <TableCell align="right">Saving</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Confirmed</TableCell>
                <TableCell align="right">PO#</TableCell>
                <TableCell align="right">Stock#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((x) => (
                <TableRow key={x._id}>
                  <TableCell>
                    <Link to={{ pathname: "/orders/" + x._id }}>
                      <Button>
                        {_.slice(x.updatedAt, 0, 10)}{" "}
                        {_.slice(x.updatedAt, 11, 19)}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    {username(x.userid)}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    {emailaddr(x.userid)}
                  </TableCell>
                  <TableCell align="right"> {dealername(x.userid)}</TableCell>
                  <TableCell align="right"> {x.model}</TableCell>
                  <TableCell align="right">
                    {x.offer ? "Yes" : null}
                  </TableCell>
                  <TableCell align="right">
                    {x.offer ? " £" + x.saving : null}
                  </TableCell>
                  <TableCell align="right">
                    {x.offer ? " £" + (x.price - x.saving) : " £" + x.price}
                  </TableCell>
                  <TableCell align="right">
                    {x.confirmedorder && "YES"}
                    {!x.confirmedorder && (
                      <Confirmorder
                        orderid={x._id}
                        onConfirmorder={handleConfirmation}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {!x.ponumber ? "" : x.ponumber}
                  </TableCell>
                  <TableCell align="right">
                    {!x.stocknumber ? "" : x.stocknumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Orders;

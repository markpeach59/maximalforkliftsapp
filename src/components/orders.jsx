import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../services/ordersService";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import "typeface-roboto";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData } = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

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
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Markup</TableCell>
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
                  <TableCell align="right"> {x.model}</TableCell>
                  <TableCell align="right">
                    {" £"}
                    {x.price}
                  </TableCell>
                  <TableCell align="right">
                    {" £"}
                    {x.markup}
                  </TableCell>
                  <TableCell align="right">
                    {x.offer ? "Yes" : null}
                  </TableCell>
                  <TableCell align="right">
                    {x.offer ? " £" + x.saving : null}
                  </TableCell>
                  <TableCell align="right">
                    {x.offer 
                      ? " £" + (x.price + x.markup - x.saving)
                      : " £" + (x.price + x.markup)}
                  </TableCell>
                  <TableCell align="right">
                    {!x.confirmedorder ? "No" : "Yes"}
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

import React, { useState, useEffect } from "react";
import { getDealers } from "../services/dealerService";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import "typeface-roboto";

const ListAllDealers = () => {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const { data: dealersData } = await getDealers();
        setDealers(dealersData);
      } catch (error) {
        console.error("Error fetching dealers:", error);
        setDealers([]);
      }
    };

    fetchDealers();
  }, []);

  const { length: count } = dealers;

  if (count === 0) return <p>There are no Dealers in the database</p>;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>List of Dealers</h2>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Dealer Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dealers.map((x) => (
                <TableRow key={x._id}>
                  <TableCell align="left">{x.dealername}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ListAllDealers;

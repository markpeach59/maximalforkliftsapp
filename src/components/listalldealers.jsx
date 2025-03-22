//import _ from "lodash";
import React, { Component } from "react";

//import { Link } from "react-router-dom";

import { getDealers } from "../services/dealerService";

import Grid from "@mui/material/Grid";
//import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";

import TableBody from "@mui/material/TableBody";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import "typeface-roboto";

class ListAllDealers extends Component {
  state = {
    dealers: [],
  };

  async componentDidMount() {
    const { data: dealers } = await getDealers();
    //console.log("Dealers Returned", dealers);

    this.setState({
      dealers,
    });
  }

  render() {
    const d = this.state.dealers;

    const { length: count } = this.state.dealers;

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
                {d.map((x) => (
                  <TableRow key={x._id}>
                    <TableCell align="left"> {x.dealername}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ListAllDealers;

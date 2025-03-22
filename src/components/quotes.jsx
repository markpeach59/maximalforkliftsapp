import _ from "lodash";
import React, { Component } from "react";

import { Link } from "react-router-dom";

import { getQuotes } from "../services/quotesService";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
//import TableHead from "@mui/material/TableHead";

import TableBody from "@mui/material/TableBody";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";

import "typeface-roboto";

class Quotes extends Component {
  state = {
    quotes: [],
  };

  async componentDidMount() {
    try {
      console.log("Fetching quotes...");
      const response = await getQuotes();
      console.log("Quotes API Response:", response);
      
      if (response && response.data) {
        console.log("Quotes Returned", response.data);
        this.setState({
          quotes: response.data,
        });
      } else {
        console.error("No data property in response:", response);
        this.setState({ quotes: [] });
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      this.setState({ quotes: [] });
    }
  }

  render() {
    const t = this.state.quotes;
    //console.log("LL", t);

    const { length: count } = this.state.quotes;

    if (count === 0) return <p>There are no quotes in the database</p>;

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>List of Quotes</h2>

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
                </TableRow>
              </TableHead>
              <TableBody>
                {t.map((x) => (
                  <TableRow key={x._id}>
                    <TableCell>
                      <Link to={{ pathname: "/quotes/" + x._id }}>
                        <Button>
                          {_.slice(x.createdAt, 0, 10)}{" "}
                          {_.slice(x.createdAt, 11, 19)}
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
                     
                    {x.offer  ? ( "Yes") : null}
                    </TableCell>

                    <TableCell align="right">
                    {x.offer  ? ( " £" + x.saving) : null}
                    </TableCell>


                    <TableCell align="right">
                    {x.offer  ? (" £" + (x.price + x.markup - x.saving)): (" £" + (x.price + x.markup))}
                    </TableCell>

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

export default Quotes;

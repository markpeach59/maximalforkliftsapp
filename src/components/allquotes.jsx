import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllQuotes } from "../services/allQuotesService";
import { getUsers } from "../services/userService";
import { getDealers } from "../services/dealerService";
import { reassignQuote } from "../services/quotesService";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Reassignquote from "./reassignquote";
import "typeface-roboto";

const AllQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: quotesData } = await getAllQuotes();
        const { data: usersData } = await getUsers();
        const { data: dealersData } = await getDealers();

        setQuotes(quotesData);
        setUsers(usersData);
        setDealers(dealersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReassign = (quoteid, newowner) => {
    const thequote = _.find(quotes, ["_id", quoteid]);

    if (thequote === undefined) return;

    console.log("the Quote", thequote);
    
    // Create a new array with the updated quote
    const updatedQuotes = quotes.map(quote => {
      if (quote._id === quoteid) {
        return {
          ...quote,
          userid: newowner
        };
      }
      return quote;
    });
    
    setQuotes(updatedQuotes);

    // Store this back in MongoDB
    try {
      reassignQuote(quoteid, newowner);
    } catch (error) {
      console.error("Could not reassign quote in DB:", error);
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

  const { length: count } = quotes;

  if (count === 0) return <p>There are no Quotes in the database</p>;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>List of Quotes</h2>

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
                <TableCell align="right">Reassign</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map((x) => (
                <TableRow key={x._id}>
                  <TableCell>
                    <Link to={{ pathname: "/quotes/" + x._id }}>
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
                    <Reassignquote
                      quoteid={x._id}
                      quoteowner={x.userid}
                      users={users}
                      onReassign={handleReassign}
                    />
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

export default AllQuotes;

import _ from "lodash";
import React, { useState, useEffect } from "react";
import { getUsers, assignDealertouser, removeDealerfromuser } from "../services/userService";
import { getDealers } from "../services/dealerService";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Assigndealer from "./assigndealer";
import "typeface-roboto";

const ListAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: usersData } = await getUsers();
        const { data: dealersData } = await getDealers();
        
        setUsers(usersData);
        setDealers(dealersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAssigndealer = (user, newdealerId) => {
    console.log("Assign Dealer Id for - ", user, " to  ", newdealerId);

    if (newdealerId === '') {
      // Create a new array with the updated user
      const updatedUsers = users.map(u => {
        if (u._id === user._id) {
          return { ...u, dealerId: undefined };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      removeDealerfromuser(user._id);
      return;
    }

    // Create a new array with the updated user
    const updatedUsers = users.map(u => {
      if (u._id === user._id) {
        return { ...u, dealerId: newdealerId };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    // Push this to backend if changed
    assignDealertouser(user._id, newdealerId);
  };

  const dealername = (id) => {
    const user = _.find(users, ["_id", id]);
    if (!user || !user.dealerId) return " - ";

    const dealer = _.find(dealers, ["_id", user.dealerId]);
    if (!dealer) return " - ";
    
    return dealer.dealername;
  };

  const { length: count } = users;

  if (count === 0) return <p>There are no Users in the database</p>;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>List of Users</h2>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Dealer</TableCell>
                <TableCell align="right">&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((x) => (
                <TableRow key={x._id}>
                  <TableCell align="right">{x.name}</TableCell>
                  <TableCell align="right">{x.email}</TableCell>
                  <TableCell align="right">{dealername(x._id)}</TableCell>
                  <TableCell align="right">
                    <Assigndealer
                      user={x}
                      dealers={dealers}
                      onAssigndealer={handleAssigndealer}
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

export default ListAllUsers;

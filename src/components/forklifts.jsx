import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ToggleSwitch from "./toggleswitch";
import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";
import EnginesFilter from "./enginesfilter";
import CapacityFilter from "./capacityfilter";
import ResetFilters from "./resetfilters";
import { getForklifts, getRestrictedForklifts } from "../services/forkliftsService";
import { getEngTypes } from "../services/fakeEngTypeFilterService";
import { getCapacityFilters } from "../services/fakeCapacityFilterService";
import "typeface-roboto";

const Forklifts = () => {
  const [forklifts, setForklifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const [user, setUser] = useState(null);
  const [engTypesFilter, setEngTypesFilter] = useState([]);
  const [capacityFilter, setCapacityFilter] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState(undefined);
  const [selectedCapacityFilter, setSelectedCapacityFilter] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.getCurrentUser();
        setUser(currentUser);

        let isrestricted = false;
        const test = localStorage.getItem("restricted");
        if (test) isrestricted = true;

        if (currentUser && currentUser.dealerId) {
          const { data: dealery } = await getDealerDetail(currentUser.dealerId);
          if (dealery.isRestricted) {
            isrestricted = true;
          }
        }

        const eng = getEngTypes(isrestricted);
        const cap = getCapacityFilters();

        let engFilIndex = parseInt(localStorage.getItem("selectedEngineIndex"));
        let capFilIndex = parseInt(localStorage.getItem("selectedCapacityFilterIndex"));

        if (isrestricted) {
          localStorage.setItem("restricted", "true");
          const { data: forklifts2 } = await getRestrictedForklifts();
          
          setForklifts(forklifts2);
          setEngTypesFilter(eng);
          setCapacityFilter(cap);
          setSelectedEngine(!isNaN(engFilIndex) ? eng[engFilIndex] : undefined);
          setSelectedCapacityFilter(!isNaN(capFilIndex) ? cap[capFilIndex] : undefined);
          setLoading(false);
          setRestricted(true);
        } else {
          const { data: forkliftsData } = await getForklifts();
          
          setForklifts(forkliftsData);
          setEngTypesFilter(eng);
          setCapacityFilter(cap);
          setSelectedEngine(!isNaN(engFilIndex) ? eng[engFilIndex] : undefined);
          setSelectedCapacityFilter(!isNaN(capFilIndex) ? cap[capFilIndex] : undefined);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTheme = async () => {
    // Remove any indexes
    localStorage.removeItem("selectedEngineIndex");
    localStorage.removeItem("selectedCapacityFilterIndex");
    
    const now = !restricted;
    const isrestricted = now;
    
    if (now) {
      localStorage.setItem("restricted", "true");
      const { data: forklifts2 } = await getRestrictedForklifts();
      
      setForklifts(forklifts2);
      setEngTypesFilter(getEngTypes(isrestricted));
      setCapacityFilter(getCapacityFilters());
      setSelectedEngine(undefined);
      setSelectedCapacityFilter(undefined);
      setLoading(false);
      setRestricted(now);
    } else {
      localStorage.removeItem("restricted");
      const { data: forklifts2 } = await getForklifts();
      
      setForklifts(forklifts2);
      setEngTypesFilter(getEngTypes(isrestricted));
      setCapacityFilter(getCapacityFilters());
      setSelectedEngine(undefined);
      setSelectedCapacityFilter(undefined);
      setLoading(false);
      setRestricted(now);
    }
  };

  const handleResetFilters = () => {
    localStorage.removeItem("selectedEngineIndex");
    localStorage.removeItem("selectedCapacityFilterIndex");

    setSelectedEngine(undefined);
    setSelectedCapacityFilter(undefined);
  };

  const handleCapFilter = (capfilter, index) => {
    localStorage.setItem("selectedCapacityFilterIndex", index);
    setSelectedCapacityFilter(capfilter);
  };

  const handleEngineSel = (engine, index) => {
    localStorage.setItem("selectedEngineIndex", index);
    setSelectedEngine(engine);
  };

  const filterModels = (models) => {
    /* filter for capacity - then engtype */
    const mseng = selectedEngine
      ? models.filter((m) => m.engType === selectedEngine.name)
      : models;

    // this is hardcoding tolerances for the capacity filter to pick up immediate cap values
    var catchment = 100;
    if (selectedCapacityFilter && selectedCapacityFilter.capFilter > 1500) {
      catchment = 100;
    }

    const mscap = selectedCapacityFilter
      ? mseng.filter(
          (m) =>
            m.capacity <= selectedCapacityFilter.capFilter &&
            m.capacity > selectedCapacityFilter.capFilter - catchment
        )
      : mseng;

    return mscap;
  };

  const filterEng = (forkliftsData) => {
    var g = [];

    if (!selectedEngine && !selectedCapacityFilter) {
      return forkliftsData;
    }

    /* if any filters set - need to create a filtered clone */
    /* filter values.models within each range */
    Object.entries(forkliftsData).forEach(
      ([key, values]) =>
        (g[key] = {
          range: values.range,
          models: filterModels(values.models),
        })
    );

    /* remove any ranges that have zero models meeting the criteria */
    const tt = g.filter((x) => x.models.length > 0);

    return tt;
  };

  const t = filterEng(forklifts);
  const { length: count } = forklifts;

  // until we get data from the REST API - we in Loading State
  if (loading) return <p>Loading ...</p>;

  if (count === 0) return <p>There are no forklifts in the database</p>;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          {user && (user.isAdmin || user.isMaximGB) && (
            <React.Fragment>
              <ToggleSwitch onToggle={toggleTheme} />
            </React.Fragment>
          )}
        </Grid>
        <Grid>
          {user && (user.isAdmin || user.isMaximGB) && !restricted && "Normal Pricing"}
          {user && (user.isAdmin || user.isMaximGB) && restricted && (
            <React.Fragment>
              <Typography variant="h4">For Briggs Personel Only</Typography>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {Object.entries(t).map(([key, values]) => (
            <React.Fragment key={key}>
              <Typography variant="h6">{values.range} Range</Typography>

              {values.models.map((g) => (
                <div key={g._id}>
                  <Link to={{ pathname: "/forkliftdetail/" + g.model }}>
                    <Button>{g.model}</Button>
                  </Link>{" "}
                  {g.capacity} {g.engType}
                </div>
              ))}
            </React.Fragment>
          ))}
        </Grid>
        <Grid item xs={6}>
          <ResetFilters onResetFilters={handleResetFilters} />

          <EnginesFilter
            engines={engTypesFilter}
            onEngineSel={handleEngineSel}
            selectedEngine={selectedEngine}
          />

          <CapacityFilter
            capacityfilters={capacityFilter}
            onCapacityFilterSel={handleCapFilter}
            selectedCapacityFilter={selectedCapacityFilter}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Forklifts;

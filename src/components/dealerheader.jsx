import React, { useState, useEffect } from "react";
import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";
import "typeface-roboto";

const DealerHeader = () => {
  const [headerlogo, setHeaderlogo] = useState("/img/Maximal-Logo.png");

  useEffect(() => {
    const fetchDealerLogo = async () => {
      try {
        const user = auth.getCurrentUser();

        if (user && user.dealerId) {
          const { data: dealery } = await getDealerDetail(user.dealerId);

          if (dealery.dealerlogo) {
            console.log("got logo");
            setHeaderlogo(dealery.dealerlogo);
          }
        }
      } catch (error) {
        console.error("Error fetching dealer logo:", error);
      }
    };

    fetchDealerLogo();
  }, []);

  return (
    <React.Fragment>
      <img
        src={headerlogo}
        alt=""
        style={{ width: 300, paddingTop: 90, paddingBottom: 40 }}
      />
    </React.Fragment>
  );
};

export default DealerHeader;

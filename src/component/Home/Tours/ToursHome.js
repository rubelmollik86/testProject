import React, { useEffect, useState } from "react";
import Tours from "./Tours";

const ToursHome = () => {
  const [availablePac, setAvailablePac] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/tourpackage/allpackage`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        const availableTourData = data?.allTourPackages?.filter((data) => {
          return data?.Showpackage === true;
        });
        setAvailablePac(availableTourData);
      });
  }, []);
  return (
    <div>
      <Tours isloading={isloading} availablePac={availablePac} />
    </div>
  );
};

export default ToursHome;

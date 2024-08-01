const responseHandler = (res, setFlightData, setErrorMsg, emptyMessage) => {
  setFlightData(res);
  if (res.length === 0) {
    setErrorMsg(emptyMessage);
  }
};

const errorHandler = (error, setLoading, setErrorMsg) => {
  setLoading(false);
  setErrorMsg("Ups! Something went wrong! Try again");
  console.log(error);
};

export const fetchByFlightNumber = async (
  flight,
  setFlightData,
  setErrorMsg,
  setLoading
) => {
  try {
    const response = await fetch("api/get-flight/" + flight, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    responseHandler(
      res,
      setFlightData,
      setErrorMsg,
      "No flights with this number found! Please try again"
    );
  } catch (error) {
    errorHandler(error, setLoading, setErrorMsg);
  }
};

export const fetchByDepartureAirport = async (
  departureAirport,
  setFlightData,
  setErrorMsg,
  setLoading
) => {
  try {
    const response = await fetch(
      "api/get-departure-airport/" + departureAirport,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    responseHandler(
      res,
      setFlightData,
      setErrorMsg,
      "No such airport found! Make sure you enter the IATA code"
    );
  } catch (error) {
    errorHandler(error, setLoading, setErrorMsg);
  }
};

export const fetchByArrivalAirport = async (
  arrivalAirport,
  setFlightData,
  setErrorMsg,
  setLoading
) => {
  try {
    const response = await fetch("api/get-arrival-airport/" + arrivalAirport, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    responseHandler(
      res,
      setFlightData,
      setErrorMsg,
      "No such airport found! Make sure you enter the IATA code"
    );
  } catch (error) {
    errorHandler(error, setLoading, setErrorMsg);
  }
};

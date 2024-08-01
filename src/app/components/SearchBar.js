"use client";

import { useEffect, useState } from "react";

import { PiAirplaneTiltFill } from "react-icons/pi";

import SearchForm from "./SearchForm";
import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";
import FlightResults from "./FlightResults";

const SearchBar = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [query, setQuery] = useState({
    flight: "",
    departureAirport: "",
    arrivalAirport: "",
  });
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const flightChangeHandler = (e) => {
    setFlightNumber(e.target.value);
  };

  const departureAirportChangeHandler = (e) => {
    setDepartureAirport(e.target.value);
  };

  const arrivalAirportChangeHandler = (e) => {
    setArrivalAirport(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      (flightNumber && (departureAirport || arrivalAirport)) ||
      (!flightNumber && !departureAirport && !arrivalAirport) ||
      (departureAirport && arrivalAirport)
    ) {
      alert("Please fill in only one field");
    } else if (flightNumber) {
      setQuery({
        flight: flightNumber,
        departureAirport: "",
        arrivalAirport: "",
      });
    } else if (departureAirport) {
      setQuery({
        flight: "",
        departureAirport: departureAirport,
        arrivalAirport: "",
      });
    } else if (arrivalAirport) {
      setQuery({
        flight: "",
        departureAirport: "",
        arrivalAirport: arrivalAirport,
      });
    }
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      setLoading(true);
      setErrorMsg("");

      // BY FLIGHT NUMBER
      if (query.flight) {
        const flight = query.flight;

        try {
          const response = await fetch("api/get-flight/" + flight, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const res = await response.json();

          setFlightData(res);

          if (res.length == 0) {
            setErrorMsg("No flights with this number found! Please try again");
          }
        } catch (error) {
          setLoading(false);
          setErrorMsg("Ups! Something went wrong! Try again");
          console.log(error);
        }

        setFlightNumber("");
      }

      // BY DEPARTURE AIRPORT
      if (query.departureAirport) {
        const departureAirport = query.departureAirport;

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

          setFlightData(res);

          if (res.length == 0) {
            setErrorMsg(
              "No such airport found! Make sure you enter the IATA code"
            );
          }
        } catch (error) {
          setLoading(false);
          setErrorMsg("Ups! Something went wrong! Try again");
          console.log(error);
        }

        setDepartureAirport("");
      }

      // BY ARRIVAL AIRPORT
      if (query.arrivalAirport) {
        const arrivalAirport = query.arrivalAirport;

        try {
          const response = await fetch(
            "api/get-arrival-airport/" + arrivalAirport,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const res = await response.json();

          setFlightData(res);

          if (res.length == 0) {
            setErrorMsg(
              "No such airport found! Make sure you enter the IATA code"
            );
          }
        } catch (error) {
          setLoading(false);
          setErrorMsg("Ups! Something went wrong! Try again");
          console.log(error);
        }

        setArrivalAirport("");
      }

      setLoading(false);
    };

    fetchFlightData();
  }, [query]);

  return (
    <div>
      {/* Search bar */}
      <div className="flex justify-center items-center font-medium text-lg text-gray-900 px-4">
        <p className="text-center pr-2">
          When searching, fill out only one field at a time
        </p>
        <PiAirplaneTiltFill className="hidden md:visible md:block md:text-3xl" />
      </div>

      <SearchForm
        flightNumber={flightNumber}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        flightChangeHandler={flightChangeHandler}
        departureAirportChangeHandler={departureAirportChangeHandler}
        arrivalAirportChangeHandler={arrivalAirportChangeHandler}
        submitHandler={submitHandler}
      />

      {loading && !errorMsg && <Loading />}
      {errorMsg && !loading && <ErrorMsg message={errorMsg} />}

      {flightData && flightData.length > 0 && !loading && (
        <FlightResults flightData={flightData} />
      )}
    </div>
  );
};

export default SearchBar;

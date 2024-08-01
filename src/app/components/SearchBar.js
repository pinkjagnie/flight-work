"use client";

import { useEffect, useState } from "react";

import { PiAirplaneTiltFill } from "react-icons/pi";
import { SlMagnifier } from "react-icons/sl";

import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";
import ByFlightDetails from "./ByFlightDetails";

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
      <form
        className="w-[90%] md:w-[80%] py-10 mt-10 mx-auto rounded-md bg-gray-600 flex flex-col items-center justify-center"
        onSubmit={submitHandler}
      >
        {/* SINGLE FLIGHT */}
        <div className="w-[100%] flex items-center justify-center">
          <input
            type="search"
            name="searchFlight"
            placeholder="Search for flight"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={flightNumber}
            onChange={flightChangeHandler}
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
        <p className="italic text-xs font-medium text-stone-100 self-start pl-[3rem] md:pl-[5rem] lg:pl-[6rem] xl:pl-[8rem] pt-2">
          Search by flight number
        </p>

        {/* AIRPORT SEARCH */}
        <div className="w-[100%] flex items-center justify-center pt-10">
          <input
            type="search"
            name="searchAirport"
            placeholder="Search for departure airport"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={departureAirport}
            onChange={departureAirportChangeHandler}
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
        <p className="italic text-xs font-medium text-stone-100 self-start pl-[3rem] md:pl-[5rem] lg:pl-[6rem] xl:pl-[8rem] pt-2">
          Search by IATA code
        </p>

        {/* -> ARRIVAL */}
        <div className="w-[100%] flex items-center justify-center pt-10">
          <input
            type="search"
            name="searchAirport"
            placeholder="Search for arrival airport"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={arrivalAirport}
            onChange={arrivalAirportChangeHandler}
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
        <p className="italic text-xs font-medium text-stone-100 self-start pl-[3rem] md:pl-[5rem] lg:pl-[6rem] xl:pl-[8rem] pt-2">
          Search by IATA code
        </p>
      </form>

      {loading && !errorMsg && <Loading />}
      {errorMsg && !loading && <ErrorMsg message={errorMsg} />}

      {flightData && flightData.length > 0 && !loading && (
        <div className="grid grid-row gap-y-8 mt-10">
          {flightData.map((flight) => {
            return (
              <div key={flight.flight.iata}>
                <ByFlightDetails flight={flight} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

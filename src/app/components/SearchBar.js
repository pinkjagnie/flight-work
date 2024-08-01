"use client";

import { useEffect, useState } from "react";

import { SlMagnifier } from "react-icons/sl";

import ByFlightDetails from "./ByFlightDetails";

const SearchBar = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [query, setQuery] = useState({ flight: "", departureAirport: "" });
  const [flightData, setFlightData] = useState(null);

  const flightChangeHandler = (e) => {
    setFlightNumber(e.target.value);
  };

  const departureAirportChangeHandler = (e) => {
    setDepartureAirport(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      (flightNumber && departureAirport) ||
      (!flightNumber && !departureAirport)
    ) {
      alert("Please fill in only one field");
    } else if (flightNumber) {
      setQuery({ flight: flightNumber, departureAirport: "" });
    } else if (departureAirport) {
      setQuery({ flight: "", departureAirport: departureAirport });
    }
  };

  useEffect(() => {
    const fetchFlightData = async () => {
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
        } catch (error) {
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
        } catch (error) {
          console.log(error);
        }

        setDepartureAirport("");
      }
    };

    fetchFlightData();
  }, [query]);

  return (
    <div>
      {/* Search bar */}
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
      </form>

      {flightData && flightData.length > 0 && (
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

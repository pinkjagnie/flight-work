"use client";

import { useEffect, useState } from "react";

import { SlMagnifier } from "react-icons/sl";

const SearchBar = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("");
  const [query, setQuery] = useState({ flight: "", airport: "" });
  const [flightData, setFlightData] = useState(null);

  const flightChangeHandler = (e) => {
    setFlightNumber(e.target.value);
  };

  const airportChangeHandler = (e) => {
    setAirport(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if ((flightNumber && airport) || (!flightNumber && !airport)) {
      alert("Please fill in only one field");
    } else if (flightNumber) {
      setQuery({ flight: flightNumber, airport: "" });
    } else if (airport) {
      setQuery({ flight: "", airport: airport });
    }
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      if (query.flight) {
        // TBD - search by flight number

        const flight = query.flight;

        try {
          const response = await fetch("api/get-flight/" + flight, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const res = await response.json();

          console.log("WYYYYYYYYYYYNIIIIIIIIIIIIIK " + res[0].flight_date);

          setFlightData(res);
        } catch (error) {
          console.log(error);
        }

        console.log("Searching flight:", query.flight);

        setFlightNumber("");
      }

      if (query.airport) {
        // TBD - search by airport
        console.log("Searching airport:", query.airport);
        setAirport("");
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
            placeholder="Search for airport"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={airport}
            onChange={airportChangeHandler}
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
      </form>

      {flightData && flightData.length > 0 && (
        <div>
          {flightData.map((flight) => {
            return (
              <>
                <div>{flight.flight_date}</div>
                <p>{flight.departure.airport}</p>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

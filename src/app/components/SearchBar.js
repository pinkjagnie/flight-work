"use client";

import { useState } from "react";

import { SlMagnifier } from "react-icons/sl";

const SearchBar = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if ((flightNumber && airport) || (!flightNumber && !airport)) {
      alert("Please fill in only one field");
    } else if (flightNumber) {
      console.log("Searching flight:", flightNumber);
      // TBD - search by flight number
      setFlightNumber("");
    } else if (airport) {
      console.log("Searching airport:", airport);
      // TBD - search by airport
      setAirport("");
    }
  };

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
            onChange={(e) => setFlightNumber(e.target.value)}
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
            onChange={(e) => setAirport(e.target.value)}
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

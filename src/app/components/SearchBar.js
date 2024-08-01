import { SlMagnifier } from "react-icons/sl";

const SearchBar = () => {
  return (
    <div>
      {/* Search bar */}
      <div className="w-[90%] md:w-[80%] py-10 mt-10 mx-auto rounded-md bg-gray-600 flex flex-col items-center justify-center">
        {/* SINGLE FLIGHT */}
        <div className="w-[100%] flex items-center justify-center pb-10">
          <input
            type="search"
            name="searchFlight"
            placeholder="Search for flight"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>

        {/* AIRPORT SEARCH */}
        <div className="w-[100%] flex items-center justify-center">
          <input
            type="search"
            name="searchAirport"
            placeholder="Search for airport"
            className="bg-gray-100 text-gray-700 w-[80%] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <button type="submit" className="-ml-12">
            <SlMagnifier size={30} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

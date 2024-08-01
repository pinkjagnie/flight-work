import { format, parseISO } from "date-fns";

import { IoIosAirplane } from "react-icons/io";

const ByFlightDetails = ({ flight }) => {
  const dateFormat = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const timeFormat = (timeString) => {
    const date = parseISO(timeString);
    return format(date, "HH:mm");
  };

  return (
    <div key={flight.flight.iata}>
      <div className="card rounded bg-base-100 shadow-xl lg:w-[80%] mx-auto">
        <div className="card-body p-0 lg:flex-row">
          <div className="flex flex-col lg:basis-1/3">
            <div className="bg-gray-800 text-stone-100 text-center rounded-t py-4">
              <h2 className="text-[1.5rem] font-bold">
                Flight - {flight.flight.iata}
              </h2>
              <span className="font-medium pt-4">{flight.airline.name}</span>
            </div>
            <div className="bg-gray-800 text-stone-100 p-4 lg:h-[100%] lg:rounded-b">
              <p className="pb-2">Flight date: {flight.flight_date}</p>
              <p className="pb-2">Flight status: {flight.flight_status}</p>
              <p className="pb-2">Flight number: {flight.flight.number}</p>
              <p className="pb-2">IATA: {flight.flight.iata}</p>
            </div>
          </div>

          {/* AIRPORT STAMP */}
          <div className="hidden lg:visible lg:block lg:absolute lg:w-[6rem] lg:h-[6rem] lg:top-[calc(50%-3rem)] lg:left-[calc(30%-1rem)] xl:w-[10rem] xl:h-[10rem] xl:top-[calc(50%-5rem)] xl:left-[calc(30%-3rem)] lg:rounded-full lg:bg-stone-100">
            <IoIosAirplane className="lg:text-[5rem] lg:font-bold lg:text-gray-800 lg:relative lg:top-[calc(50%-2.5rem)] lg:left-[calc(50%-2.5rem)] xl:text-[9rem] xl:top-[calc(50%-4.5rem)] xl:left-[calc(50%-4.5rem)]" />
          </div>

          {/* MORE DETAILS OF FLIGHT */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-stone-100 lg:basis-2/3">
            {/* DEPARTURE */}
            <div className="flex flex-col justify-between items-center text-center">
              <div className="text-gray-500">{flight.departure.iata}</div>
              <div className="text-lg font-semibold shrink">
                {flight.departure.airport}
              </div>
              <div className="text-gray-500">
                {dateFormat(flight.departure.scheduled)}
              </div>
            </div>
            {/* ARRIVAL */}
            <div className="flex flex-col justify-between items-center text-center">
              <div className="text-gray-500">{flight.arrival.iata}</div>
              <div className="text-lg font-semibold shrink">
                {flight.arrival.airport}
              </div>
              <div className="text-gray-500">
                {dateFormat(flight.arrival.scheduled)}
              </div>
            </div>

            {/* MORE SPECIFICS */}
            {/* SCHEDULED */}
            <div className="text-center pt-4">
              <div className="uppercase text-gray-500">scheduled</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.departure.scheduled)}
              </div>
            </div>
            <div className="text-center pt-4">
              <div className="uppercase text-gray-500">scheduled</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.arrival.scheduled)}
              </div>
            </div>
            {/* ESTIMATED */}
            <div className="text-center pt-4 pb-4">
              <div className="uppercase text-gray-500">estimated</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.departure.estimated)}
              </div>
            </div>
            <div className="text-center pt-4 pb-4">
              <div className="uppercase text-gray-500">estimated</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.arrival.estimated)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByFlightDetails;

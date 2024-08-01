import { format, parseISO } from "date-fns";

// import { IoIosAirplane } from "react-icons/io";

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
      <div className="card rounded bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="flex flex-col">
            <div className="bg-gray-800 text-stone-100 text-center rounded-t py-4">
              <h2 className="text-[1.5rem] font-bold">
                Flight - {flight.flight.iata}
              </h2>
              <span className="font-medium pt-4">{flight.airline.name}</span>
            </div>
            <div className="bg-gray-800 text-stone-100 p-4">
              <p className="pb-2">Flight date: {flight.flight_date}</p>
              <p className="pb-2">Flight status: {flight.flight_status}</p>
              <p className="pb-2">Flight number: {flight.flight.number}</p>
              <p className="pb-2">IATA: {flight.flight.iata}</p>
            </div>
          </div>

          {/* MORE DETAILS OF FLIGHT */}
          <div className="grid grid-cols-2 gap-2 p-4">
            {/* DEPARTURE */}
            <div className="flex flex-col justify-between items-center mb-4">
              <div className="text-center">
                <div className="text-gray-500">{flight.departure.iata}</div>
                <div className="text-lg font-semibold">
                  {flight.departure.airport}
                </div>
                <div className="text-gray-500">
                  {dateFormat(flight.departure.scheduled)}
                </div>
              </div>
            </div>
            {/* ARRIVAL */}
            <div className="flex flex-col justify-between mb-2">
              <div className="text-center">
                <div className="text-gray-500">{flight.arrival.iata}</div>
                <div className="text-lg font-semibold">
                  {flight.arrival.airport}
                </div>
                <div className="text-gray-500">
                  {dateFormat(flight.arrival.scheduled)}
                </div>
              </div>
            </div>

            {/* MORE SPECIFICS */}
            {/* DEPARTURE */}
            <div className="text-center pt-4">
              <div className="text-gray-500">SCHEDULED</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.departure.scheduled)}
              </div>
            </div>
            <div className="text-center pt-4 pb-4">
              <div className="text-gray-500">ESTIMATED</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.departure.estimated)}
              </div>
            </div>
            {/* ARRIVAL */}
            <div className="text-center pt-4">
              <div className="text-gray-500">SCHEDULED</div>
              <div className="text-lg font-semibold">
                {timeFormat(flight.arrival.scheduled)}
              </div>
            </div>
            <div className="text-center pt-4 pb-4">
              <div className="text-gray-500">ESTIMATED</div>
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

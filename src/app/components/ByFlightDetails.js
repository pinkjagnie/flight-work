import { IoMdAirplane } from "react-icons/io";

const ByFlightDetails = ({ flight }) => {
  return (
    <div key={flight.flight.iata}>
      <div className="card-side rounded bg-base-100 shadow-xl">
        <figure>
          <IoMdAirplane className="text-xl text-gray-600" />
        </figure>
        <div className="card-body grow">
          <h2 className="card-title">Flight - {flight.flight.iata}</h2>
          <p>Flight date: {flight.flight_date}</p>
          <p>Flight status: {flight.flight_status}</p>
          <p>
            Departure from: {flight.departure.airport} (
            {flight.departure.timezone})
          </p>
          <p>
            Arrival to: {flight.arrival.airport} ({flight.arrival.timezone})
          </p>
          <p>Airline: {flight.airline.name}</p>
          <p>Flight number: {flight.flight.number}</p>
          <p>IATA: {flight.flight.iata}</p>
        </div>
      </div>
    </div>
  );
};

export default ByFlightDetails;

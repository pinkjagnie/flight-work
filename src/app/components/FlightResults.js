import ByFlightDetails from "./ByFlightDetails";

const FlightResults = ({ flightData }) => {
  return (
    <div className="grid grid-row gap-y-8 mt-10">
      {flightData.map((flight) => (
        <div key={flight.flight.iata}>
          <ByFlightDetails flight={flight} />
        </div>
      ))}
    </div>
  );
};

export default FlightResults;

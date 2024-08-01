import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  if (req.method !== "GET") {
    return;
  }

  const departureAirport = params.departureAirport;

  const url =
    "http://api.aviationstack.com/v1/flights?access_key=" +
    process.env.NEXT_APP_API_KEY +
    "&dep_iata=" +
    departureAirport;

  try {
    const response = await fetch(url);
    const res = await response.json();

    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return Response.error({ message: "Ups, something went wrong" });
  }
}

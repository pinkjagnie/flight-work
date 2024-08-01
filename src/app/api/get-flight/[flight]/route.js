import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  if (req.method !== "GET") {
    return;
  }

  const flight = params.flight;

  const url =
    "http://api.aviationstack.com/v1/flights?access_key=" +
    process.env.NEXT_APP_API_KEY +
    "&flight_number=" +
    flight;

  try {
    const response = await fetch(url);
    const res = await response.json();

    console.log(res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return Response.error({ message: "Ups, something went wrong" });
  }
}

export async function GET(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
  } catch (error) {
    console.log(error);
    return Response.error({ message: "Ups, something went wrong" });
  }
}

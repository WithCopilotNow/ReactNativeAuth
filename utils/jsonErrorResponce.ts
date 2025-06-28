
export function jsonErrorResponce(message: string, statusCode = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  const response = await fetch(`${process.env.API}/occasions`);

  const payload: APIResponse<PaginatedResponse<{ occasions: Occasions[] }>> = await response.json();

  if ("error" in payload) throw new Error(payload.error);

  return Response.json(payload, {
    status: response.status,
  });
}

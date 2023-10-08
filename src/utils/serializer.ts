export function serializeResponse<Response>(result: Response): Response {
  return JSON.parse(JSON.stringify(result));
}

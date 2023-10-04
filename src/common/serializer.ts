import { Static, TSchema } from '@sinclair/typebox';

export function serializeResponse<Response extends TSchema>(
  result: unknown,
): Static<Response> {
  return JSON.parse(JSON.stringify(result));
}

export type ContactResult =
  | { status: 'success' }
  | { status: 'invalid'; errors: Record<string, string> }
  | { status: 'unavailable' };

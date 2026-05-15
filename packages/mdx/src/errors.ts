export interface MdxValidationError {
  field: string;
  message: string;
}

export class MdxParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MdxParseError";
  }
}

export function formatMdxValidationError(error: MdxValidationError) {
  return `${error.field} - ${error.message}`;
}

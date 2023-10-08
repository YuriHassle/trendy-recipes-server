export default class ValidationMessage {
  static format(field: string) {
    return `${field} is invalid`;
  }
  static minLength(field: string, length: number) {
    return `${field} must be at least ${length} characters`;
  }
}

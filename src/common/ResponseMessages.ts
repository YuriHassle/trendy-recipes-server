export default class ValidationMessage {
  static delete(entity: string, id: number) {
    return `${entity} with id ${id} was successfully deleted.`;
  }
}

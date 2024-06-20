export interface CrudEntityModel {
  get: Function;
  save: Function;
  update: Function;
  delete: Function;
  deleteMany: Function;
}

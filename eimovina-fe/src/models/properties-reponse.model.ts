import { Property } from "./property.model";

interface GetProperties {
  properties: Property[];
}
export interface PropertiesResponse {
  getProperties: GetProperties;
}

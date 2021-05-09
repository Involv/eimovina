import { Object } from "./object.model";
export interface Property {
  id: string;
  realEstateListNumber: string;
  plotNumber: string;
  objects: Object[];
}

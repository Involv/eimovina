import { Loan } from "./loan.model";
import { Object } from "./object.model";
import { PlotPart } from "./plot-part.model";
import { RightHolder } from "./right-holder.model";
export interface Property {
  id: string;
  realEstateListNumber: string;
  plotNumber: string;
  objects: Object[];
  plotParts: PlotPart[];
  rightHolders: RightHolder[];
  loans: Loan[];
  address: string;
  isFavorite?: boolean;
}

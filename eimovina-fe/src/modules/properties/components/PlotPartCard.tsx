import { FC } from "react";
import { PlotPart } from "../../../models/plot-part.model";

interface PlotPartCardProps {
  plotPart: PlotPart;
}
export const PlotPartCard: FC<PlotPartCardProps> = ({
  plotPart: { usagePurpose, buildingNumber, address, area, entryDate },
}) => {
  return (
    <div className="bg-white border border-gray-50 shadow-sm max-w-sm rounded-lg overflow-hidden relative">
      <div className="px-6 py-4">
        <div className="flex flex-col w-2/4">
          <span>{usagePurpose || "-"}</span>
          <span className="flex items-center text-gray-500 leading-7">
            Način korišćenja
          </span>
        </div>
        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{address.trim() || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Potes/ Ulica i kucni broj
            </span>
          </div>
          <div className="flex flex-col w-2/4">
            <span>{area ? `${area}m2` : "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Površina
            </span>
          </div>
        </div>

        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{buildingNumber || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Broj zgrade
            </span>
          </div>

          <div className="flex flex-col">
            <span>{entryDate || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Datum upisa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

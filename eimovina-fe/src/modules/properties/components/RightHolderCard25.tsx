import { FC } from "react";
import { RightHolder } from "../../../models/right-holder.model";

interface RightHolderCardProps {
  rightHolder: RightHolder;
}
export const RightHolderCard: FC<RightHolderCardProps> = ({
  rightHolder: { name, rightsScope, rightsType },
}) => {
  return (
    <div className="bg-white border border-gray-50 shadow-sm max-w-sm rounded-lg overflow-hidden relative">
      <div className="px-6 py-4">
        <div className="flex flex-col w-2/4">
          <span>{name || "-"}</span>
          <span className="flex items-center text-gray-500 leading-7">
            Ime/ Naziv
          </span>
        </div>
        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{rightsScope || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Obim prava
            </span>
          </div>
          <div className="flex flex-col">
            <span>{rightsType || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Vrsta prava
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

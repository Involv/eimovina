import React, { FC } from "react";
import { Property } from "../../../models/property.model";
import { Object } from "../../../models/object.model";

interface ResultCardProps {
  property: Property;
}
export const ResultCard: FC<ResultCardProps> = ({ property }) => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            <div>Nepokretni list: {property.realEstateListNumber || "-"}</div>
            <div>Broj parcele: {property.plotNumber || "-"}</div>
          </div>
          <div className="text-gray-700 text-base">
            {property.objects &&
              property.objects.map((object: Object, index: number) => (
                <div key={index} className="mt-3">
                  <div>area: {object.area}</div>
                  <div>roomCount: {object.roomCount}</div>
                  <div>usagePurpose: {object.usagePurpose}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

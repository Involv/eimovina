import React, { FC } from "react";
import { Property } from "../../../models/property.model";
import { Object } from "../../../models/object.model";
import { LocationMarkerIcon, MapIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";

interface ResultCardProps {
  property: Property;
}
export const ResultCard: FC<ResultCardProps> = ({ property }) => {
  const objectArea = property.objects?.reduce(
    (acc, { area }) => acc + +area,
    0
  );
  return (
    <div className="bg-white border border-gray-50 shadow-sm max-w-sm rounded-lg overflow-hidden relative">
      <div className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-purple-600">
              {property.realEstateListNumber || "-"}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider leading-7">
              Nepokretni list
            </span>
          </div>
          <div className="flex flex-col ml-8">
            <span className="text-xl font-bold text-purple-600">
              {property.plotNumber || "-"}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider leading-7">
              Broj parcele
            </span>
          </div>
        </div>
        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{property.address || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              <LocationMarkerIcon className="w-4" />
              Adresa
            </span>
          </div>
          <div className="flex flex-col">
            <span>{objectArea ? `${objectArea}m2` : "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              <MapIcon className="w-4" />
              Površina
            </span>
          </div>
        </div>
        {/* <div className="text-gray-700 text-base">
          {property.objects &&
            property.objects.map((object: Object, index: number) => (
              <div key={index} className="mt-3">
                <div>area: {object.area}</div>
                <div>roomCount: {object.roomCount}</div>
                <div>usagePurpose: {object.usagePurpose}</div>
              </div>
            ))}
        </div> */}
      </div>
      {property.isFavorite && (
        <BookmarkIcon className="absolute top-0 right-6 text-purple-700 w-8" />
      )}
    </div>
  );
};

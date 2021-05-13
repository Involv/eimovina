import { FC } from "react";
import { Object } from "../../../models/object.model";

interface ObjectCardProps {
  object: Object;
}
export const ObjectCard: FC<ObjectCardProps> = ({
  object: {
    usagePurpose,
    objectNumber,
    buildingNumber,
    storey,
    address,
    area,
    roomCount,
  },
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
            <span>{objectNumber || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              PD
            </span>
          </div>
          <div className="flex flex-col">
            <span>{roomCount}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Sobnost
            </span>
          </div>
        </div>

        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{address.trim() || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Adresa
            </span>
          </div>
          <div className="flex flex-col w-2/4">
            <span>{buildingNumber || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Broj zgrade
            </span>
          </div>
        </div>
        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{area ? `${area}m2` : "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Površina
            </span>
          </div>
          <div className="flex flex-col">
            <span>{storey || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Spratnost/s sprat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

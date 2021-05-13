import { FC } from "react";
import { Loan } from "../../../models/loan.model";

interface LoanCardProps {
  loan: Loan;
}
export const LoanCard: FC<LoanCardProps> = ({
  loan: { usagePurpose, buildingNumber, serialNumber, description },
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
            <span>{serialNumber || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Redni broj
            </span>
          </div>
          <div className="flex flex-col">
            <span>{buildingNumber}</span>
            <span className="flex items-center text-gray-500 leading-7">
              Broj zgrade
            </span>
          </div>
        </div>

        <div className="flex items-center mt-5">
          <div className="flex flex-col w-2/4">
            <span>{description || "-"}</span>
            <span className="flex items-center text-gray-500 leading-7">
              opis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

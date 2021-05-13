import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PropertyResponse } from "../../../models/property-response.model";
import { AuthorizationContext } from "../../authentification/components/Authorization";
import {
  DocumentTextIcon,
  StarIcon,
  LocationMarkerIcon,
  UsersIcon,
  MapIcon,
  OfficeBuildingIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/outline";
import { StarIcon as PopulatedStarIcon } from "@heroicons/react/solid";
import { Tabs } from "../../../components/Tabs";
import { Loan } from "../../../models/loan.model";
import { LoanCard } from "../components/LoanCard";
import { Object } from "../../../models/object.model";
import { ObjectCard } from "../components/ObjectCard";
import { RightHolder } from "../../../models/right-holder.model";
import { PlotPartCard } from "../components/PlotPartCard";
import { PlotPart } from "../../../models/plot-part.model";
import { RightHolderCard } from "../components/RightHolderCard25";
import { TabInterface } from "../../../models/tabs.interface";

const FETCH_PROPERTY_QUERY = gql`
  query MyQuery($id: ID!) {
    getProperty(id: $id) {
      id
      realEstateListNumber
      plotNumber
      address
      area
      loans {
        usagePurpose
        serialNumber
        loanNumber
        description
        buildingNumber
      }
      rightHolders {
        name
        rightsScope
        rightsType
      }
      objects {
        roomCount
        usagePurpose
        objectNumber
        buildingNumber
        storey
        area
        address
      }
      plotParts {
        usagePurpose
        area
        buildingNumber
        address
        entryDate
      }
    }
  }
`;

const FAVORIZE_PROPERTY = gql`
  mutation UpdateFavoritePropertyId($propertyId: String!) {
    updateFavoritePropertyId(propertyId: $propertyId) {
      createdAt
      favoritePropertyIds
      id
      lastUpdatedAt
    }
  }
`;

enum PropertyTabs {
  rightHolders = 0,
  plotParts = 1,
  objects = 2,
  loans = 3,
}

const tabs: TabInterface[] = [
  { name: "Nosioci prava", icon: UsersIcon, code: PropertyTabs.rightHolders },
  { name: "Parcele", icon: MapIcon, code: PropertyTabs.plotParts },
  { name: "Objekti", icon: OfficeBuildingIcon, code: PropertyTabs.objects },
  { name: "Tereti", icon: CurrencyEuroIcon, code: PropertyTabs.loans },
];

export const Property = () => {
  const { id } = useParams<any>();

  const {
    data: { getProperty: property = null } = {},
    loading,
    error,
  } = useQuery<PropertyResponse, { id: string }>(FETCH_PROPERTY_QUERY, {
    variables: { id },
  });

  const {
    loans = [],
    rightHolders = [],
    plotParts = [],
    objects = [],
  } = property || {};

  const isFavorite = false;

  const [favorizeProperty, { data }] = useMutation(FAVORIZE_PROPERTY);

  const { user } = useContext(AuthorizationContext);

  const [activeTab, setActiveTab] = useState<number>(0);

  const onFavorizeProperty = () => {
    favorizeProperty({ variables: { propertyId: id } });
  };

  const handleTabClick = (type: PropertyTabs) => setActiveTab(type);

  return (
    <div className="h-full p-6">
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="flex items-center justify-between px-8 pt-8">
          <div className="flex items-center">
            <DocumentTextIcon className="w-14 text-purple-300 mr-6" />
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-700">
                  {property?.realEstateListNumber || "-"}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider leading-7">
                  Nepokretni list
                </span>
              </div>
              <div className="flex flex-col ml-8">
                <span className="text-xl font-bold text-gray-700">
                  {property?.plotNumber || "-"}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider leading-7">
                  Broj parcele
                </span>
              </div>
            </div>
          </div>

          {user && (
            <div
              onClick={onFavorizeProperty}
              className="flex items-center cursor-pointer text-purple-700 bg-purple-200 py-2 px-4 rounded hover:bg-purple-50 hover:text-purple-500"
            >
              {isFavorite ? (
                <PopulatedStarIcon className="w-8" />
              ) : (
                <StarIcon className="w-8" />
              )}
              <span className="text-sm font-bold ml-2 uppercase tracking-wider">
                {isFavorite ? "Fazvorizuj" : "Ukloni iz favorizovanih"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-4 px-8">
          <span className="text-lg">{property?.address?.trim() || "-"}</span>
          <span className="flex items-center text-gray-700 leading-7">
            <LocationMarkerIcon className="w-4" />
            Adresa
          </span>
        </div>

        <div className="mt-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onClickHandler={(index: number) => handleTabClick(index)}
          />

          <div className="px-8 py-4 bg-gray-200">
            {activeTab === PropertyTabs.rightHolders && (
              <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
                  {loans.length > 0 &&
                    loans.map((loan: Loan, index: number) => (
                      <LoanCard loan={loan} key={index}></LoanCard>
                    ))}
                </div>
                {loans?.length === 0 && (
                  <div className="h-1/2 flex items-center justify-center w-full text-gray-400 text-lg">
                    Nema rezultata
                  </div>
                )}
              </>
            )}

            {activeTab === PropertyTabs.plotParts && (
              <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
                  {objects.length > 0 &&
                    objects.map((object: Object, index: number) => (
                      <ObjectCard object={object} key={index}></ObjectCard>
                    ))}
                </div>
                {objects?.length === 0 && (
                  <div className="h-1/2 flex items-center justify-center w-full text-gray-400 text-lg">
                    Nema rezultata
                  </div>
                )}
              </>
            )}

            {activeTab === PropertyTabs.objects && (
              <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
                  {rightHolders.length > 0 &&
                    rightHolders.map(
                      (rightHolder: RightHolder, index: number) => (
                        <RightHolderCard
                          rightHolder={rightHolder}
                          key={index}
                        ></RightHolderCard>
                      )
                    )}
                </div>
                {rightHolders?.length === 0 && (
                  <div className="h-1/2 flex items-center justify-center w-full text-gray-400 text-lg">
                    Nema rezultata
                  </div>
                )}
              </>
            )}

            {activeTab === PropertyTabs.loans && (
              <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
                  {plotParts.length > 0 &&
                    plotParts.map((plotPart: PlotPart, index: number) => (
                      <PlotPartCard
                        plotPart={plotPart}
                        key={index}
                      ></PlotPartCard>
                    ))}
                </div>
                {plotParts?.length === 0 && (
                  <div className="h-1/2 flex items-center justify-center w-full text-gray-400 text-lg">
                    Nema rezultata
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

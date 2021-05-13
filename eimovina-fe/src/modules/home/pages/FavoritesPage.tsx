import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Property } from "../../../models/property.model";
import { ResultCard } from "../components/ResultCard";
import { Link } from "react-router-dom";
import { FavoritePropertiesResponse } from "../../../models/favorite-properties.response";
import { EmptyAsset, EmptyAssetTypes } from "../../../components/EmptyAsset";

const FETCH_FAVORITE_PROPERTIES = gql`
  query GetUserFavoriteProperties {
    getUserFavoriteProperties {
      id
      realEstateListNumber
      plotNumber
      objects {
        area
        roomCount
        usagePurpose
      }
    }
  }
`;

export const FavoritesPage = () => {
  const {
    data: { getUserFavoriteProperties: favoriteProperties = null } = {},
    loading,
    error,
  } = useQuery<FavoritePropertiesResponse>(FETCH_FAVORITE_PROPERTIES, {
    fetchPolicy: "network-only",
  });

  return (
    <div className="h-full px-3 lg:px-6 py-6">
      <h1 className="mt-4 mb-3 text-xl lg:text-2xl font-light text-purple-700 tracking-wide">
        Favorizovani listovi nepokretnosti
      </h1>
      {loading && <div>Fetching data...</div>}
      {error && <div>Error: {error}</div>}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
        {favoriteProperties &&
          favoriteProperties.length > 0 &&
          favoriteProperties.map((property: Property, index: number) => (
            <Link to={`/property/${property.id}`} key={index}>
              <ResultCard property={property}></ResultCard>
            </Link>
          ))}
      </div>

      {!favoriteProperties ||
        (favoriteProperties.length === 0 && (
          <EmptyAsset type={EmptyAssetTypes.FAVORITE} />
        ))}
    </div>
  );
};

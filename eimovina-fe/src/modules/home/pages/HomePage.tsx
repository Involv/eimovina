import React, { useContext, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { PropertiesResponse } from "./../../../models/properties-reponse.model";
import { SearchBar } from "../../../components/SearchBar";
import { Property } from "../../../models/property.model";
import { ResultCard } from "../components/ResultCard";
import { AuthorizationContext } from "../../authentification/components/Authorization";
import { LocalStorageKeys } from "../../authentification/enums/local-storage-keysenum.";
import { Link } from "react-router-dom";
import { FavoritePropertiesResponse } from "../../../models/favorite-properties.response";

const FETCH_PROPERTIES_QUERY = gql`
  query MyQuery($limit: Int!, $search: String!) {
    getProperties(limit: $limit, search: $search) {
      properties {
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
  }
`;

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

const UPDATE_USER = gql`
  mutation UpdateUser {
    updateUser {
      name
    }
  }
`;

export const HomePage = () => {
  const [
    fetchProperties,
    {
      data: { getProperties: { properties = null } = {} } = {},
      loading: loadingProperties,
      error: errorProperties,
    },
  ] = useLazyQuery<PropertiesResponse, { search: string; limit: number }>(
    FETCH_PROPERTIES_QUERY,
    {
      variables: { search: "", limit: 10 },
    }
  );

  const {
    data: { getUserFavoriteProperties: favoriteProperties = null } = {},
    loading: loadingFavProperties,
    error: errorFavProperties,
  } = useQuery<FavoritePropertiesResponse>(FETCH_FAVORITE_PROPERTIES);

  const { user } = useContext(AuthorizationContext);

  const [updateUser, { data }] = useMutation(UPDATE_USER);
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);
  const [showUserUpdatedMessage, setShowUserUpdatedMessage] = useState<boolean>(
    false
  );

  const onSearchSubmit = (searchTerm: string) => {
    fetchProperties({ variables: { search: searchTerm, limit: 10 } });
    setIsSearchTriggered(true);
  };

  const onUpdateUserClick = () => {
    const userId = user?.getUsername();
    updateUser({ variables: { userId } });
    setShowUserUpdatedMessage(true);
    setTimeout(() => setShowUserUpdatedMessage(false), 3000);
  };

  return (
    <div className="h-full p-6">
      <SearchBar onSearchSubmit={onSearchSubmit}></SearchBar>

      {loadingProperties && <div>Fetching data...</div>}
      {errorProperties && <div>Error: {errorProperties}</div>}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8 mt-4">
        {properties &&
          properties.length > 0 &&
          properties.map((property: Property, index: number) => (
            <Link to={`/property/${property.id}`} key={index}>
              <ResultCard property={property}></ResultCard>
            </Link>
          ))}
      </div>

      {isSearchTriggered && properties && properties?.length === 0 && (
        <div className="h-1/2 flex items-center justify-center w-full text-gray-400 text-lg">
          Nema rezultata
        </div>
      )}

      {user && (
        <>
          <div className="mt-10">
            <button
              className="bg-blue-400 hover:bg-blue-500 rounded text-white p-2 pl-4 pr-4"
              onClick={onUpdateUserClick}
            >
              <p className="font-semibold text-s text-uppercase">
                Ažuriraj korisnika
              </p>
            </button>

            {showUserUpdatedMessage && (
              <div className="text-green-400 mt-6 ml-3">
                Korisnik je uspješno ažuriran!
              </div>
            )}
          </div>

          <div>
            <h1 className="mt-4 mb-3 text-lg font-bold text-gray-700">
              Favorizovani listovi nepokretnosti
            </h1>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 gap-y-8">
              {favoriteProperties &&
                favoriteProperties.length > 0 &&
                favoriteProperties.map((property: Property, index: number) => (
                  <Link to={`/property/${property.id}`} key={index}>
                    <ResultCard property={property}></ResultCard>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

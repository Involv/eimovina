import { gql, useQuery, useMutation } from "@apollo/client";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PropertyResponse } from "../../../models/property-response.model";
import { AuthorizationContext } from "../../authentification/components/Authorization";

const FETCH_PROPERTY_QUERY = gql`
  query MyQuery($id: ID!) {
    getProperty(id: $id) {
      id
      realEstateListNumber
      area
      address
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

export const Property = () => {
  const { id } = useParams<any>();

  const {
    data: { getProperty: property = null } = {},
    loading,
    error,
  } = useQuery<PropertyResponse, { id: string }>(FETCH_PROPERTY_QUERY, {
    variables: { id },
  });

  const [favorizeProperty, { data }] = useMutation(FAVORIZE_PROPERTY);

  const { user } = useContext(AuthorizationContext);

  const onFavorizeProperty = () => {
    favorizeProperty({ variables: { propertyId: id } });
  };
  return (
    <div className="h-full p-6">
      <h2 className="text-large">Property</h2>
      <div>{property?.realEstateListNumber}</div>
      <div>{property?.id}</div>
      {/* <div>{property?.address}</div> */}

      {user && (
        <button
          className="bg-blue-400 hover:bg-blue-500 rounded text-white p-2 pl-4 pr-4"
          onClick={onFavorizeProperty}
        >
          <p className="font-semibold text-s text-uppercase">
            Favorizuj nepokretni list
          </p>
        </button>
      )}
    </div>
  );
};

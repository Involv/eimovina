import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PropertyResponse } from "../../../models/property-response.model";

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

export const Property = () => {
  const { id } = useParams<any>();

  const {
    data: { getProperty: property = null } = {},
    loading,
    error,
  } = useQuery<PropertyResponse, { id: string }>(FETCH_PROPERTY_QUERY, {
    variables: { id },
  });
  return (
    <div className="h-full">
      <h2>Property</h2>
      <div>{property?.realEstateListNumber}</div>
      <div>{property?.id}</div>
      {/* <div>{property?.address}</div> */}
    </div>
  );
};

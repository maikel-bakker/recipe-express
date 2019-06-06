import { gql } from "apollo-server-core";

export const IngredientType = gql`
    type Ingredient {
        _id: String!,
        name: String!,
        type: String!
    }

    input IngredientInput {
        name: String!,
        type: String!
    }
`;

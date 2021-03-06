import { gql } from "apollo-server-core";

export const IngredientAmountType = gql`
    type IngredientAmount {
        _id: String!,
        ingredient: Ingredient!,
        amount: Float!,
        amountUnit: String!
    }

    input IngredientAmountInput {
        ingredient: IngredientInput!,
        amount: Float!,
        amountUnit: String!
    }
`;

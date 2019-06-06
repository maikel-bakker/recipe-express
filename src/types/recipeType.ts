import { gql } from "apollo-server-core";

export const RecipeType = gql`
    type Recipe {
        _id: String!,
        title: String!,
        description: String!,
        serves: Float!,
        cookTime: Float!,
        imageUrl: String,
        ingredientAmounts: [IngredientAmount],
        steps: [String],
        createdAt: String!,
        updatedAt: String!,
    }

    input RecipeInput {
        title: String!,
        description: String!,
        serves: Float!,
        cookTime: Float!,
        imageUrl: String,
        ingredientAmounts: [IngredientAmountInput],
        steps: [String]
    }
`;

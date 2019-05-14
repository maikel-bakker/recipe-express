import { gql } from "apollo-server-core";

export const RecipeType = gql`
    type Recipe {
        _id: String!,
        title: String!,
        description: String!,
        serves: Float!,
        cookTime: Float,
        difficulty: Float,
        ingredientAmounts: [IngredientAmount],
        steps: [String],
        createdAt: String!,
        updatedAt: String!,
    }
`;

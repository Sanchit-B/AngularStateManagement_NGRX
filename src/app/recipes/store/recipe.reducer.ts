import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.action';

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: []
}

export function RecipeReducer(state: State = initialState, action: RecipeActions.RecipeActions) {
  switch(action.type) {
    case RecipeActions.SET_RECIPE:
      // console.log({
      //   ...state,
      //   recipes: [...action.payload]
      // });

      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipeActions.UPDATE_RECIPE:
      const copy: State = JSON.parse(JSON.stringify(state));
      copy.recipes[action.payload.index] = action.payload.newRecipe;
      return {
        ...copy
      }
    case RecipeActions.DELETE_RECIPE:
      const deleteRecipes: State = JSON.parse(JSON.stringify(state));
      deleteRecipes.recipes.splice(action.payload, 1);
      return {
        ...deleteRecipes
      }
    default:
      return state;
  }
}

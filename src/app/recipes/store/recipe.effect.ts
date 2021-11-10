import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as fromApp from '../../store/app.reducer';
import { Recipe } from "../recipe.model";
import * as RecipeActions from '../store/recipe.action';

@Injectable()
export class RecipeEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}

    @Effect()
    allRecipes = this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http
        .get<Recipe[]>(
            'https://ng-complete-guide-9d733-default-rtdb.firebaseio.com//recipes.json'
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipeActions.SetRecipes(recipes)
      })
    )

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPE),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipesState]) => {
      return this.http
      .put(
        'https://ng-complete-guide-9d733-default-rtdb.firebaseio.com//recipes.json',
        recipesState.recipes
      )
    })
  )
}

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipesModel } from "src/app/_share/models/recipes.model";
import { DataStorageService } from "../_share/services/data-storage.service";
import { RecipesService } from "./recipes.service";



@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService  {
 constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService){}

 /** no data-storage, iremos fazzer aqui, para protejer a rota */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const localRecipes = this.recipesService.r
    // if () {

    // }
    return this.dataStorageService.fetchRecipesWithAuthAndInterceptor();
  }




}

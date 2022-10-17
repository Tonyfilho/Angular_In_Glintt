import { IngredientsModel } from 'src/assets/models/ingredients.model';

export class RecipesModel {
  public name:string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientsModel[];

  constructor(name:string, description:string, imagePath:string, ingredients: IngredientsModel[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

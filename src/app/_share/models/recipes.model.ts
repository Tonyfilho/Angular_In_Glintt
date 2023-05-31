import { IngredientsModel } from 'src/app/_share/models/ingredients.model';

export class RecipesModel {
  public id?: number;
  public name:string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientsModel[];

  constructor(id: number, name:string, description:string, imagePath:string, ingredients: IngredientsModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

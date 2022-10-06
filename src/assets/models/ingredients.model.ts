
export class IngredientsModel {
  // Obs: para usar a shortCurt Não temos Atributos, ele já estão no construtor
  // public name: string;
  // public amount: number;

  // ou Assim ou Convencional ou da forma short
  // constructor(Ingredients: { name: string; amount: number; }){
  //   this.name = Ingredients.name;
  //   this.amount = Ingredients.amount;
  // }
  constructor(public name: string, public amount: number ){

  }
}

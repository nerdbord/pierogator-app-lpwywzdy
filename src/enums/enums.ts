export enum LockIconType {
   locked = 'locked',
   unlocked = 'unlocked',
}

export enum ButtonType {
   Primary = 'primary',
   Secondary = 'secondary',
}

export enum HeaderType {
   machine = 'machine',
   store = 'store',
}

export enum IngredType {
   ciasto = 'Ciasto',
   nadzienie = 'Nadzienie',
   skladniki = 'Składniki',
}

export type Ingredient = {
   name: string;
   quantity: string;
};

export type PierogObject = {
   author: string;
   imageSrc: string;
   name: string;
   __v: number;
   _id: string;
   ingredients: {
      dough: Ingredient[];
      filling: Ingredient[];
   };
   instructions: {
      dough_preparation: string[];
      filling_preparation: string[];
      forming_and_cooking_dumplings: string[];
      serving: string[];
   };
};

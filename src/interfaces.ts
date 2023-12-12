export interface PierogData {
   name: string;
   imageSrc: string;
   ingredients: {
      dough: { name: string; quantity: string }[];
      filling: { name: string; quantity: string }[];
   };
   instructions: {
      dough_preparation: string[];
      filling_preparation: string[];
      forming_and_cooking_dumplings: string[];
      serving: string[];
   };
}

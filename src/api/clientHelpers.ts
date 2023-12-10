import { IngredType } from '../enums/enums';

export const ingredientsMessagesHelper = (ingredient: IngredType) => {
   switch (ingredient) {
      case IngredType.ciasto:
         return [
            {
               role: 'system',
               content: 'Podaj pomysł bezpośrednio, bez zbędnych rozwinięć.',
            },
            {
               role: 'user',
               content: `podaj wymyślny pomysł na ciasto do pierogów`,
            },
         ];
      case IngredType.nadzienie:
         return [
            {
               role: 'system',
               content: 'Podaj pomysł bezpośrednio, bez zbędnych rozwinięć.',
            },
            {
               role: 'user',
               content: `podaj wymyślny pomysł na farsz do pierogów`,
            },
         ];

      case IngredType.skladniki:
         return [
            {
               role: 'system',
               content: 'Masz wymienić tylko konkretne składniki, bez odpisywania całym zdaniem.',
            },
            {
               role: 'system',
               content: 'Zakazane składniki: mąka, jaja, woda, sól',
            },
            {
               role: 'user',
               content: `coś dziwnego jako składniki do pierogów`,
            },
         ];
   }
};

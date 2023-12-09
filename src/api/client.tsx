import { IngredType } from '../enums/enums';

const apiToken = import.meta.env.VITE_API_TOKEN;

export const generateAIText = async (ingredient: IngredType) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions';
   const headers = {
      Authorization: apiToken,
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messagesHelper(ingredient),
            max_tokens: 20,
            temperature: 1,
         }),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      } else {
         return await response.json();
      }
   } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
   }
};

const messagesHelper = (ingredient: IngredType) => {
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

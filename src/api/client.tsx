import { IngredType } from '../enums/enums';
import { ingredientsMessagesHelper } from './clientHelpers';

const openAIapiToken = import.meta.env.VITE_GPT_TOKEN;
// const nerdyApiToken = import.meta.env.VITE_NERDY_TOKEN;

export const generateAIText = async (ingredient: IngredType) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions';
   const headers = {
      Authorization: openAIapiToken,
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: ingredientsMessagesHelper(ingredient),
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

interface IngredientValues {
   dough: string;
   filling: string;
   ingreds: string;
}

export const generateAIImage = async (values: IngredientValues) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/images/generations';
   const headers = {
      Authorization: openAIapiToken,
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
            model: 'dall-e-3',
            prompt: `tależ z pierogami, w których ciasto jest: "${
               values.dough || 'tradycyjne'
            }"; farsz jest: "${
               values.filling || 'tradycyjny'
            }"; a składniki użyte w przepisie to: "${values.ingreds || 'zwyczajowe składniki'}"`,
            n: 1,
            size: '1024x1024',
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

interface recipeInfo {
   dough: string;
   filling: string;
   ingreds: string;
   additonalInfo: string;
}

export const generateAIRecipe = async (allIngredients: recipeInfo) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions';
   const headers = {
      Authorization: openAIapiToken,
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
               {
                  role: 'system',
                  content: `Podaj tylko składniki do wykonania ${allIngredients.dough} w formie listy numerowanej.`,
               },
               {
                  role: 'user',
                  content: `Podaj składniki do wykonania ${allIngredients.dough}`,
               },
            ],
            // max_tokens: 20,
            // temperature: 1,

            // returns
            // "1. 500 g mąki pszennej
            // 2. 250 ml ciepłej wody
            // 3. 3 jajka
            // 4. 1 łyżeczka soli
            // 5. 2 łyżki oleju roślinnego
            // 6. 150 g masła, schłodzonego i pokrojonego na małe kawałki
            // 7. 100 g orzechów włoskich, posiekanych
            // 8. 100 g cukru brązowego
            // 9. 1 łyżka cynamonu
            // 10. 1 łyżka mąki
            // 11. 1 szczypta soli"
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

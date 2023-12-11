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
            max_tokens: 50,
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

export const generateAIRecipeIngredients = async (description: string, ingred: IngredType) => {
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
                  // content: `Podaj tylko składniki wraz z ilościami w formie listy numerowanej.`,
                  content: `Podaj tylko składniki wraz z ilościami w formie obiektu: 
                  "${ingred === 'Nadzienie' ? 'filling' : 'dough'}": [
                     {"name": nazwa składnika, "quantity": "ilość"},
                  ]`,
               },
               {
                  role: 'user',
                  content: `Podaj składniki do wykonania ${ingred} do pierogów, zgodnie z następującym opisem: ${
                     description || 'tradycyjne'
                  }`,
               },
            ],
            max_tokens: 200,
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

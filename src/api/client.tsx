import { IngredType } from '../enums/enums';
import { ingredientsMessagesHelper } from './clientHelpers';

const openAIapiToken = import.meta.env.VITE_API_TOKEN;
const nerdyApiToken = import.meta.env.NERDY_API_TOKEN;

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

export const getAllPierogi = async () => {
   const apiURL = 'https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes';
   return fetch(apiURL)
      .then((response) => {
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
      })
      .catch((error) => {
         console.error('Error fetching data:', error);
      });
};

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

export const generateAIRecipeIngredients = async (
   description: string,
   ingred: IngredType,
   additionalInfo: string,
) => {
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
                  content: `Podaj tylko składniki wraz z ilościami w formie tablicy obiektów Java Script, nie wstawiaj znaków nowej lini: ${JSON.stringify(
                     [{ name: 'nazwa składnika', quantity: 'ilość składnika' }],
                  )}`,
               },
               {
                  role: 'system',
                  content: `podaj maksymalnie 5 składników. nie używaj znaków nowej linii. ${
                     additionalInfo ? 'dodatkowe uwagi: ' + additionalInfo : ''
                  }`,
               },
               {
                  role: 'user',
                  content: `Podaj składniki do wykonania ${
                     ingred || 'ciasta'
                  } do pierogów, zgodnie z następującym opisem: ${description || 'tradycyjne'}`,
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

export const generateAIRecipePreparation = async (
   description: string,
   ingred: IngredType,
   additionalInfo: string,
) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions';
   const headers = {
      Authorization: openAIapiToken,
      'Content-Type': 'application/json',
   };

   const specificIngredient = () => {
      switch (ingred) {
         case IngredType.ciasto:
            return `Podaj instrukcję do przygotowania ciasta do pierogów ${
               description ? 'zgodnie z następującym opisem: ' + description : ''
            }`;
         case IngredType.nadzienie:
            return `Podaj instrukcję do przygotowania farszu do pierogów ${
               description ? 'zgodnie z następującym opisem: ' + description : ''
            }`;
         default:
            return `Podaj instrukcje do formowania i gotowania pierogów`;
      }
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
                  content: `Podaj tylko kroki instrukcji oddzielone znakiem nowej linii`,
               },
               {
                  role: 'system',
                  content: `podaj maksymalnie 4 kroki instrukcji`,
               },
               {
                  role: 'system',
                  content: `każdy krok instrukcji ma maksymalnie 15 znaków`,
               },
               {
                  role: 'system',
                  content: `nie numeruj kroków`,
               },
               {
                  role: 'system',
                  content: `${
                     additionalInfo ? ' dodatkowe uwagi do przepisu: ' + additionalInfo : ''
                  }`,
               },
               {
                  role: 'user',
                  content: specificIngredient(),
               },
            ],
            max_tokens: 150,
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

export const generateAIRecipeServing = async (description: string, additionalInfo: string) => {
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
                  content: `Podaj tylko krótki opis, bez zbędnych rozwinięć.`,
               },
               {
                  role: 'system',
                  content: `${additionalInfo ? ' dodatkowe uwagi: ' + additionalInfo : ''}, .`,
               },
               {
                  role: 'user',
                  content: `Podaj sposób podawania pierogów ugotowanych według następującego opisu: ${
                     description ? description : 'tradycyjne pierogi'
                  }`,
               },
            ],
            max_tokens: 150,
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

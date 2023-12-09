import { IngredType } from "../enums/enums";

export const generateAIText = async (ingredient: IngredType) => {
   const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions';
   const headers = {
      Authorization: 'secret-token',
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
                  content:
                     'Masz wymienić tylko konkretne składniki, bez odpisywania całym zdaniem.',
               },
               {
                  role: 'system',
                  content: 'Zakazane składniki: mąka, jaja, woda, sól',
               },
               {
                  role: 'user',
                  content: `coś dziwnego jako ${ingredient} do pierogów`,
               },
            ],
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

/**
   * curl https://training.nerdbord.io/api/v1/openai/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: $TEAM_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'

   */

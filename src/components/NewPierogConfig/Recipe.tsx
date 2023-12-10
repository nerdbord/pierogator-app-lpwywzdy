interface RecipeProps {
   inputValues: {
      dough: string;
      filling: string;
      ingreds: string;
   };
   nameSettings: {
      value: string;
      setter: React.Dispatch<React.SetStateAction<string>>;
   };
}

const Recipe = (props: RecipeProps) => {
   return <></>;
};

export default Recipe;

import { useState } from "react";
import { ButtonType } from "../../enums/enums";
import Button from "../UI/Button";
import Loader from "../UI/Loader";
import DumplingIcon from "../icons/DumplingIcon";
import styles from "./NewPierog.module.css"

interface PierogImageProps {
   inputValues: {
      dough: string;
      filling: string;
      ingreds: string;
   };
}

const PierogImage = (props: PierogImageProps) => {

    const [isGenerating, setIsGenerating] = useState(false);


    const handleGenerate = () =>{

    }
    
   return (
      <>
         {' '}
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Pieróg
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {isGenerating && <Loader />}
               <Button type={ButtonType.Secondary} onClick={handleGenerate}>
                  Generuj
               </Button>
            </div>
         </div>
      </>
   );
};

export default PierogImage;

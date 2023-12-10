import { PierogObject } from "../../enums/enums";
import DumplingIcon from "../icons/DumplingIcon";
import PierogThumbnail from "./PierogThumbnail";
import styles from "./Pierogarania.module.css"


interface UserPierogiProps{
    pierogiDatabase: PierogObject[];
}

const UserPierogi = (props: UserPierogiProps) => {

    

    return (      <>
        <div className={styles.formHeader}>
           <h2>
              <DumplingIcon /> Moje pierogi {}
           </h2>
        </div>
       <div className={styles.thumbnailWrapper}>
           {props.pierogiDatabase && props.pierogiDatabase.map((pierog, i) => {
               return (<PierogThumbnail pierog={pierog} editable={true} key={i}/>)
           })}
       </div>
     </>)
}

export default UserPierogi
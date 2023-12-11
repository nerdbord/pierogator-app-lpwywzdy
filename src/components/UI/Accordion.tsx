import { ReactNode, useState } from 'react';
import styles from './Accordion.module.css';
import ArrowIcon from '../icons/ArrowIcon';

interface AccordionProps {
   title: string;
   children: ReactNode;
}

const Accordion = (props: AccordionProps) => {
   const [accordionOpen, setAccordionOpen] = useState(false);

   const handleOpen = () => {
      setAccordionOpen((prevOpen) => !prevOpen);
   };
   return (
      <section className={styles.wrapper}>
         <div className={styles.titleWrapper} onClick={handleOpen}>
            <p>{props.title}</p>
            <ArrowIcon isOpen={accordionOpen} />
         </div>
         {accordionOpen && <div className={styles.accordionContent}>{props.children}</div>}
      </section>
   );
};

export default Accordion;

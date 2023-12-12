import styles from './ArrowIcon.module.css';

const ArrowIcon = (props: { isOpen: boolean }) => {
   const className = props.isOpen ? styles.isClosed : styles.isOpen;
   return (
      <svg
         className={className}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
      >
         <path d="M18 14L12 8L6 14" stroke="#969696" strokeLinecap="round" />
      </svg>
   );
};

export default ArrowIcon;

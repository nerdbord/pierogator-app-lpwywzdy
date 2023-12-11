import { LockIconType } from '../../enums/enums';

interface LockIconProps {
   type: LockIconType;
}

const LockIcon = (props: LockIconProps) => {
   if (props.type == LockIconType.unlocked) {
      return (
         <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <rect width="34" height="34" rx="17" fill="#E8E8E8" />
            <path
               d="M20.75 16.25V12.5158C20.75 10.5138 19.127 8.89081 17.125 8.89081H17.0092C15.0711 8.89081 13.4109 10.4594 13.25 12.3908V12.3908"
               stroke="#002902"
               strokeLinecap="round"
            />
            <rect
               x="11.75"
               y="16.25"
               width="10.5"
               height="7.5"
               rx="1"
               stroke="#002902"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      );
   } else {
      return (
         <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <rect width="34" height="34" rx="17" fill="#FFE5B2" />
            <rect
               x="11.75"
               y="16.25"
               width="10.5"
               height="7.5"
               rx="1"
               stroke="#002902"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
            <path
               d="M13.25 14C13.25 11.9289 14.9289 10.25 17 10.25V10.25C19.0711 10.25 20.75 11.9289 20.75 14V16.25H13.25V14Z"
               stroke="#002902"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      );
   }
};

export default LockIcon;

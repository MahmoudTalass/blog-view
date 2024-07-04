import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Spinner() {
   return (
      <div className="w-full flex justify-center items-center h-full">
         <div>
            <FontAwesomeIcon icon={faSpinner} size="2x" spin />
         </div>
      </div>
   );
}

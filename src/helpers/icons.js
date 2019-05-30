import {
  faTrashAlt,
  faSignOutAlt,
  faEdit,
  faMinusCircle,
  faMinus,
  faCircleNotch,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  library.add(
    faTrashAlt,
    faSignOutAlt,
    faEdit,
    faMinusCircle,
    faCircleNotch,
    faPlus
  );
};

export default Icons;

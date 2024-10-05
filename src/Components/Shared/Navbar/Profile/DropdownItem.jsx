import { Link } from "react-router-dom";

const DropdownItem = ({ icon, to, children }) => (
    <li className="flex items-center gap-1 font-semibold">
        {icon}
        <Link to={to}>{children}</Link>
    </li>
);

export default DropdownItem;
import { Badge } from "@material-tailwind/react";
import useAllArchidedOrders from "../../../../Hooks/useAllArchivedOrders";
import { FaArchive } from "react-icons/fa";

export default function AllArchivedOrders() {

    const { allArchiveOrders } = useAllArchidedOrders();
  return (
    <div>
      <div className="-mb-2 mr-2">
        <Badge className="px-2 py-1 ml-3 -mt-3" content={allArchiveOrders?.length}>
          <FaArchive className=" lg:text-2xl md:text-2xl text-xl " />
        </Badge>
      </div>
    </div>
  );
}

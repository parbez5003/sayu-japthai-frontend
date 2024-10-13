import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@material-tailwind/react";
import useGetMyCarts from '../../../../Hooks/useGetMyCarts';
import { IoCartOutline } from "react-icons/io5";
import useCurrentUser from '../../../../Hooks/useCurrentUser';


export default function CartsAndOrders() {

    const { myCarts } = useGetMyCarts();
    const { currentUser } = useCurrentUser();


    return (
        <>
            {
                currentUser?.isAdmin ? (
                    ""
                ) : (
                    <div className="-mb-2 mr-2">
                        <Link to={"/carts"}>
                            <Badge className="px-2 py-1 ml-3 -mt-3" content={myCarts?.length} >
                                <IoCartOutline size={30} />
                            </Badge>
                        </Link>
                    </div>
                )
            }
        </>



    )
}

import React from 'react'
import useAllUsers from '../../../../Hooks/useAllUser'

import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Loading from '../../../Shared/Loading/Loading';
import useAuth from '../../../../Hooks/useAuth';

export default function AllUsers() {


  const [allUsers , isLoading] = useAllUsers()



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <><div className="px-2 md:py-3 text-gray-800 bg-gray-200">
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="rounded-lg"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium py-4">All Users List</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-2">
              <thead>
                <tr className="text-indigo-500 hover:text-indigo-700">
                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                    N/A
                  </th>
                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                    User Name
                  </th>
                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                    Image
                  </th>
                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                    User Email
                  </th>
                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                    Role
                  </th>

                  <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {allUsers?.map((user, i) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <td className="border bg-white border-gray-200 p-2 text-center">
                        {i + 1}
                      </td>
                      <td className="border bg-white border-gray-200 md:p-2 p-1 text-sm w-60 text-center">
                        {user.name}
                      </td>
                      <td className="border bg-white border-gray-200 p-2">
                        <img
                          className="w-20 md:h-16 rounded-lg mx-auto"
                          src={user?.profilePhoto}
                          alt=""
                        />
                      </td>
                      <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                        {user?.email}
                      </td>

                      <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                        {user?.isAdmin ? <div>
                          <button type="button" className="py-2 md:text-[16px] px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-green-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                            Admin
                          </button>
                        </div> : <div>
                          <button type="button" className="py-2 md:text-[16px] px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                            User
                          </button>
                        </div>}
                      </td>

                      <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                        <div className="flex items-center justify-center lg:gap-6 md:gap-4 gap-2">

                          <span className="text-xl cursor-pointer">
                            <CiEdit />
                          </span>

                          <span
                            // onClick={() =>
                            //   handleDeleteUser(user?._id, user?.name)
                            // }
                            className="md:text-2xl text-lg text-red-600 cursor-pointer"
                          >
                            <MdDelete />
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

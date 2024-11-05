"use client";
import { useState, useEffect } from "react";
import ErrorHandler from "@/utils/error-handler";
import axiosInstance from "@/lib/axios";

import { IUser } from "./types";

export default function AdminView() {
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/users");

      setUsers(data.data);
    } catch (err) {
      ErrorHandler(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="mx-auto max-w-lg mt-20 flex flex-col text-center justify-center">
      <p>Admin Page</p>
      <div>
        <table className="border border-black w-full">
          <thead>
            <tr className="border border-black">
              <th className="p-2">No</th>
              <th className="p-2">Email</th>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          {users?.length > 0 &&
            users.map((user, idx) => (
              <tbody key={idx}>
                <tr>
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.role.name}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

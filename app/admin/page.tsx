"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AttendanceType } from "../_type/AttendanceType";

const Admin = () => {
  const [rows, setRows] = useState<AttendanceType[]>([]);
  const [isDownload, setIsDownload] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URL}/attendance`)
      .then((data) => {
        const res = data;
        setRows(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = async (id: Number) => {
    try {
      setIsDownload(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_URL}/attendance/${id}/tiket`,
        { responseType: "blob" }
      );

      const fileName = res.headers["x-filename"] || "download";
      const contentType =
        res.headers["content-type"] || "application/octet-stream";

      const blob = new Blob([res.data], { type: contentType });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      setIsDownload(false)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Admin Panel</h1>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Company</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Kehadiran</th>
            <th className="border p-2">File</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border">
              <td className="border p-2">{r.company}</td>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.kehadiran}</td>
              <td className="border p-2">
                {r.tiket ? r.tiket.split("/").pop() : "-"}
              </td>
              <td className="border p-2 text-center">
                {r.tiket &&
                  (isDownload ? (
                    <button
                      className="px-3 py-1 border rounded opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Downloading...
                    </button>
                  ) : (
                    <button 
                      className="px-3 py-1 border rounded"
                      onClick={() => handleDownload(r.id)}
                    >
                      Download
                    </button>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

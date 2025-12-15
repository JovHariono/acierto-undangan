"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AttendanceType } from "../_type/AttendanceType";

const Admin = () => {
  const [rows, setRows] = useState<AttendanceType[]>([]);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BE_URL}/attendance`)
        .then((res) => {
          setRows(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async (id: number) => {
    try {
      setDownloadingId(id);

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
      document.body.appendChild(a);
      a.click();

      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await axios.delete(`${process.env.NEXT_PUBLIC_BE_URL}/attendance/${id}`);

      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete data");
    } finally {
      setDeletingId(null);
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
            <th className="border p-2">Download</th>
            <th className="border p-2">Delete</th>
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
                  (downloadingId === r.id ? (
                    <button
                      className="px-3 py-1 rounded bg-gray-300 cursor-not-allowed"
                      disabled
                    >
                      Downloading...
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 rounded border hover:bg-gray-100"
                      onClick={() => handleDownload(r.id)}
                    >
                      Download
                    </button>
                  ))}
              </td>

              <td className="border p-2 text-center">
                {r.tiket &&
                  (deletingId === r.id ? (
                    <button
                      className="px-3 py-1 rounded bg-red-300 text-white cursor-not-allowed"
                      disabled
                    >
                      Deleting...
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
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

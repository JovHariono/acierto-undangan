"use client";

import { useState } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import axios from "axios";
import { FormDataAttendanceType } from "./_type/FormDataAttendanceType";

export default function Home() {
  const [form, setForm] = useState<FormDataAttendanceType>({
    company: "",
    name: "",
    kehadiran: 0,
    tiket: null,
  });

  const handleSubmit = () => {
    const data = new FormData();
    data.append("company", form.company);
    data.append("name", form.name);
    data.append("kehadiran", String(form.kehadiran));
    if (form.tiket) data.append("tiket", form.tiket);
    
    axios
      .post(`${process.env.NEXT_PUBLIC_BE_URL}/attendance`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => [console.log(res)])
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* PAGE 1 */}
      <div className="h-screen snap-start flex flex-col items-center justify-between py-10">
        <Header />

        <div className="text-center">
          <div>BATAM - GRAND MERCURE</div>
          <div>12 - 14 Januari 2026</div>
          <div>01 HARI ; 37 JAM ; 20 MENIT</div>
          <div>MENUJU SNM 2026</div>
        </div>

        <Footer />
      </div>

      {/* PAGE 2 */}
      <div className="h-screen snap-start flex flex-col items-center justify-between py-10">
        <Header />

        <div className="text-center">
          <div>Logo</div>
          <div>RSVP CONFIRMATION</div>
        </div>

        <div className="flex flex-col gap-4 w-64">
          <input
            type="text"
            placeholder="Company"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <input
            type="text"
            placeholder="Nama"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, kehadiran: Number(e.target.value) })
            }
          >
            <option value="">Kehadiran</option>
            <option value="1">Hadir</option>
            <option value="0">Tidak Hadir</option>
          </select>

          <label className="flex flex-col border rounded p-3 cursor-pointer">
            <span className="text-sm mb-1">Tiket</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, tiket: e.target.files?.[0] ?? null })
              }
            />
            <div className="border p-2 rounded text-center">
              {form.tiket ? form.tiket.name : "Choose File"}
            </div>
          </label>

          <button className="bg-amber-300 p-2 rounded" onClick={handleSubmit}>
            Submit
          </button>

          <Footer />
        </div>
      </div>
    </div>
  );
}

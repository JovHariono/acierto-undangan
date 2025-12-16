"use client";

import { useState } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import axios from "axios";
import { FormDataAttendanceType } from "./_type/FormDataAttendanceType";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState<FormDataAttendanceType>({
    company: "",
    name: "",
    kehadiran: 0,
    tiket: null,
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataAttendanceType, string>>
  >({});
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!form.company.trim()) newErrors.company = "Company must be filled";
    if (!form.name.trim()) newErrors.name = "Name must be filled";
    if (form.kehadiran === null)
      newErrors.kehadiran = "Attendance must be selected";
    if (!form.tiket) newErrors.tiket = "Ticket must be uploaded";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmit) return;

    setIsSubmit(true);

    if (!validateForm()) {
      setIsSubmit(false);
      return;
    }

    if (!process.env.NEXT_PUBLIC_BE_URL) {
      console.error("NEXT_PUBLIC_BE_URL is not configured");
      alert("Backend URL not configured. Please contact the app owner.");
      setIsSubmit(false);
      return;
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      alert("You appear to be offline. Check your network and try again.");
      setIsSubmit(false);
      return;
    }

    const data = new FormData();
    data.append("company", form.company);
    data.append("name", form.name);
    data.append("kehadiran", String(form.kehadiran ?? ""));
    if (form.tiket) data.append("tiket", form.tiket);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/attendance`, data);

      alert("Submitted successfully.");

      setForm({
        company: "",
        name: "",
        kehadiran: 0,
        tiket: null,
      });
    } catch (err) {
      console.error(err);
      alert("Submit failed: " + ((err as any)?.message ?? "See console for details"));
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-[#001A3F]">
      {/* PAGE 1 */}
      <div
        className="h-screen snap-start 
      flex flex-col items-center justify-between py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <Header />
        <div>
          <Image
            alt=""
            width={200}
            height={300}
            src="/logo/astraNSM.png"
            className="w-70 h-auto"
          />
        </div>
        <div
          className="flex flex-col text-xl text-center gap-12 pb-30"
          style={{ color: "#D8B55A" }}
        >
          <div className="font-bold">
            <div>BATAM - GRAND MERCURE</div>
            <div>12 - 14 Januari 2026</div>
          </div>

          <div className="font-bold">
            <div>01 HARI ; 37 JAM ; 20 MENIT</div>
            <div>MENUJU SNM 2026</div>
          </div>
        </div>
      </div>

      <div
        className="h-screen flex flex-col justify-between bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <div className="snap-start flex flex-col items-center py-10">
          <Header />
          <div
            className="flex flex-col text-center items-center gap-1"
            style={{ color: "#D8B55A" }}
          >
            <h1 className="text-3xl text-center pt-7 font-bold">INVITATION</h1>

            <div className="space-y-4 w-[90%] p-10 text">
              <p className="text-left text-xs sm:text-base md:text-lg lg:text-lg">
                Kami ingin mengundang keluarga besar Trading Domestic PT Astra
                Otoparts Tbk. untuk ikut hadir di acara Nasional Sales Meeting
                2026, guna membahas dan merencanakan tahun yang akan datang.
              </p>

              <p className="text-right text-white text-xs sm:text-base md:text-lg lg:text-lg">
                We would like to invite the big family of Trading Domestic of PT
                Astra Otoparts Tbk to attend the National Sales Meeting 2026, to
                discuss and plan for this year.
              </p>
            </div>
          </div>
        </div>
        <Image
          alt=""
          width={200}
          height={300}
          src="/logo/astraNSM.png"
          className="w-40 h-auto ml-10 mb-35"
        />
      </div>

      <div
        className="h-screen flex flex-col justify-between bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <div className="snap-start flex flex-col items-center py-10">
          <Header />

          <Image
            alt=""
            width={200}
            height={300}
            src="/logo/footer/logoGrowAll.png"
            className="w-60 h-auto object-contain"
          />

          <div
            className="flex flex-col items-start gap-1 w-full px-10"
            style={{ color: "#D8B55A" }}
          >
            <div className="flex flex-col w-[90%]">
              <h1 className="pt-3 text-xs">This is our moment to</h1>

              <p className="font-bold text-sm">
                grow—expanding our reach, strengthening our market presence,{" "}
                <span className="font-normal text-xs">and</span>
              </p>

              <p className="font-bold text-sm">building sustainable success</p>
              <p className="text-xs">
                together as partners driving real change.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col text-center items-center pt-4"
            style={{ color: "#D8B55A" }}
          >
            <div className="flex sm:gap-5 md:gap-8 lg:gap-8 px-8 pt-4">
              <Image
                alt=""
                width={200}
                height={300}
                src="/logo/oi.png"
                className="w-20 h-auto object-contain scale-200"
              />

              <div className="text-left text-[10px] sm:px-10">
                <p className="font-bold">OPPORTUNITY IDENTIFICATION</p>
                <p>
                  Tahap menemukan dan memahami peluang yang ada di lapangan
                  sebelum menganalisa peluang untuk mengetahui akar masalah &
                  kebutuhan untuk langkah selanjutnya.
                </p>
                <div className="text-right text-white">
                  <p className="lg:pl-6">
                    The first stage is to identify and understand the
                    opportunities available in the field before Analyzing those
                    opportunities in detail to uncover root causes &
                    requirements before deciding the next steps.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex sm:gap-5 md:gap-8 lg:gap-8 px-8 pt-4">
              <Image
                alt=""
                width={200}
                height={300}
                src="/logo/ya.png"
                className="w-20 h-auto object-contain scale-200 relative -left-10"
              />

              <div className="text-left text-[10px] sm:px-10">
                <p className="font-bold">YIELD ACTIVATION</p>
                <p>
                  Membuat target yang ingin dicapai dari peluang yang telah di
                  analisa dan melakukan eksekusi dalam bentuk tindakan nyata dan
                  baru sehingga outcome menjadi jelas dan terukur.
                </p>
                <div className="text-right text-white lg:pl-6">
                  <p>
                    Setting achievable targets from analyzed opportunities and
                    executing them through extraordinary actions, ensuring
                    outcomes that are clear and measurable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MERCURE */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center"
          style={{ color: "#D8B55A" }}
        >
          <div className="">
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[60%] pt-2">
            <h1 className="text-center ">AGENDA</h1>

            <div>
              <p className="text-xs">MEETING DAY</p>
              <p className="text-xs">13 . 01 . 26 & 14 . 01 . 26</p>
              <p className="text-xs">at. GRAND MERCURE</p>
              <p className="text-xs">Dresscode Day 1 : </p>
              <p className="text-xs">Kemeja Putih - Jeans</p>
            </div>

            <div className="pt-2">
              <p className="text-xs">Dresscode Day 2 : </p>
              <p className="text-xs">Kemeja Hitam - Jeans</p>
              <p className="text-xs">09:00 - 17:00</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/img/img.png"
            className="w-40 h-auto pt-2"
          />

          <div className="flex p-4 pt-6 gap-4">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-5 h-auto"
            />

            <div className="w-60 p-2 rounded bg-[#D8B55A]"></div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Tembak Langit */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center"
          style={{ color: "#D8B55A" }}
        >
          <div className="pt-4">
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[60%] pt-2">
            <h1 className="text-center ">AGENDA</h1>

            <div>
              <p className="text-xs">AWARDING NIGHT 14 . 01 . 26</p>
              <p className="text-xs">at. Tembak Langit</p>
              <p className="text-xs">Dresscode : </p>
              <p className="text-xs">......</p>
              <p className="text-xs">17:00 - 21:00</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/img/img.png"
            className="w-40 h-auto pt-2"
          />

          <div className="flex p-4 gap-4">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-5 h-auto"
            />

            <div className="w-60 p-2 rounded bg-[#D8B55A]"></div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Batamia Oleh-Oleh */}
      <div
        className="h-full snap-start font-bold justify-between flex flex-col items-center py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center"
          style={{ color: "#D8B55A" }}
        >
          <div className="pt-4">
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[60%] pt-2">
            <h1 className="text-center ">AGENDA</h1>

            <div>
              <p className="text-xs">Belanja Oleh-Oleh</p>
              <p className="text-xs">13 . 01 . 26 & 14 . 01 . 26</p>
              <p className="text-xs">at. Batamia Oleh-Oleh</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/img/img.png"
            className="w-40 h-auto pt-2"
          />

          <div className="flex p-4 gap-4">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-5 h-auto"
            />

            <div className="w-60 p-2 rounded bg-[#D8B55A]"></div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Kelong Baba */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center"
          style={{ color: "#D8B55A" }}
        >
          <div className="pt-4">
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[60%] pt-2">
            <h1 className="text-center ">AGENDA</h1>

            <div>
              <p>CLOSING DINNER</p>
              <p className="text-xs">14 . 01 . 26</p>
              <p className="text-xs">at. KELONG BABA SEAFOOD</p>
              <p className="text-xs">Dresscode : </p>
              <p className="text-xs">......</p>
              <p className="text-xs">18:00 - 21:00</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/img/img.png"
            className="w-40 h-auto pt-2"
          />

          <div className="flex p-4 gap-4">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-5 h-auto"
            />

            <div className="w-60 p-2 rounded bg-[#D8B55A]"></div>
          </div>
        </div>
        <Footer />
      </div>

      {/* PAGE LAST */}
      <div
        className="h-screen snap-start justify-between relative flex flex-col items-center py-10
      bg-[url('/bg/mobile.jpg')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <Header />

        <div
          className="text-3xl text-center font-bold mb-5"
          style={{ color: "#D8B55A" }}
        >
          <div>RSVP</div>
          <div>CONFIRMATION</div>
        </div>

        <div className="flex flex-col gap-4 w-64">
          <input
            type="text"
            placeholder="Company"
            className={`bg-[#D8B55A] p-2 rounded ${
              errors.company ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              setForm({ ...form, company: e.target.value });
              setErrors({ ...errors, company: undefined });
            }}
          />
          {errors.company && (
            <p className="text-red-500 text-xs">{errors.company}</p>
          )}

          <input
            type="text"
            placeholder="Nama"
            className={`bg-[#D8B55A] p-2 rounded focus:outline-none ${
              errors.name ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: undefined });
            }}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <select
            className={`bg-[#D8B55A] p-2 rounded focus:outline-none ${
              errors.kehadiran ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              const value = e.target.value === "" ? null : Number(e.target.value);
              setForm({ ...form, kehadiran: value });
              setErrors({ ...errors, kehadiran: undefined });
            }}
          >
            <option value="">Kehadiran</option>
            <option value="1">Hadir</option>
            <option value="0">Tidak Hadir</option>
          </select>
          {errors.kehadiran && (
            <p className="text-red-500 text-xs">{errors.kehadiran}</p>
          )}

          <label
            className={`flex flex-col rounded p-3 cursor-pointer bg-[#D8B55A] ${
              errors.tiket ? "border border-red-600" : "border"
            }`}
          >
            <span className="text-sm mb-1">Tiket</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setForm({ ...form, tiket: e.target.files?.[0] ?? null });
                setErrors({ ...errors, tiket: undefined });
              }}
            />

            <div className="border p-2 rounded text-center bg-white/30">
              {form.tiket ? form.tiket.name : "Choose File"}
            </div>
          </label>
          {errors.tiket && (
            <p className="text-red-500 text-xs">{errors.tiket}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#D2DFE8] p-2 rounded touch-manipulation"
            disabled={isSubmit}
          >
            {isSubmit ? "Submitting..." : "Submit"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

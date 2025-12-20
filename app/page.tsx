"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { FormDataAttendanceType } from "./_type/FormDataAttendanceType";

export default function Home() {
  const targetDate = new Date("2026-01-12T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [form, setForm] = useState<FormDataAttendanceType>({
    company: "",
    name: "",
    kehadiran: 0,
    tiket: null,
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const gradientStyle = {
    background: "linear-gradient(90deg, #ffe193, #D2DFE8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  } as any;

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
      alert(
        "Submit failed: " + ((err as any)?.message ?? "See console for details")
      );
    } finally {
      setIsSubmit(false);
    }
  };

  function getTimeLeft(target: Date) {
    const now = new Date().getTime();
    const diff = target.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-[#001A3F]">
      {/* PAGE 1 */}
      <div
        className="h-screen snap-start
  flex flex-col items-center justify-between pt-30 pb-30 md:pb-20

  bg-[url('/bg/m1.png')]
  bg-cover bg-top bg-no-repeat

  md:bg-[url('/bg/desktop.jpg')]
  md:bg-center"
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
          className="flex flex-col text-xl text-center gap-8"
          style={{ color: "#ffe193" }}
        >
          <div className="font-bold text-[#D2DFE8]">
            <div>BATAM - GRAND MERCURE</div>
            <div>12 - 15 Januari 2026</div>

            <div
              className="font-bold text-xs tracking-wide pt-4 mt-8"
              style={{ color: "#ffe193" }}
            >
              {String(timeLeft.days).padStart(2, "0")} HARI ;{" "}
              {String(timeLeft.hours).padStart(2, "0")} JAM ;{" "}
              {String(timeLeft.minutes).padStart(2, "0")} MENIT
            </div>
            <div className="text-xs" style={{ color: "#ffe193" }}>
              Menuju NSM 2026
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-screen flex flex-col justify-between bg-[url('/bg/m2n.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <div className="snap-start flex flex-col items-center pt-25 pb-10">
          <Header />
          <div
            className="flex flex-col text-center items-center gap-1"
            style={{ color: "#ffe193" }}
          >
            <h1
              className="text-3xl text-center pt-1 font-bold"
              style={gradientStyle}
            >
              INVITATION
            </h1>

            <div className="space-y-4 w-[90%] px-10 py-4 text">
              <p className="text-left text-xs tracking-[0.05em] sm:text-base md:text-lg lg:text-lg">
                Kami ingin mengundang keluarga besar Trading Domestic PT Astra
                Otoparts Tbk. untuk ikut hadir di acara Nasional Sales Meeting
                2026, guna membahas dan merencanakan tahun yang akan datang.
              </p>

              <p className="text-right text-white text-xs tracking-[0.05em] sm:text-base md:text-lg lg:text-lg">
                We would like to invite the big family of Trading Domestic of PT
                Astra Otoparts Tbk to attend the National Sales Meeting 2026, to
                discuss and plan for this year.
              </p>
            </div>
          </div>
        </div>
        {/* <Image
          alt=""
          width={200}
          height={300}
          src="/logo/astraNSM.png"
          className="w-80 h-auto ml-10 mb-10"
        /> */}
      </div>

      <div
        className="h-screen flex flex-col justify-between
    bg-[url('/bg/m3.png')]
    bg-cover bg-top bg-no-repeat

    md:bg-[url('/bg/desktop.jpg')]
    md:bg-center"
      >
        <div className="snap-start flex flex-col items-center pt-30 pb-10"></div>
      </div>

      {/* RUMAH MAKAN JODOH */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m4.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-2"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[80%] pt-2">
            <h1 className="text-center tracking-[0.05em]">AGENDA DAY 1</h1>

            <div>
              <p className="text-sm tracking-[0.05em] pt-4">
                "WELCOMING DINNER"
              </p>
              <p className="text-sm tracking-[0.05em]">Monday, 12 Januari 2026</p>
              <p className="text-sm tracking-[0.05em]">at. RUMAH MAKAN JODOH</p>
              <p className="text-xs tracking-[0.05em] pt-4">
                Dresscode : Free (Casual Attire)
              </p>
              <p className="text-sm tracking-[0.05em]">17:30 - 19:30</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/rumahMakanJodoh.jpg"
            className="w-80 h-auto pt-2 rounded-2xl"
          />

          <div className="flex pt-2 gap-4 items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/GjrX7cQdT4vKrBBo8"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Rumah Makan Jodoh
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* GRAND MERCURE */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m5.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-2 md:gap-0"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[80%]">
            <h1 className="text-center tracking-[0.05em]">AGENDA</h1>

            <div>
              <p className="text-xs tracking-[0.05em]">MEETING DAY</p>
              <p className="text-xs tracking-[0.05em]">at. GRAND MERCURE</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/grandMercure.jpg"
            className="w-45 h-auto object-contain rounded-2xl"
          />

          <div className="flex gap-4 pt-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs tracking-[0.05em]">MEETING DAY 1</p>
              <p className="text-[10px] tracking-[0.05em]">
                Tuesday, 13 Januari 2026
              </p>
              <p className="text-xs tracking-[0.05em]">
                at. Ranantira Ballroom
              </p>
              <p className="text-[10px] tracking-[0.05em]">08.00 - 16.30 WIB</p>

              <p className="text-[10px] tracking-[0.05em]">
                Dresscode : Kemeja Putih - Jeans
              </p>

              <Image
                alt=""
                width={200}
                height={300}
                src="/loc/putih.png"
                className="w-30 h-auto object-contain md: pt-2"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-xs tracking-[0.05em]">MEETING DAY 2</p>
              <p className="text-[10px] tracking-[0.05em]">
                Wednesday, 14 Januari 2026
              </p>
              <p className="text-xs tracking-[0.05em]">
                at. Ranantira Ballroom
              </p>
              <p className="text-[10px] tracking-[0.05em]">08.00 - 12.00 WIB</p>

              <p className="text-[10px] tracking-[0.05em]">
                Dresscode : Kemeja Hitam - Jeans
              </p>

              <Image
                alt=""
                width={200}
                height={300}
                src="/loc/item.png"
                className="w-30 h-34 object-contain md: pt-2"
              />
            </div>
          </div>

          <div className="flex pt-2 gap-4 items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/rVkoDKFcePvRdSVa8"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Grand Mercure
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* TEMBAK LANGIT */}
      <div
        className="h-full snap-start font-bold justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m6.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-4"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-full">
            <h1 className="text-center tracking-[0.05em]">AGENDA</h1>

            <div>
              <p className="text-sm tracking-[0.05em] pt-4">"AWARDING NIGHT"</p>
              <p className="text-sm tracking-[0.05em]">
                Tuesday, 14Januari 2026
              </p>
              <p className="text-sm tracking-[0.05em]">at. Tembak Langit</p>
              <p className="text-xs tracking-[0.05em] pt-4">
                Dresscode : Smart Casual (Bright Colour)
              </p>
              <p className="text-sm tracking-[0.05em]">17:00 - 21:00</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/tembakLangit.jpg"
            className="w-80 h-auto pt-2 rounded-2xl"
          />

          <div className="flex pt-2 gap-4 items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/39y1WWHk8w23mDmNA"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Tembak Langit
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* BATAMIA */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m7.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-4"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[60%]">
            <h1 className="text-center tracking-[0.05em]">AGENDA</h1>

            <div>
              <p className="text-sm tracking-[0.05em] pt-4">
                “Shopping from Local Batam Souvenir Store”
              </p>
              <p className="text-sm tracking-[0.05em]">
                Tuesday, 13 Januari 2026 & Wednesday, 14 Januari 2026
              </p>
              <p className="text-sm tracking-[0.05em] pt-2">at. Batamia Oleh-Oleh</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/batamiaBaru.jpg"
            className="w-70 h-auto pt-2 object-contain rounded-2xl"
          />

          <div className="flex p-4 gap-4 items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/rFH9o9Mz7VHcqwh89"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Batamia
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* INFINITY BEACH */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m8.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-4"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[80%]">
            <h1 className="text-center tracking-[0.05em]">AGENDA</h1>

            <div>
              <p className="text-sm tracking-[0.05em] pt-4">
                "OUTDOOR ACTIVITY"
              </p>
              <p className="text-sm tracking-[0.05em]">
                Wednesday, 14 Januari 2026
              </p>
              <p className="text-sm tracking-[0.05em]">
                at. INFINITY BEACH CLUB
              </p>
              <p className="text-xs tracking-[0.05em] pt-2">
                Dresscode : Free (Wet Ready)
              </p>
              <p className="text-sm tracking-[0.05em]">15:00 - 16:30</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/infinityBeachClub.jpg"
            className="w-70 h-auto pt-2 object-contain rounded-2xl"
          />

          <div className="flex p-4 gap-4 items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/WJsieJTu47xuQYem7"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Infinity Beach Club
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* KELONG BABA */}
      <div
        className="h-full snap-start justify-between flex flex-col items-center pt-30 md:pt-20 pb-30
      bg-[url('/bg/m7.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat font-bold"
      >
        <Header />
        <div
          className="flex flex-col text-center items-center gap-4"
          style={{ color: "#ffe193" }}
        >
          <div className="" style={gradientStyle}>
            <h1 className="text-xl text-center">NATIONAL SALES MEETING</h1>
          </div>

          <div className="w-[80%]">
            <h1 className="text-center tracking-[0.05em]">AGENDA</h1>

            <div className=" pt-4">
              <p>"CLOSING DINNER"</p>
              <p className="text-sm tracking-[0.05em]">
                Wednesday, 14 Januari 2026
              </p>
              <p className="text-sm tracking-[0.05em]">
                at. KELONG BABA SEAFOOD
              </p>
              <p className="text-sm tracking-[0.05em]">18:00 - 21:00</p>
            </div>
          </div>

          <Image
            alt=""
            width={200}
            height={300}
            src="/loc/kelongBaba.jpg"
            className="w-70 h-auto pt-2 rounded-2xl"
          />

          <div className="flex pt-2 gap-4 items-center items-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/gmap.png"
              className="w-3 h-auto object-contain"
            />

            <a
              href="https://maps.app.goo.gl/bX9d6U9bkrbjbCV6A"
              className="w-fit inline-flex items-center
    px-3 py-2
    leading-none
    rounded-md bg-[#ffe193] text-[#001A3F]"
            >
              Kelong Baba
            </a>
          </div>
        </div>
        <Footer />
      </div>

      {/* PAGE LAST */}
      <div
        className="h-screen snap-start justify-between relative flex flex-col items-center pt-30 md:pt-25 pb-30
      bg-[url('/bg/m9.png')]
    md:bg-[url('/bg/desktop.jpg')]
    bg-cover bg-center bg-no-repeat"
      >
        <Header />

        <div
          className="text-3xl text-center font-bold mb-5"
          style={gradientStyle}
        >
          <div>RSVP</div>
          <div>CONFIRMATION</div>
        </div>

        <div className="flex flex-col gap-4 w-64">
          <select
            className={`bg-[#ffe193] p-2 rounded ${
              errors.company ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              setForm({ ...form, company: e.target.value });
              setErrors({ ...errors, company: undefined });
            }}
          >
            <option value="">Company</option>
            <option value="PT. ASTRA OTOPARTS Tbk.">
              PT. ASTRA OTOPARTS Tbk.
            </option>
            <option value="PT. ANAK MUDA RETAIL">PT. ANAK MUDA RETAIL</option>
            <option value="PT. ANEKA GEMILANG">PT. ANEKA GEMILANG</option>
            <option value="PT. ANEKA MEKAR">PT. ANEKA MEKAR</option>
            <option value="PT. ASPIRASI JAYA LESTARI">
              PT. ASPIRASI JAYA LESTARI
            </option>
            <option value="PT. BINTANG PUTRA AUTOPARTS">
              PT. BINTANG PUTRA AUTOPARTS
            </option>
            <option value="PT. BORNEO MITRA MAKMUR">
              PT. BORNEO MITRA MAKMUR
            </option>
            <option value="PT. BUDI PRATAMA SEJATI">
              PT. BUDI PRATAMA SEJATI
            </option>
            <option value="PT. CALISPO CITRA LESTARI">
              PT. CALISPO CITRA LESTARI
            </option>
            <option value="PT. CALISPO JAYA ABADI">
              PT. CALISPO JAYA ABADI
            </option>
            <option value="PT. CALISPO MULTI UTAMA">
              PT. CALISPO MULTI UTAMA
            </option>
            <option value="PT. CAPELLA PATRIA UTAMA">
              PT. CAPELLA PATRIA UTAMA
            </option>
            <option value="PT. CATUR PUTRA HARMONIS">
              PT. CATUR PUTRA HARMONIS
            </option>
            <option value="PT. GUTRADO UTAMA TRADING">
              PT. GUTRADO UTAMA TRADING
            </option>
            <option value="PT. HARAPAN JAYA SENTOSA ABADI">
              PT. HARAPAN JAYA SENTOSA ABADI
            </option>
            <option value="PT. JAMBI MITRA SEJATI">
              PT. JAMBI MITRA SEJATI
            </option>
            <option value="PT. KUMALA CENTRAL PARTINDO">
              PT. KUMALA CENTRAL PARTINDO
            </option>
            <option value="PT. KUPANG JAYA AUTOPARTS">
              PT. KUPANG JAYA AUTOPARTS
            </option>
            <option value="PT. MAKMUR AUTOPART INDONESIA">
              PT. MAKMUR AUTOPART INDONESIA
            </option>
            <option value="PT. MENTARI PRIMA SEMESTA KALBAR">
              PT. MENTARI PRIMA SEMESTA KALBAR
            </option>
            <option value="PT. MITRA SEJATI PASSO">
              PT. MITRA SEJATI PASSO
            </option>
            <option value="PT. MUTIARA DENSO SEJATI">
              PT. MUTIARA DENSO SEJATI
            </option>
            <option value="PT. SALAWATI MITRA SEJATI PASSO">
              PT. SALAWATI MITRA SEJATI PASSO
            </option>
            <option value="PT. SINERGI PARTSINDO JAYA">
              PT. SINERGI PARTSINDO JAYA
            </option>
            <option value="PT. STEVELINE JAYA PERKASA">
              PT. STEVELINE JAYA PERKASA
            </option>
            <option value="PT. TRI SAMUDRA">PT. TRI SAMUDRA</option>
            <option value="CV. FAJAR BARU ">CV. FAJAR BARU </option>
            <option value="CV. INDOKITA MAKMUR">CV. INDOKITA MAKMUR</option>
            <option value="CV. KANAKA JAYA">CV. KANAKA JAYA</option>
            <option value="CV. KARYA KENCANA">CV. KARYA KENCANA</option>
            <option value="CV. MAHKOTA ABADI JAYA">
              CV. MAHKOTA ABADI JAYA
            </option>
            <option value="CV. MITRA MAKMUR">CV. MITRA MAKMUR</option>
            <option value="CV. PRIMA MUSTIKA AGUNG">
              CV. PRIMA MUSTIKA AGUNG
            </option>
            <option value="CV. SUMMA PUTRA HOKINDO">
              CV. SUMMA PUTRA HOKINDO
            </option>
            <option value="SABARCO. TOKO">SABARCO. TOKO</option>
            <option value="UD. MULTI JAYA BERSAMA">
              UD. MULTI JAYA BERSAMA
            </option>
          </select>
          {errors.company && (
            <p className="text-red-500 text-xs tracking-[0.05em]">
              {errors.company}
            </p>
          )}

          <select
            className={`bg-[#ffe193] p-2 rounded focus:outline-none ${
              errors.name ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: undefined });
            }}
          >
            <option value="">Nama</option>
            <option value="TUJUH MARTOGI SIAHAAN">TUJUH MARTOGI SIAHAAN</option>
            <option value="INDRA NUGRAHA WISUDA">INDRA NUGRAHA WISUDA</option>
            <option value="DENNY TEGUH SANTOSO">DENNY TEGUH SANTOSO</option>
            <option value="RONNY CHANDRA">RONNY CHANDRA</option>
            <option value="BETY ROSMALA">BETY ROSMALA</option>
            <option value="INGRID ISKANDAR">INGRID ISKANDAR</option>
            <option value="TRI PANCA AGUNG">TRI PANCA AGUNG</option>
            <option value="WILLIAM ANDREW">WILLIAM ANDREW</option>
            <option value="BIMA ARYO WICAKSONO">BIMA ARYO WICAKSONO</option>
            <option value="ERIC TUNGGADJAJA">ERIC TUNGGADJAJA</option>
            <option value="ANDREAS SOMAWIDJAJA">ANDREAS SOMAWIDJAJA</option>
            <option value="EDWIN SURJADIPRADJA">EDWIN SURJADIPRADJA</option>
            <option value="YANDI HERMANTO">YANDI HERMANTO</option>
            <option value="AHMAD FARIS ASSEGAF">AHMAD FARIS ASSEGAF</option>
            <option value="WENDY DESTYANTO">WENDY DESTYANTO</option>
            <option value="NUGROHO ARIEF">NUGROHO ARIEF</option>
            <option value="CALVIN GOZAL">CALVIN GOZAL</option>
            <option value="MONICA FELLIANA TJUTJU">
              MONICA FELLIANA TJUTJU
            </option>
            <option value="MERCYA ZETTIRA AGUSTINE">
              MERCYA ZETTIRA AGUSTINE
            </option>
            <option value="HENGKY RUDYANTO">HENGKY RUDYANTO</option>
            <option value="CAHAYA FREDI">CAHAYA FREDI</option>
            <option value="JONI INDRA">JONI INDRA</option>
            <option value="FILIP GUNAWAN">FILIP GUNAWAN</option>
            <option value="FRANSEDA NAINGGOLAN">FRANSEDA NAINGGOLAN</option>
            <option value="ERWAN SUMARSONO">ERWAN SUMARSONO</option>
            <option value="SONYA GIOVANNI">SONYA GIOVANNI</option>
            <option value="IRWAN KOHAR">IRWAN KOHAR</option>
            <option value="ANDI GUNAWAN">ANDI GUNAWAN</option>
            <option value="SALIPIN SURYO">SALIPIN SURYO</option>
            <option value="SUHENDRA">SUHENDRA</option>
            <option value="SALIM ANG">SALIM ANG</option>
            <option value="ANDI XIANG">ANDI XIANG</option>
            <option value="DJONY ANWAR">DJONY ANWAR</option>
            <option value="JEFFREY KARIM">JEFFREY KARIM</option>
            <option value="EDY SARMI">EDY SARMI</option>
            <option value="ANRA RIDUAN MANURUNG">ANRA RIDUAN MANURUNG</option>
            <option value="YOHANES WANGSA">YOHANES WANGSA</option>
            <option value="KURNIAWAN">KURNIAWAN</option>
            <option value="JUNUS SULEMAN">JUNUS SULEMAN</option>
            <option value="ALEXANDER AGUNG">ALEXANDER AGUNG</option>
            <option value="JAMES SIGIT CHANDRA">JAMES SIGIT CHANDRA</option>
            <option value="YULIANA">YULIANA</option>
            <option value="LIANY NOVIANTY LIAN">LIANY NOVIANTY LIAN</option>
            <option value="WIRYANTO YUDRIS">WIRYANTO YUDRIS</option>
            <option value="DAVID CASSIDY">DAVID CASSIDY</option>
            <option value="RUDY HALIM JONG">RUDY HALIM JONG</option>
            <option value="SUWANTO TANLIAS">SUWANTO TANLIAS</option>
            <option value="LIE SUGIARTO">LIE SUGIARTO</option>
            <option value="MILYA YUSMIN">MILYA YUSMIN</option>
            <option value="AJIE MILYA">AJIE MILYA</option>
            <option value="HELEN SURYA">HELEN SURYA</option>
            <option value="HADI WIJAYA KANDOKO">HADI WIJAYA KANDOKO</option>
            <option value="SUJONO SUWONDO">SUJONO SUWONDO</option>
            <option value="SUHAITO">SUHAITO</option>
            <option value="LIE SIN HONG">LIE SIN HONG</option>
            <option value="SUSANTO LIE">SUSANTO LIE</option>
            <option value="LEA YANAN LAY">LEA YANAN LAY</option>
            <option value="JAUW HAN PING">JAUW HAN PING</option>
            <option value="MONICA TANOJO">MONICA TANOJO</option>
            <option value="DAVID JAUWHAN">DAVID JAUWHAN</option>
            <option value="FAUZAN KURNIAWAN">FAUZAN KURNIAWAN</option>
            <option value="STEPHEN ADI WIJAYA">STEPHEN ADI WIJAYA</option>
            <option value="VICEROY ANG">VICEROY ANG</option>
            <option value="TJAHJADI SUNIAN">TJAHJADI SUNIAN</option>
            <option value="JONATHAN JODIE KOESNADI">
              JONATHAN JODIE KOESNADI
            </option>
            <option value="KOESNADI">KOESNADI</option>
            <option value="DJONO CUNG">DJONO CUNG</option>
            <option value="RUCIPTO">RUCIPTO</option>
            <option value="STEVEN INDRA">STEVEN INDRA</option>
            <option value="BUDI SETIA DHARMA JASIN">
              BUDI SETIA DHARMA JASIN
            </option>
            <option value="ROCKY RUSTAN">ROCKY RUSTAN</option>
            <option value="KOOSNADY SJAIFUL">KOOSNADY SJAIFUL</option>
            <option value="JEMMY TANUBRATA">JEMMY TANUBRATA</option>
            <option value="REDMOND THO">REDMOND THO</option>
            <option value="PRIADJI">PRIADJI</option>
            <option value="NYONG LIWONGAN">NYONG LIWONGAN</option>
            <option value="RICKY LIWONGAN">RICKY LIWONGAN</option>
            <option value="VALERYNO PHOANTO">VALERYNO PHOANTO</option>
            <option value="VALENTINO VINCENT JAUW">
              VALENTINO VINCENT JAUW
            </option>
            <option value="JOHAN SETIAWAN">JOHAN SETIAWAN</option>
            <option value="EDWIN THUNGGAWAN">EDWIN THUNGGAWAN</option>
            <option value="ANDREANUS WAHYUDI">ANDREANUS WAHYUDI</option>
            <option value="MADELINE AUDORA">MADELINE AUDORA</option>
            <option value="ANDRONICUS">ANDRONICUS</option>
            <option value="UDOWO RAKSOYUDO">UDOWO RAKSOYUDO</option>
            <option value="RYAN">RYAN</option>
            <option value="HENDRAWAN WIJAYA">HENDRAWAN WIJAYA</option>
            <option value="JODI PANGESTU">JODI PANGESTU</option>
            <option value="CORNELIA">CORNELIA</option>
            <option value="MARIO TUMPAK">MARIO TUMPAK</option>
            <option value="RUDI YANTHO">RUDI YANTHO</option>
            <option value="ADRIAN STEFANUS">ADRIAN STEFANUS</option>
            <option value="YOHANES ADRI PRATAMA">YOHANES ADRI PRATAMA</option>
            <option value="FX SONY WIDJAJA">FX SONY WIDJAJA</option>
            <option value="DENNIS DESTIAN">DENNIS DESTIAN</option>
            <option value="PUJI NURYADIN">PUJI NURYADIN</option>
            <option value="ANGGA BACHTIAR">ANGGA BACHTIAR</option>
            <option value="REVEL CHRISTIAN WAROH SANTOSO">
              REVEL CHRISTIAN WAROH SANTOSO
            </option>
            <option value="WILLY CHRIST">WILLY CHRIST</option>
            <option value="DIONYSIUS ANDRE SUHARTO">
              DIONYSIUS ANDRE SUHARTO
            </option>
            <option value="ALEX SUTEDJA">ALEX SUTEDJA</option>
            <option value="MUHAMMAD IQBAL FARABI">MUHAMMAD IQBAL FARABI</option>
            <option value="DESO ARIS PRASETYO">DESO ARIS PRASETYO</option>
            <option value="DEDDY SANJAYA KRISTIAN">
              DEDDY SANJAYA KRISTIAN
            </option>
            <option value="LEONARDO CAESAR HARYONO">
              LEONARDO CAESAR HARYONO
            </option>
            <option value="JASIR MANARANG">JASIR MANARANG</option>
            <option value="CORNELIUS CHRISTOPHER ERIANTO">
              CORNELIUS CHRISTOPHER ERIANTO
            </option>
            <option value="IRFANDY APRILIANO">IRFANDY APRILIANO</option>
            <option value="LIE SUI KET">LIE SUI KET</option>
            <option value="JAFFET TIMOTHY GANIWIDJAJA">
              JAFFET TIMOTHY GANIWIDJAJA
            </option>
            <option value="DAVID">DAVID</option>
            <option value="VALERINO">VALERINO</option>
          </select>
          {errors.name && (
            <p className="text-red-500 text-xs tracking-[0.05em]">
              {errors.name}
            </p>
          )}

          <select
            className={`bg-[#ffe193] p-2 rounded focus:outline-none ${
              errors.kehadiran ? "border border-red-600" : ""
            }`}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : Number(e.target.value);
              setForm({ ...form, kehadiran: value });
              setErrors({ ...errors, kehadiran: undefined });
            }}
          >
            <option value="">Kehadiran</option>
            <option value="1">Hadir</option>
            <option value="0">Tidak Hadir</option>
          </select>
          {errors.kehadiran && (
            <p className="text-red-500 text-xs tracking-[0.05em]">
              {errors.kehadiran}
            </p>
          )}

          <label
            className={`flex flex-col rounded p-3 cursor-pointer bg-[#ffe193] ${
              errors.tiket ? "border border-red-600" : "border"
            }`}
          >
            <span className="text-sm">Tiket</span>
            <span className="text-[8px] p-0.5">Max file upload 5Mb</span>

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
            <p className="text-red-500 text-xs tracking-[0.05em]">
              {errors.tiket}
            </p>
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

      {/* <img
        src="/gif/emas.gif"
        alt="emas"
        width={200}
        height={300}
        className="fixed bottom-0 w-full"
      /> */}
    </div>
  );
}

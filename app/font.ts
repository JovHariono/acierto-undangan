import localFont from "next/font/local";

export const Navigo = localFont({
  src: [
    {
      path: "../public/font/fonnts.com-Navigo.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/fonnts.com-Navigo_Black.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-navigo",
  display: "swap",
});

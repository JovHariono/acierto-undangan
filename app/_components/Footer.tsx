import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center py-3">
      <div className="flex items-center justify-center gap-6">
        <Image
          alt=""
          width={200}
          height={300}
          src="/logo/astraNSM.png"
          className="w-20 h-auto object-contain"
        />

        <div className="h-8 w-[2px] bg-gray-300" />

        <Image
          alt=""
          width={200}
          height={300}
          src="/logo/footer/logoGctec tagline.png"
          className="w-20 h-auto object-contain"
        />

        <div className="h-8 w-[2px] bg-gray-300" />

        <Image
          alt=""
          width={200}
          height={300}
          src="/logo/footer/logoGrowAll.png"
          className="w-20 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Footer;

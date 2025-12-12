import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-6">
      <div className="flex justify-center gap-7">
        <Image
          alt=""
          width={200}
          height={300}
          src="/img/1.jpg"
          className="w-24 h-auto"
        />
        <Image
          alt=""
          width={200}
          height={300}
          src="/img/1.jpg"
          className="w-24 h-auto"
        />
        <Image
          alt=""
          width={200}
          height={300}
          src="/img/1.jpg"
          className="w-24 h-auto"
        />
      </div>
    </div>
  );
};

export default Footer;

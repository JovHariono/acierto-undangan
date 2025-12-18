import Image from "next/image";

const Header = () => {
  return (
    <div className="fixed top-0 w-full pt-4">
      <div className="flex justify-center items-center h-20">
        <Image
          alt=""
          width={200}
          height={300}
          src="/logo/logoAstra.png"
          className="w-60 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Header;

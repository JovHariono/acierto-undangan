import Image from "next/image"

const Header = () => {
  return (
    <div className="w-full flex flex-col items-center">
          <div className="flex justify-center">
            <Image
              alt=""
              width={200}
              height={300}
              src="/logo/logoAstra.png"
              className="w-60 h-auto"
            />        
          </div>
        </div>
  )
}

export default Header
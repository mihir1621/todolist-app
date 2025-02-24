import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="py-3 px-5 flex justify-center bg-gray-200"> 
      <Image 
        src="/images/hexahomelogo.png.png" 
        alt="Hexadecimal Software" 
        width={150} 
        height={50} 
        className="opacity-90" // Slight transparency for blending
      />
    </nav>
  );
}

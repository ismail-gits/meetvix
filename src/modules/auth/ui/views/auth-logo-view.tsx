import Image from "next/image";

export const AuthLogoView = () => {
  return (
    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
      <Image src={"/logo.svg"} alt="Logo" height={120} width={120} />
      <p className="text-2xl font-semibold text-white">Meetvix</p>
    </div>
  );
};

import Image from "next/image";

export const AuthLogo = () => {
  return (
    <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
      <Image src={"/logo.svg"} alt="Logo" height={120} width={120} />
      <p className="text-2xl font-semibold text-white">Meetvix</p>
    </div>
  );
};

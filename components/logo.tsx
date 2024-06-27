import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.svg";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={logo} alt="logo" className="size-32" />
    </Link>
  );
};
export default Logo;

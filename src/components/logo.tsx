import darkLogo from "@/assets/logos/xpartex-dark.png";
import logo from "@/assets/logos/xpartex-light.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-16 max-w-[10.847rem]">
      <Image
        src={darkLogo}
        fill
        className="h-full w-full object-cover dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={logo}
        fill
        className="h-full w-full object-cover dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}

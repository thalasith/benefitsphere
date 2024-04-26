import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import MercerLogo from "./MercerLogo";
import BenefitsphereLogo from "./BenefitsphereLogo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-primary w-full bg-white pt-12 text-sm">
      <nav
        className="max-w-9xl mx-auto flex items-center justify-between border-t-2 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-end lg:flex-1">
          <Link href="/homepage" className="flex lg:flex-1">
            <MercerLogo />
            <div className="mr-2 flex">
              <p className="mx-2 text-xl font-semibold"> | </p>
              <BenefitsphereLogo />
              <p className="mx-2 align-text-bottom text-xl font-semibold">
                Benefitsphere{" "}
              </p>
            </div>{" "}
          </Link>
          © 2024 Mercer Inc. All rights reserved.
        </div>
      </nav>
    </footer>
  );
};

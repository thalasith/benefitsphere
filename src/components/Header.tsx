import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
// import Logo from "../../public/logo.svg";
// import {MercerLogo as Logo} from "../../public/mercer-logo.svg";

import MercerLogo from "./MercerLogo";
import BenefitsphereLogo from "./BenefitsphereLogo";

const navigation = [
  { name: "Add Client", href: "add_client" },
  { name: "Client Management", href: "client_management" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: sessionData } = useSession();

  const Login = (
    <button className="font-semibold leading-6" onClick={() => signIn()}>
      Log in <span aria-hidden="true">&rarr;</span>
    </button>
  ) as JSX.Element;

  const Logout = (
    <div className="flex">
      <p className="mx-2  py-1">Logged in as: {sessionData?.user?.name}</p>
      <button
        className="bg-accent hover:text-primary max-h-full rounded-lg px-2 py-1 font-semibold text-white"
        onClick={() => signOut()}
      >
        Log out
      </button>
    </div>
  ) as JSX.Element;

  return (
    <header className="text-sm">
      <nav
        className="mx-auto flex max-w-full items-center justify-between overflow-x-hidden p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex py-1 lg:flex-1">
          <MercerLogo />
          {/* <Image src={MercerLogo} alt="Mercer" width={120} height={30} /> */}
          <div className="mx-2 flex">
            <p className="mx-2 text-xl font-semibold"> | </p>
            <BenefitsphereLogo />
            {/* <Image src={Logo} alt="Benesphere" width={30} height={30} /> */}
            <p className="mx-2 text-xl font-semibold">Benefitsphere </p>
          </div>{" "}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {sessionData ? Logout : Login}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              Benesphere
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

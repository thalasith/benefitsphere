import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

import MercerLogo from "./MercerLogo";
import BenefitsphereLogo from "./BenefitsphereLogo";
import Link from "next/link";

const navigation = [
  { name: "Add Client", href: "/add_client" },
  { name: "User Management", href: "/user_management" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: sessionData } = useSession();
  const { data: clientData } = api.client.getClientDetailsById.useQuery({
    clientId: sessionData?.user.activeClient ?? 0,
  });

  console.log(clientData);

  const Login = (
    <button
      className="rounded px-2 py-1 font-semibold leading-6 hover:bg-slate-50 hover:text-secondary"
      onClick={() => signIn()}
    >
      Log in
    </button>
  ) as JSX.Element;

  const Logout = (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 px-3 py-2 text-sm font-semibold leading-6 hover:bg-slate-50">
          Welcome {sessionData?.user?.name}
          <ChevronDownIcon
            className="h-5 w-5 flex-none text-slate-400"
            aria-hidden="true"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className=" absolute top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg  ">
            <div className="bg-accent rounded-lg px-2 py-1 font-semibold hover:bg-slate-50 hover:text-danger">
              <Link href="select_client">Change Clients</Link>
            </div>
            <button
              className="bg-accent rounded-lg  px-2 py-1 font-semibold hover:bg-slate-50 hover:text-danger"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  );

  return (
    <header className="fixed w-full bg-white text-sm text-primary">
      <nav
        className=" max-w-9xl flex items-center justify-between p-6 lg:px-8"
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

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/homepage"
            className="rounded-lg px-2 py-2 text-sm leading-6 hover:bg-slate-50"
          >
            View your benefits
          </Link>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-slate-50">
              Client Management
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-slate-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm leading-6 hover:bg-slate-50"
                  >
                    {item.name}
                  </a>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href={`/rewards/${clientData?.url?.toString()}`}
            className="rounded-lg px-2 py-2 text-sm leading-6 hover:bg-slate-50"
          >
            Rewards Page
          </Link>
          <Link
            href="/benchmarking"
            className="rounded-lg px-2 py-2 text-sm leading-6 hover:bg-slate-50"
          >
            Benchmarking
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {clientData && (
            <p className="flex items-center gap-x-1 px-3 py-2 text-sm font-semibold leading-6 ">
              Currently viewing: {clientData?.clientName}
            </p>
          )}
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              Benefitsphere
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
            <div className="-my-6 divide-y divide-slate-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-slate-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-slate-50"
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

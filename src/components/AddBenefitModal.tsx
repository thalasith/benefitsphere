import { Fragment, useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface AddBenefitModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const AddBenefitModal: React.FC<AddBenefitModal> = ({
  openModal,
  setOpenModal,
}) => {
  const { data: sessionData } = useSession();
  const activeClient = sessionData?.user.activeClient ?? 0;
  const { data: clientCountries } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: activeClient,
    });
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [benefitName, setBenefitName] = useState("");
  const [country, setCountry] = useState("");

  const addRiskPlan = api.riskPlan.create.useMutation();

  const handleAddBenefit = () => {
    if (!benefitName || benefitName === "") {
      return;
    }

    if (selectedBenefit === "Risk") {
      console.log("Adding Risk Plan");
      addRiskPlan.mutate({
        clientId: activeClient,
        planName: benefitName,
        country: country,
      });
      Router.reload();
      //   Router.push("/homepage").catch((err) => console.log(err));
    }
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog className="relative z-10 font-sans" onClose={setOpenModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 text-left text-primary shadow-xl transition-all sm:mb-48 sm:w-full sm:max-w-lg sm:py-4">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold">Add Benefit</h1>
                  <XMarkIcon
                    onClick={() => setOpenModal(false)}
                    width={50}
                    className="rounded px-2 hover:bg-gray-500 hover:text-white"
                  />
                </div>

                <div className="mt-4 flex flex-col">
                  <label
                    htmlFor="benefitName"
                    className="block text-sm font-extrabold leading-6"
                  >
                    Benefit Name
                  </label>
                  <input
                    type="text"
                    id="benefitName"
                    name="benefitName"
                    className="rounded border border-primary px-2 py-1"
                    onChange={(e) => setBenefitName(e.target.value)}
                    value={benefitName}
                  />
                </div>
                <div className="mt-2 flex flex-col">
                  <label
                    htmlFor="benefitType"
                    className="block text-sm font-extrabold leading-6"
                  >
                    Benefit Type
                  </label>
                  <select
                    id="benefitType"
                    name="benefitType"
                    className="rounded border border-primary px-2 py-1"
                    onChange={(e) => setSelectedBenefit(e.target.value)}
                    value={selectedBenefit}
                  >
                    <option value="">Select Benefit</option>
                    <option value="Retirement">Retirement Benefit</option>
                    <option value="Risk">Risk Benefit</option>
                    <option value="Health">Health Benefit</option>
                  </select>
                </div>
                <div className="mt-2 flex flex-col">
                  <label
                    htmlFor="country"
                    className="block text-sm font-extrabold leading-6"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="rounded border border-primary px-2 py-1"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value="">Select Country</option>
                    {clientCountries?.map((country) => (
                      <option key={country.id} value={country.country ?? ""}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded bg-primary px-3 py-2 text-white hover:bg-primary-lt"
                    onClick={() => handleAddBenefit()}
                  >
                    Add Benefit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

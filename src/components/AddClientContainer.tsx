import React, { useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { Listbox, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import Container from "./Container";

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];
const industries = [
  "High Tech",
  "Finance",
  "Healthcare",
  "Retail",
  "Manufacturing",
];

export const AddClientContainer: React.FC = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const [clientName, setClientName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(
    industries[0] ?? "High Tech",
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies[0] ?? "USD",
  );

  const handleAddClient = () => {
    if (!clientName) {
      return;
    }

    createClient.mutate({
      clientName,
      industry: selectedIndustry,
      baseCurrency: selectedCurrency,
    });
  };

  const createClient = api.client.create.useMutation();

  return (
    <Container>
      <label
        htmlFor="client-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Client Name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="clientName"
          id="clientName"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter a client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <label
        htmlFor="client-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Currency
      </label>
      <div className="mt-2">
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-md focus:outline-none sm:text-sm">
              <span className="block truncate">{selectedCurrency}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {currencies.map((currency, currencyIdx) => (
                  <Listbox.Option
                    key={currencyIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4 py-2 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={currency}
                  >
                    {(selectedCurrency) => (
                      <>
                        <span
                          className={`block truncate ${
                            selectedCurrency ? "font-medium" : "font-normal"
                          }`}
                        >
                          {currency}
                        </span>
                        {selectedCurrency ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <label
        htmlFor="client-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Industry
      </label>
      <div className="mt-2">
        <Listbox value={selectedIndustry} onChange={setSelectedIndustry}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-md focus:outline-none sm:text-sm">
              <span className="block truncate">{selectedIndustry}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {industries.map((industry, industryIdx) => (
                  <Listbox.Option
                    key={industryIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4 py-2 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={industry}
                  >
                    {(selectedIndustry) => (
                      <>
                        <span
                          className={`block truncate ${
                            selectedIndustry ? "font-medium" : "font-normal"
                          }`}
                        >
                          {industry}
                        </span>
                        {selectedIndustry ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button className="mt-2" onClick={() => handleAddClient()}>
        Submit
      </button>
    </Container>
  );
};

interface DropDownProps {
  selected: string;
  setSelected: (value: string) => void; // Assuming setSelected is a function that updates state
  listOfItems: string[];
}

const DropDown: React.FC<DropDownProps> = ({
  selected,
  setSelected,
  listOfItems,
}) => {
  return (
    <div>
      <label
        htmlFor="client-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Industry
      </label>
      <div className="mt-2">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-md focus:outline-none sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {listOfItems.map((item, itemsIdx) => (
                  <Listbox.Option
                    key={itemsIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4 py-2 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {(selected) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

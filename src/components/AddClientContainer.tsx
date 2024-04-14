import React, { useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { Listbox, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import Container from "./Container";
import { DropDown } from "./Dropdown";

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
      <DropDown
        labelName="Base Currency"
        selected={selectedCurrency}
        setSelected={setSelectedCurrency}
        listOfItems={currencies}
      />
      <DropDown
        labelName="Industry"
        selected={selectedIndustry}
        setSelected={setSelectedIndustry}
        listOfItems={industries}
      />
      <button className="mt-2" onClick={() => handleAddClient()}>
        Submit
      </button>
    </Container>
  );
};

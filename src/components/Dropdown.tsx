import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface DropDownProps {
  labelName: string;
  selected: string;
  setSelected: (value: string) => void; // Assuming setSelected is a function that updates state
  listOfItems: string[];
}

export const DropDown: React.FC<DropDownProps> = ({
  labelName,
  selected,
  setSelected,
  listOfItems,
}) => {
  return (
    <div className="mt-2">
      <label
        htmlFor="client-name"
        className="block text-sm font-medium leading-6 "
      >
        {labelName}
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

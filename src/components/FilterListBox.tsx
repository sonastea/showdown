import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const queries: { name: string }[] = [
  { name: "all" },
  { name: "day" },
  { name: "week" },
];

const FilterListBox: React.FC = () => {
  const [selectedQuery, setQuery] = useState<{ name: string }>({ name: "" });
  const router = useRouter();

  useEffect(() => {
    setQuery(
      (queries.find((query) => query.name === router.query.filter) as {
        name: string;
      }) || queries[0]
    );
  }, [router.query.filter]);

  return (
    <div className="top-8 w-auto sm:w-36 py-4">
      <Listbox value={selectedQuery} onChange={setQuery}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="flex justify-between w-full cursor-default text-mina-950 bg-slate-300 rounded-lg py-2 pr-10 pl-4 text-left shadow-md focus-outline-none focus-visible:border-mina focus-visible:ring-2">
              <span className="font-bold">{selectedQuery?.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 self-center absolute right-0 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Listbox.Button>
            <Transition
              show={open}
              className="fixed z-10 w-auto sm:w-36"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="mt-1 overflow-auto rounded-md text-base ring-1 bg-slate-400">
                {queries.map((query, index) => (
                  <Link
                    key={index}
                    href={`${
                      index === 0 ? "/results" : `/results/${query.name}`
                    }`}
                    legacyBehavior
                  >
                    <Listbox.Option
                      className={({ active }) =>
                        `relative cursor-default select-none pl-10 pr-4 flex items-center justify-between w-full ${
                          active ? "bg-slate-300" : "text-black"
                        }`
                      }
                      value={query}
                    >
                      {({ selected }) => (
                        <>
                          {selected ? (
                            <span className="pl-3 left-0 text-once-800 absolute">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                          <span
                            className={`block truncate text-mina-950 cursor-auto ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {query.name}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  </Link>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default FilterListBox;

import { FC } from "react";
import { TabsInterface } from "../models/tabs.interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Tabs: FC<TabsInterface> = ({
  tabs,
  activeTab,
  onClickHandler,
}) => {
  return (
    <div>
      <div className="sm:hidden px-5 lg:px-7 mb-6">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs[activeTab].name}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            onClickHandler(+event.target.value)
          }
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.code}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                onClick={() => onClickHandler(tab.code)}
                className={classNames(
                  index === activeTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "group inline-flex items-center py-4 border-b-4 font-medium text-sm px-8 cursor-pointer"
                )}
                aria-current={index === activeTab ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    index === activeTab
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

import { SearchCircleIcon, StarIcon } from "@heroicons/react/outline";
import React, { FC, SVGProps, useState } from "react";
import { Link } from "react-router-dom";

interface TabInterface {
  name: string;
  linkTo: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  current: boolean;
}

const tabsValue: TabInterface[] = [
  { name: "Pretraga", linkTo: "/", icon: SearchCircleIcon, current: true },
  {
    name: "Omiljeni",
    linkTo: "/favorites",
    icon: StarIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NavTabs: FC = () => {
  const [tabs, setTabs] = useState(() => tabsValue);

  const activateTab = (tabIndex: number) => {
    setTabs((tabs) =>
      tabs.map((el, index) => ({
        ...el,
        current: index === tabIndex ? true : false,
      }))
    );
  };
  return (
    <div>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <Link
            key={tab.name}
            to={tab.linkTo}
            onClick={() => activateTab(index)}
            className={classNames(
              tab.current
                ? "active-tab-dot text-blue-300"
                : "text-white hover:text-blue-200 ",
              "group inline-flex items-center py-2 font-medium text-md"
            )}
            aria-current={tab.current ? "page" : undefined}
          >
            <tab.icon
              className={classNames(
                tab.current
                  ? "text-blue-200"
                  : "text-white group-hover:text-blue-200",
                "-ml-0.5 mr-2 h-5 w-5"
              )}
              aria-hidden="true"
            />
            <span>{tab.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

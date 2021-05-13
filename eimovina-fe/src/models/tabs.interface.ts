export interface TabsInterface {
  tabs: TabInterface[];
  activeTab: number;
  onClickHandler: (index: number) => void;
}

export interface TabInterface {
  name: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  code: number;
}

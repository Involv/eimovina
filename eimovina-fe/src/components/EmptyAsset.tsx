import { FC } from "react";

interface EmptyAssetProps {
  type: EmptyAssetTypes;
  text?: string;
}

export enum EmptyAssetTypes {
  SEARCH,
  FAVORITE,
}

const mapEmptyAssetTypeToImageFile = (type: EmptyAssetTypes) => {
  switch (type) {
    case EmptyAssetTypes.SEARCH: {
      return "undraw_File_searching_re_3evy.svg";
    }
    case EmptyAssetTypes.FAVORITE: {
      return "undraw_Done_checking_re_6vyx.svg";
    }
    default: {
      return "";
    }
  }
};

export const EmptyAsset: FC<EmptyAssetProps> = ({ type, text }) => {
  const imageSrc = `/empty-assets/${mapEmptyAssetTypeToImageFile(type)}`;
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <img src={imageSrc} className="max-w-xs lg:max-w-sm opacity-80" />
      <div>{text}</div>
    </div>
  );
};

import { useContext } from "react";
import { CreatorProfileContext } from "@/contexts/creatorProfile";

export const useCreatorProfileContext = () => {
  const context = useContext(CreatorProfileContext);

  if (!context) {
    throw Error(
      "Context can be only be used as a children of the context provider"
    );
  }

  return context;
};

import toast from "react-hot-toast";

export const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Successfully copied to clipboard"))
    .catch(() => toast.error("Could not copy to clipboard"));
};

import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = ({ back = true, empty = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (empty) {
    return <div className="w-full h-16" />;
  }

  return (
    <>
      <nav className="flex justify-between items-center text-bw-darkest/50 relative p-4">
        <div className="flex gap-2">
          {back ? (
            <ChevronLeft className="h-6 w-6" onClick={() => router.back()} />
          ) : (
            <ChevronDown
              className={`h-6 w-6 ${isOpen ? "rotate-180" : ""} duration-500`}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          <h6 className="font-bold">Virtual assistant</h6>
        </div>
        <div className="size-8 rounded-full bg-bw-darkest" />
      </nav>
      <div
        className={`${
          isOpen ? "h-24" : "h-0"
        } w-full px-4 flex flex-col gap-2 font-bold duration-500 overflow-clip absolute top-16 bg-bw-light border-b-2 border-bw-main`}
      >
        <div className="flex items-center">
          <div className="size-4 mr-3 bg-green-main ml-1" />
          <h6>Virtual assistant</h6>
        </div>
        <div className="flex items-center">
          <div className="size-4 mr-3 bg-bw-darker rounded-full ml-1" />
          <h6 className="text-bw-darkest/70">Customer service</h6>
        </div>
        <div className="flex items-center text-bw-darkest/70">
          <Plus className="h-6 w-6 mr-2" />
          <h6 className="font-normal">Browse jobs</h6>
        </div>
      </div>
    </>
  );
};

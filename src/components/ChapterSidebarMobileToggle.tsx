import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Shadcn sheet component
import { Menu } from "lucide-react";
import ChapterSidebar from "@/components/ChapterSidebar"; // Your sidebar

const ChapterSidebarMobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open chapters"
          className="md:hidden px-2 py-3  text-primary cursor-pointer hover:text-foreground hover:scale-105 transition duration-100
          absolute -top-12 -right-5
          "
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-[80vw] max-w-xs">
        <ChapterSidebar mobile />
      </SheetContent>
    </Sheet>
  );
};

export default ChapterSidebarMobileToggle;

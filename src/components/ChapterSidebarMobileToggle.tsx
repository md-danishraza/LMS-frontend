import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"; // Shadcn sheet component
import { Menu } from "lucide-react";

import ChapterSidebarContent from "./ChapterSidebarContent";

const ChapterSidebarMobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open chapters"
          className="md:hidden px-2 py-3  text-foreground cursor-pointer hover:text-primary hover:scale-105 transition duration-100
          absolute -top-12 -right-5
          "
        
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="p-0 w-[85vw] max-w-sm overflow-y-auto"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Course Chapters</SheetTitle>
        </SheetHeader>
        <ChapterSidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export default ChapterSidebarMobileToggle;

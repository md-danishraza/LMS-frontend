'use client'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FileText } from 'lucide-react'
function AccordianSections({sections}:{sections:Section[]}) {
  return (
    <Accordion type="multiple" className="w-full">
  {sections.map((section) => (
    <AccordionItem
      key={section.sectionId}
      value={section.sectionTitle}
      className="border border-border bg-background rounded-md overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-3 hover:bg-muted transition-colors">
        <h5 className="text-foreground font-medium text-base">{section.sectionTitle}</h5>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-3">
        <ul className="space-y-1">
          {section.chapters.map((chapter) => (
            <li key={chapter.chapterId} className="flex items-center text-muted-foreground">
              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{chapter.title}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
  )
}

export default AccordianSections

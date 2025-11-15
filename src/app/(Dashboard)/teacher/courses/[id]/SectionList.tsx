'use client';

import {
  openSectionModal,
  openChapterModal,
  deleteSection,
  deleteChapter,
} from '@/state'; 
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { List, Pencil, Plus, Trash, Video, FileText } from 'lucide-react';

const SectionList = () => {
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const onAddSection = () => {
    dispatch(openSectionModal({ sectionIndex: null }));
  };

  const onEditSection = (index: number) => {
    dispatch(openSectionModal({ sectionIndex: index }));
  };

  const onDeleteSection = (index: number) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      dispatch(deleteSection(index));
    }
  };

  const onAddChapter = (sectionIndex: number) => {
    dispatch(openChapterModal({ sectionIndex, chapterIndex: null }));
  };

  const onEditChapter = (sectionIndex: number, chapterIndex: number) => {
    dispatch(openChapterModal({ sectionIndex, chapterIndex }));
  };

  const onDeleteChapter = (sectionIndex: number, chapterIndex: number) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      dispatch(deleteChapter({ sectionIndex, chapterIndex }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Course Content</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={onAddSection}>
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {sections.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No sections created yet. Click "Add Section" to get started.
          </p>
        ) : (
          <Accordion type="multiple" className="w-full">
            {sections.map((section, sectionIndex) => (
              <AccordionItem value={section.sectionId} key={section.sectionId}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    <span className="font-semibold">{section.sectionTitle}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Section Actions */}
                  <div className="flex items-center gap-2 mb-4 ml-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSection(sectionIndex)}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> Edit Section
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDeleteSection(sectionIndex)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Delete Section
                    </Button>
                  </div>

                  {/* Chapters List */}
                  <div className="flex flex-col gap-2 ml-4 pl-4 border-l">
                    {section.chapters.map((chapter, chapterIndex) => (
                      <div
                        key={chapter.chapterId}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
                      >
                        <div className="flex items-center gap-2">
                          {chapter.type === 'Video' ? (
                            <Video className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{chapter.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              onEditChapter(sectionIndex, chapterIndex)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() =>
                              onDeleteChapter(sectionIndex, chapterIndex)
                            }
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {/* Add Chapter Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => onAddChapter(sectionIndex)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Chapter
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionList;
'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChapterFormData, chapterSchema } from '@/lib/schemas';
import {
  addChapter,
  closeChapterModal,
  editChapter
} from '@/state'; // Your import path might be different
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const ChapterModal = () => {
  const dispatch = useAppDispatch();
  
  const {
    isChapterModalOpen,
    selectedSectionIndex,
    selectedChapterIndex,
    sections,
  } = useAppSelector((state) => state.global.courseEditor);

  const chapter: Chapter | undefined =
    selectedSectionIndex !== null && selectedChapterIndex !== null
      ? sections[selectedSectionIndex].chapters[selectedChapterIndex]
      : undefined;

  const form = useForm<ChapterFormData>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: '',
      content: '',
      video: '',
    },
  });

  useEffect(() => {
    if (chapter) {
      form.reset({
        title: chapter.title,
        content: chapter.content,
        video: chapter.video || '',
      });
    } else {
      form.reset({
        title: '',
        content: '',
        video: '',
      });
    }
  }, [chapter, form]);

  const onClose = () => {
    dispatch(closeChapterModal());
  };

  const onSubmit = (data: ChapterFormData) => {
    if (selectedSectionIndex === null) return;

    const newChapter: Chapter = {
      chapterId: chapter?.chapterId || uuidv4(),
      title: data.title,
      content: data.content || '',
      type: data.video ? 'Video' : 'Text',
      video: data.video,
    };

    if (selectedChapterIndex === null) {
      dispatch(
        addChapter({
          sectionIndex: selectedSectionIndex,
          chapter: newChapter,
        })
      );
    } else {
      dispatch(
        editChapter({
          sectionIndex: selectedSectionIndex,
          chapterIndex: selectedChapterIndex,
          chapter: newChapter,
        })
      );
    }

    toast.success('Chapter saved locally. Save the course to apply changes.');
    onClose();
  };

  return (
    <Dialog open={isChapterModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {chapter ? 'Edit Chapter' : 'Add New Chapter'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'What is React?'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Content (Text)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the chapter's text content here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Chapter Video (Optional)</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        {...rest}
                      />
                      {typeof value === 'string' && value && (
                        <div className="my-2 text-sm text-muted-foreground">
                          Current video: {value.split('/').pop()}
                        </div>
                      )}
                      {value instanceof File && (
                        <div className="my-2 text-sm text-muted-foreground">
                          Selected file: {value.name}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Chapter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterModal;
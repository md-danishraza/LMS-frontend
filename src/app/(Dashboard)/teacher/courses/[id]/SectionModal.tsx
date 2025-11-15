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
import { SectionFormData, sectionSchema } from '@/lib/schemas';
import {
  addSection,
  closeSectionModal,
  editSection
} from '@/state'; 
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const SectionModal = () => {
  const dispatch = useAppDispatch();
  
  const { isSectionModalOpen, selectedSectionIndex, sections } = useAppSelector(
    (state) => state.global.courseEditor
  );

  const section =
    selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;

  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (section) {
      form.reset({
        title: section.sectionTitle,
        description: section.sectionDescription,
      });
    } else {
      form.reset({
        title: '',
        description: '',
      });
    }
  }, [section, form]);

  const onClose = () => {
    dispatch(closeSectionModal());
  };

  const onSubmit = (data: SectionFormData) => {
    const newSection: Section = {
      sectionId: section?.sectionId || uuidv4(),
      sectionTitle: data.title,
      sectionDescription: data.description,
      chapters: section?.chapters || [],
    };

    if (selectedSectionIndex === null) {
      dispatch(addSection(newSection));
    } else {
      dispatch(
        editSection({
          index: selectedSectionIndex,
          section: newSection,
        })
      );
    }

    toast.success('Section saved locally. Save the course to apply changes.');
    onClose();
  };

  return (
    <Dialog open={isSectionModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {section ? 'Edit Section' : 'Add New Section'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Introduction'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What will students learn in this section?"
                      {...field}
                    />
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
              <Button type="submit">Save Section</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SectionModal;
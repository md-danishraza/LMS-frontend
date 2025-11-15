import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state for courseEditor
interface InitialStateTypes {
  courseEditor: {
    sections: Section[];
    // add chapter model
    isChapterModalOpen: boolean;
    // add section model
    isSectionModalOpen: boolean;
    // selected section and chapter
    selectedSectionIndex: number | null;
    selectedChapterIndex: number | null;
  };
}

const initialState: InitialStateTypes = {
  courseEditor: {
    sections: [],
    isChapterModalOpen: false,
    isSectionModalOpen: false,
    selectedSectionIndex: null,
    selectedChapterIndex: null,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    // updating/replacing sections state
    setSections: (state, action: PayloadAction<Section[]>) => {
      state.courseEditor.sections = action.payload;
    },
    // set chapter modal open
    // input is section->chapter no. index
    openChapterModal: (
      state,
      action: PayloadAction<{
        sectionIndex: number | null;
        chapterIndex: number | null;
      }>
    ) => {
      state.courseEditor.isChapterModalOpen = true;
      state.courseEditor.selectedSectionIndex = action.payload.sectionIndex;
      state.courseEditor.selectedChapterIndex = action.payload.chapterIndex;
    },
    // set chapter modal close
    closeChapterModal: (state) => {
      state.courseEditor.isChapterModalOpen = false;
      state.courseEditor.selectedSectionIndex = null;
      state.courseEditor.selectedChapterIndex = null;
    },
    // set section modal close
    // input is section no. index
    openSectionModal: (
      state,
      action: PayloadAction<{ sectionIndex: number | null }>
    ) => {
      state.courseEditor.isSectionModalOpen = true;
      state.courseEditor.selectedSectionIndex = action.payload.sectionIndex;
    },
    closeSectionModal: (state) => {
      state.courseEditor.isSectionModalOpen = false;
      state.courseEditor.selectedSectionIndex = null;
    },

    // adding new section - push
    addSection: (state, action: PayloadAction<Section>) => {
      state.courseEditor.sections.push(action.payload);
    },
    // edit a section with index and section
    editSection: (
      state,
      action: PayloadAction<{ index: number; section: Section }>
    ) => {
      state.courseEditor.sections[action.payload.index] =
        action.payload.section;
    },
    // delete a section with index
    deleteSection: (state, action: PayloadAction<number>) => {
      state.courseEditor.sections.splice(action.payload, 1);
    },

    // add chapter within a section
    // pushing new chapter
    addChapter: (
      state,
      action: PayloadAction<{ sectionIndex: number; chapter: Chapter }>
    ) => {
      state.courseEditor.sections[action.payload.sectionIndex].chapters.push(
        action.payload.chapter
      );
    },
    // edit chapter
    // input - section and chapter id and chapter
    editChapter: (
      state,
      action: PayloadAction<{
        sectionIndex: number;
        chapterIndex: number;
        chapter: Chapter;
      }>
    ) => {
      state.courseEditor.sections[action.payload.sectionIndex].chapters[
        action.payload.chapterIndex
      ] = action.payload.chapter;
    },
    // delete chapter
    // input - section and chapter id
    deleteChapter: (
      state,
      action: PayloadAction<{ sectionIndex: number; chapterIndex: number }>
    ) => {
      state.courseEditor.sections[action.payload.sectionIndex].chapters.splice(
        action.payload.chapterIndex,
        1
      );
    },
  },
});

export const {
  setSections,
  // modals
  openChapterModal,
  closeChapterModal,
  openSectionModal,
  closeSectionModal,
  // section
  addSection,
  editSection,
  deleteSection,
  // chapter
  addChapter,
  editChapter,
  deleteChapter,
} = globalSlice.actions;

export default globalSlice.reducer;

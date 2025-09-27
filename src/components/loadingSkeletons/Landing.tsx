"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {motion} from "framer-motion"
function LandingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-3/4"
    >
      {/* Hero Section Skeleton */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-secondary"
      >
        {/* Content Skeleton */}
        <div className="basis-1/2 px-16 mx-auto">
          <Skeleton className="h-10 w-48 mb-4" /> {/* Title */}
          <Skeleton className="h-6 w-full max-w-md mb-2" />
          <Skeleton className="h-6 w-full max-w-sm mb-6" /> {/* Paragraph */}
          <Skeleton className="h-10 w-40 rounded-md" /> {/* CTA Button */}
        </div>

        {/* Image Skeleton */}
        <div className="basis-1/2 h-full relative overflow-hidden rounded-r-lg">
          <Skeleton className="absolute inset-0 w-full h-full rounded-r-lg" />
        </div>
      </motion.div>

      {/* Tags and Courses Skeleton */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="mx-auto py-12 mt-10"
      >
        <Skeleton className="h-8 w-64 mb-4" /> {/* Section Title */}
        <Skeleton className="h-6 w-full max-w-xl mb-8" /> {/* Description */}
        {/* Tag Skeletons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        {/* Course Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" /> {/* Image */}
              <Skeleton className="h-6 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-1/2" /> {/* Subtitle */}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LandingSkeleton;

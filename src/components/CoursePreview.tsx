
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const CoursePreview = ({ course }: {course:Course}) => {
  return (
    <div className="w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Course Details */}
            <div className="flex items-center gap-4">
              <img
                src={course.image}
                alt={course.title}
                width={160}
                height={90}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  You are purchasing this course.
                </p>
              </div>
            </div>
            <Separator />
            {/* Price Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Order Summary</h4>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Course Price:</span>
                <span className="font-semibold">
                  ${course.price?.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total Price:</span>
                <span className="text-primary">
                  ${course.price?.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default CoursePreview;
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreVertical,
  Edit,
  Trash,
  Eye,
  CheckCircle,
  ListTodo ,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

type prop = {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => Promise<void>;
  isOwner: boolean; // Corrected to lowercase 'boolean'
};

function TeacherCourseCard({ course, onEdit, onDelete, isOwner }: prop) {

  return (
    <Card className="pt-0 pb-5 flex flex-col h-full shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Card Image */}
      <div className="relative aspect-video">
        <Image
          src={
            course.image || 'https://placehold.co/600x400.png?text=ProLearn'

          }
          fill
            className="object-cover w-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority

          alt={course.title}
        />
        {/* Status Badge */}
        <Badge
          className="absolute top-3 right-3"
          variant={course.status === 'Published' ? 'default' : 'secondary'}
        >
          {course.status === 'Published' ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <ListTodo className="h-3 w-3 mr-1" />
          )}
          {course.status}
        </Badge>
      </div>

      {/* Card Content */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold leading-snug truncate">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">
            {course.price ? formatPrice(course.price) : 'Free'}
          </p>
          <Badge variant="outline">{course.category}</Badge>
        </div>
      </CardContent>

      {/* Card Footer with Actions */}
      <CardFooter className="border-t pt-4">
        {isOwner ? (
          // --- Owner Actions ---
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" className='cursor-pointer' size="sm" onClick={() => onEdit(course)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={() => onDelete(course)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          // --- Non-Owner Action ---
          <Button asChild size="sm" className="w-full">
            <Link href={`/courses/${course.courseId}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Course
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default TeacherCourseCard;
import {
    Card,
    CardContent,
    CardTitle,
    CardFooter,
  } from '@/components/ui/card';
  import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
  import NextImage from 'next/image'; // Renamed to avoid TS error
  import { formatPrice } from '@/lib/utils';

  import { Progress } from '@/components/ui/progress';
  import { Badge } from '@/components/ui/badge';

  import { PlayCircle } from 'lucide-react';
  
  
  
  interface UserCourseCardProps {
    course: Course;
    onGoToCourse: (course: Course) => void;
  }
  
  const UserCourseCard = ({ course, onGoToCourse }: UserCourseCardProps) => {
    console.log(course)
    return (
      <Card
        className="flex flex-col h-full shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer group p-0 gap-0"
        onClick={() => onGoToCourse(course)}
      >
        {/* Image Header */}
        <div className="relative aspect-video">
          <NextImage
            src={
              course.image ||
              'https://placehold.co/600x400/000000/FFFFFF?text=ProLearn'
            }
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="h-12 w-12 text-white/90" />
          </div>
        </div>
  
        {/* Content */}
        <CardContent className="flex flex-col flex-grow p-4 space-y-3">
          <CardTitle className="text-lg font-semibold leading-snug truncate">
            {course.title}
          </CardTitle>
  
          {/* Teacher Info */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="" alt={course.teacherName} />
              <AvatarFallback>
                {course.teacherName[0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{course.teacherName}</p>
          </div>
  
          {/* --- Progress Bar --- */}
          <div className="flex-grow" />
          <div className="space-y-1 pt-2">
            <Progress value={course.overallProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.overallProgress || 0}% Complete
            </p>
          </div>
        </CardContent>
  
        {/* Footer */}
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Badge variant="outline">{course.category}</Badge>
          <span className="text-base font-semibold text-primary">
            {formatPrice(course.price)}
          </span>
        </CardFooter>
      </Card>
    );
  };
  
  export default UserCourseCard;
import Link from 'next/link';

export default function TeacherCoursesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Teacher Dashboard</h1>
      <p className="mt-4 text-muted-foreground">Redirect was successful!</p>
      <Link href="/" className="mt-6 text-primary hover:underline">
        Go back home
      </Link>
    </div>
  );
}
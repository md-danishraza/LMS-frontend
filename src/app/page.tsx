import NonDashboardNavbar from "@/components/NonDashboardNavbar";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NonDashboardNavbar/>
      <main className=" flex flex-grow w-full h-full justify-center items-center">
        {/* landing */}
        <h1 className="text-center text-4xl font-primary">Hello world</h1>
      </main>
      {/* footer */}
    </div>
  );
}

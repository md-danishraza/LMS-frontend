
import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "./(NonDashboard)/landing/page";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NonDashboardNavbar/>
      <main className=" flex flex-grow w-full h-full justify-center items-center">
        {/* landing */}
        <Landing/>
        
        
      </main>
      {/* footer */}
      <Footer/>
    </div>
  );
}

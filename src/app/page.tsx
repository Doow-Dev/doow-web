import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { Landing } from "@/components/layout/Landing";

export default function Home() {
  return (
      <>
        <Header/>
        <main>
          <Landing/>
        </main>
        <Footer/>
      </>
  );
}

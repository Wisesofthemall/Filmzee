import Navbar from "./components/Navbar";
import LoginModal from "./components/modals/LoginModal";

export default function Home() {
  return (
    <main className="">
      <LoginModal />
      <Navbar />
    </main>
  );
}

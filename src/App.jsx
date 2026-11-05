import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import HomePage from "./pages/HomePage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleViewApartment = apt => {
    setSelectedApartment(apt);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = target => {
    setPage(target);
    if (target !== "detail") setSelectedApartment(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onNavigate={handleNavigate} currentPage={page} onBook={() => setBookingOpen(true)} />

      <main style={{ flex: 1 }}>
        {page === "home" && (
          <HomePage onViewApartment={handleViewApartment} onBook={() => setBookingOpen(true)} />
        )}
        {page === "detail" && selectedApartment && (
          <ApartmentDetailPage apartment={selectedApartment} onBack={() => handleNavigate("home")} />
        )}
      </main>

      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
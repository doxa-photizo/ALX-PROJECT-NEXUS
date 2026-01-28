import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar
        navigationLink={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Nexus Store</h1>
          <p className="text-lg text-gray-700">
            Discover the latest tech gadgets and accessories at unbeatable prices.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

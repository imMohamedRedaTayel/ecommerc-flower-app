import Footer from "@/components/layout/components/footer";
import Header from "@/components/layout/components/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      {children}

      {/* Footer */}
      <Footer />
    </>
  );
}

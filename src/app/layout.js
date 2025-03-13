import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navbar from "@/components/component-client/comp-navigasi/Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Tambahkan variasi yang diperlukan
});

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SIBALOG",
  description:
    "SIBALOG - APLIKASI REQUEST NOTA DINAS & PANTAU HARWAT BAGLOG POLRES KARIMUN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} cz-shortcut-listen="true">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

// Hapus semua kode sebelumnya di page.tsx dan ganti dengan ini:
import ContentDisplay from '../components/contentDisplay'; //

export default function Home() {
  return (
    <div className="h-full w-full"> {/* Pastikan container mengambil tinggi penuh */}
      <ContentDisplay />
    </div>
  );
}
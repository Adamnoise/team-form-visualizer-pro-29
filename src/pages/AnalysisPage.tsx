
import { Header } from "@/components/Header";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-3xl font-bold text-gradient-blue mb-6">V-Sports Elemzés</h1>
        <p className="text-gray-300">
          Ez az oldal a V-Sports elemzési adatait fogja tartalmazni. Jelenleg fejlesztés alatt áll.
        </p>
      </div>
    </div>
  );
}


import { Header } from "@/components/Header";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16 max-w-md">
        <h1 className="text-3xl font-bold text-gradient-blue mb-6">Regisztráció</h1>
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <p className="text-gray-300 mb-4">
            Ez a regisztrációs űrlap jelenleg fejlesztés alatt áll.
          </p>
          <div className="h-8 bg-white/10 rounded-md mb-4"></div>
          <div className="h-8 bg-white/10 rounded-md mb-4"></div>
          <div className="h-8 bg-white/10 rounded-md mb-6"></div>
          <div className="h-10 bg-blue-600/80 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

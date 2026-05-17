import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">ŞarjRota</span>
          </Link>
          <p className="text-slate-400 text-sm text-center md:text-left max-w-md">
            Elektrikli araç sürücüleri için yapay zeka ve gerçek verilerle güçlendirilmiş rota ve şarj planlama asistanı.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
          <Link to="/gizlilik-politikasi" className="text-slate-400 hover:text-white transition-colors">
            Gizlilik Politikası
          </Link>
          <Link to="/kullanim-sartlari" className="text-slate-400 hover:text-white transition-colors">
            Kullanım Şartları
          </Link>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-400">
            © {new Date().getFullYear()} ŞarjRota. Tüm hakları saklıdır.
          </span>
        </div>
      </div>
    </footer>
  );
}

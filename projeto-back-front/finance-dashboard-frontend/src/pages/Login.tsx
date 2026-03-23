import React, { useState } from 'react';
import { LayoutDashboard, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/authenticate', { email, password });
      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token);
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-emerald-500/10 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-emerald-500 p-4 rounded-2xl mb-6 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <LayoutDashboard className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">
              Finance<span className="text-emerald-500">Pulse</span>
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <ShieldCheck className="text-emerald-500" size={14} />
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Acesso Seguro JWT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617] border border-emerald-500/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                  placeholder="nome@exemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Senha de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617] border border-emerald-500/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 py-3 rounded-xl">
                <p className="text-rose-500 text-xs text-center font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm"
            >
              {loading ? 'Validando...' : (
                <>
                  Entrar no Sistema
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Novo por aqui? <Link to="/register" className="text-emerald-500 hover:text-emerald-400 transition-colors">Criar conta profissional</Link>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          Powered by High-Performance Engine &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default Login;

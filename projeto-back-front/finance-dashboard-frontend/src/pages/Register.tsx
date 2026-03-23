import React, { useState } from 'react';
import { LayoutDashboard, User, Mail, Lock, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', {
        ...formData,
        role: 'USER'
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta. Tente outro e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-emerald-500/10 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-500 p-4 rounded-2xl mb-6 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <UserPlus className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">
              Criar <span className="text-emerald-500">Conta</span>
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <ShieldCheck className="text-emerald-500" size={14} />
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Protocolo Seguro</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Nome</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={16} />
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full bg-[#020617] border border-emerald-500/10 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-xs font-medium"
                    placeholder="João"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Sobrenome</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full bg-[#020617] border border-emerald-500/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-xs font-medium"
                  placeholder="Silva"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#020617] border border-emerald-500/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                  placeholder="nome@exemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Senha de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#020617] border border-emerald-500/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 py-3 rounded-xl">
                <p className="text-rose-500 text-[10px] text-center font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm"
            >
              {loading ? 'Cadastrando...' : (
                <>
                  Finalizar Registro
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Já possui conta? <Link to="/login" className="text-emerald-500 hover:text-emerald-400 transition-colors">Acessar terminal</Link>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          FinancePulse Infrastructure &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default Register;

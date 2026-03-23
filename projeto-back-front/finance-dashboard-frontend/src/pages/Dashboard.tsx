import React, { useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Activity, LayoutDashboard, LogOut, 
  Search, Filter, ArrowUpRight, ArrowDownRight, Wallet, 
  Bell, Settings, ChevronRight
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Asset {
  id: number;
  symbol: string;
  name: string;
  currentPrice: number;
  dailyChange: number;
}

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  // Buscar dados iniciais com React Query
  const { data: assets } = useQuery<Asset[]>({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await api.get('/assets');
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  // WebSocket para atualizações em tempo real
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/assets', (message) => {
        const updatedAssets: Asset[] = JSON.parse(message.body);
        queryClient.setQueryData(['assets'], updatedAssets);
        
        const current = updatedAssets.find(a => a.symbol === selectedAsset);
        if (current) {
          setHistory(prev => [...prev.slice(-29), { 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
            price: current.currentPrice 
          }]);
        }
      });
    });

    return () => {
      if (stompClient.connected) stompClient.disconnect(() => {});
    };
  }, [queryClient, selectedAsset]);

  // Lógica de Filtro e Busca
  const filteredAssets = useMemo(() => {
    if (!assets) return [];
    return assets
      .filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(asset => {
        if (activeFilter === 'gainers') return asset.dailyChange > 0;
        if (activeFilter === 'losers') return asset.dailyChange < 0;
        return true;
      });
  }, [assets, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Sidebar Simulada */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-[#0f172a]/50 border-r border-emerald-500/10 flex flex-col items-center py-8 gap-8 z-50 backdrop-blur-xl">
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <nav className="flex flex-col gap-6">
          <div className="p-3 text-emerald-500 bg-emerald-500/10 rounded-xl cursor-pointer"><Activity size={22} /></div>
          <div className="p-3 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"><Wallet size={22} /></div>
          <div className="p-3 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"><Bell size={22} /></div>
          <div className="p-3 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"><Settings size={22} /></div>
        </nav>
        <button onClick={logout} className="mt-auto p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
          <LogOut size={22} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="pl-20 p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Mercado em <span className="text-emerald-500">Tempo Real</span></h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Conectado ao Live Stream FinancePulse
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar ativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f172a] border border-emerald-500/20 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {assets?.slice(0, 4).map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => setSelectedAsset(asset.symbol)}
              className={cn(
                "group relative bg-[#0f172a] border border-emerald-500/10 p-6 rounded-[2rem] cursor-pointer transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.2)]",
                selectedAsset === asset.symbol && "border-emerald-500/60 bg-emerald-500/[0.03]"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500">
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{asset.symbol}</h3>
                    <p className="text-slate-500 text-xs">{asset.name}</p>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                  asset.dailyChange >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {asset.dailyChange >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(asset.dailyChange).toFixed(2)}%
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs mb-1 font-medium">Preço Atual</span>
                <span className="text-2xl font-black text-white">$ {asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-[#0f172a] border border-emerald-500/10 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Análise Profissional: <span className="text-emerald-500">{selectedAsset}</span>
                </h2>
                <p className="text-slate-500 text-sm">Visualização de performance em alta frequência</p>
              </div>
              <div className="flex bg-[#020617] p-1 rounded-xl border border-emerald-500/10">
                {['1H', '4H', '1D', '1W'].map((t) => (
                  <button key={t} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", t === '1H' ? "bg-emerald-500 text-white" : "text-slate-500 hover:text-emerald-400")}>{t}</button>
                ))}
              </div>
            </div>
            
            <div className="h-[450px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #10b98133', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" animationDuration={300} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-[#0f172a] border border-emerald-500/10 p-8 rounded-[2.5rem] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Ativos</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={cn("p-2 rounded-lg transition-all", activeFilter === 'all' ? "bg-emerald-500/20 text-emerald-500" : "text-slate-500 hover:text-emerald-400")}
                >
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'gainers', label: 'Altas' },
                { id: 'losers', label: 'Baixas' }
              ].map((f) => (
                <button 
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                    activeFilter === f.id ? "bg-emerald-500 border-emerald-500 text-white" : "bg-transparent border-emerald-500/20 text-slate-400 hover:border-emerald-500/50"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {filteredAssets.map((asset) => (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset.symbol)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all group border border-transparent",
                    selectedAsset === asset.symbol ? "bg-emerald-500/10 border-emerald-500/20" : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-colors",
                      selectedAsset === asset.symbol ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-500"
                    )}>
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{asset.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white text-sm">$ {asset.currentPrice.toFixed(2)}</p>
                    <p className={cn(
                      "text-[10px] font-bold flex items-center justify-end gap-1",
                      asset.dailyChange >= 0 ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {asset.dailyChange >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {Math.abs(asset.dailyChange).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
              {filteredAssets.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-slate-500 text-sm italic">Nenhum ativo encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b98133; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b98166; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;

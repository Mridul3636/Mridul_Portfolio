import React, { useState } from 'react';
import { Truck, Send, Bot, Sparkles, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

export const CustomizerSimulator: React.FC = () => {
  const [side, setSide] = useState<'front' | 'back' | 'sleeve'>('front');
  const [text, setText] = useState('MINHAZUR / 3636');
  const [baseColor, setBaseColor] = useState<'#090d16' | '#1e293b' | '#7f1d1d' | '#f8fafc'>('#090d16');
  const [textColor, setTextColor] = useState('#ff6426');
  const [printSize, setPrintSize] = useState<'A6' | 'A4' | 'A3'>('A4');

  const basePrice = 1450;
  const printCost = printSize === 'A6' ? 150 : printSize === 'A4' ? 250 : 450;
  const totalPrice = basePrice + printCost;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-950 border border-brand-pink/30 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-brand-pink uppercase font-bold">Fabric.js 2D Canvas Engine Simulator</span>
          <h4 className="font-display font-bold text-xl text-white">In-Browser Apparel Tailoring Studio</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Side:</span>
          {(['front', 'back', 'sleeve'] as const).map(s => (
            <button
              key={s}
              onClick={() => { soundEngine.playClick(); setSide(s); }}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize font-bold ${
                side === s ? 'bg-brand-pink text-black' : 'bg-surface-850 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Canvas Visualizer */}
        <div className="lg:col-span-6 flex items-center justify-center p-8 bg-surface-900 rounded-2xl border border-white/10 relative min-h-[300px]">
          <div 
            className="w-56 h-72 rounded-3xl transition-all duration-300 relative flex flex-col items-center justify-center border border-white/20 shadow-2xl"
            style={{ backgroundColor: baseColor }}
          >
            <span className="text-[10px] font-mono text-white/40 absolute top-3">
              {side.toUpperCase()} VIEW
            </span>

            <div className="w-40 h-36 border-2 border-dashed border-brand-pink/60 rounded-xl p-3 flex flex-col items-center justify-center relative bg-white/[0.02]">
              <span className="text-[9px] font-mono text-brand-pink absolute -top-2.5 px-1 bg-surface-900 rounded">
                Size {printSize} DTF
              </span>
              <span 
                className="font-display font-black text-center text-sm sm:text-base tracking-wider transition-all"
                style={{ color: textColor }}
              >
                {text || 'CUSTOM APPAREL'}
              </span>
              <span className="text-[9px] font-mono text-white/50 mt-2">
                Vector 300 DPI Export
              </span>
            </div>

            <span className="text-[10px] font-mono text-white/30 absolute bottom-3">
              SIIRHAM LABS
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1.5">Custom Print Label:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-surface-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-brand-pink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">Garment Shade:</label>
              <div className="flex gap-2">
                {[
                  { col: '#090d16', name: 'Onyx' },
                  { col: '#1e293b', name: 'Slate' },
                  { col: '#7f1d1d', name: 'Crimson' },
                  { col: '#f8fafc', name: 'White' },
                ].map(c => (
                  <button
                    key={c.col}
                    onClick={() => { soundEngine.playClick(); setBaseColor(c.col as any); }}
                    className={`w-7 h-7 rounded-full border ${baseColor === c.col ? 'ring-2 ring-brand-pink ring-offset-2 ring-offset-black' : 'border-white/20'}`}
                    style={{ backgroundColor: c.col }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">Print Color:</label>
              <div className="flex gap-2">
                {['#ff6426', '#38bdf8', '#ec4899', '#eab308', '#ffffff'].map(c => (
                  <button
                    key={c}
                    onClick={() => { soundEngine.playClick(); setTextColor(c); }}
                    className={`w-7 h-7 rounded-full border ${textColor === c ? 'ring-2 ring-white' : 'border-white/20'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1.5">Print Bounding Box:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['A6', 'A4', 'A3'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => { soundEngine.playClick(); setPrintSize(b); }}
                  className={`p-2 rounded-xl text-center text-xs font-mono border transition-all ${
                    printSize === b 
                      ? 'bg-brand-pink/20 border-brand-pink text-white font-bold'
                      : 'bg-surface-850 border-white/10 text-slate-400'
                  }`}
                >
                  Size {b}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-900 border border-brand-pink/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Dynamic Real-Time Price</span>
              <span className="text-xs font-mono text-slate-300">Base ৳{basePrice} + DTF ৳{printCost}</span>
            </div>
            <span className="font-display font-black text-2xl text-brand-pink">
              ৳{totalPrice} BDT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogisticsSimulator: React.FC = () => {
  const [city, setCity] = useState('Dhaka');
  const [zone, setZone] = useState('Dhanmondi');
  const [area, setArea] = useState('Road 27 / Rangs Fortune');
  const [status, setStatus] = useState<'idle' | 'generating' | 'created'>('idle');
  const [consignmentId, setConsignmentId] = useState('');

  const handleBook = () => {
    soundEngine.playTerminalTick();
    setStatus('generating');
    setTimeout(() => {
      soundEngine.playSuccess();
      setConsignmentId('PTH-' + Math.floor(100000 + Math.random() * 900000));
      setStatus('created');
    }, 500);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-950 border border-brand-sky/30 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-brand-sky uppercase font-bold">Pathao Merchant REST API Engine</span>
          <h4 className="font-display font-bold text-xl text-white">Automated 1-Click Parcel Consignment Dispatch</h4>
        </div>
        <span className="px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/30 text-brand-sky text-xs font-mono">
          Bearer Token Lifecycle
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1.5">City (AJAX Dropdown):</label>
          <select 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-surface-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-sky"
          >
            <option value="Dhaka">Dhaka (Inside City)</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1.5">Zone (Cascading):</label>
          <select 
            value={zone} 
            onChange={(e) => setZone(e.target.value)}
            className="w-full bg-surface-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-sky"
          >
            <option value="Dhanmondi">Dhanmondi</option>
            <option value="Gulshan">Gulshan</option>
            <option value="Uttara">Uttara</option>
            <option value="Mirpur">Mirpur</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1.5">Delivery Area:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-surface-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-sky"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-300 block font-semibold">
            Delivery SLA: {city === 'Dhaka' ? '24 Hours (৳60 BDT)' : '48-72 Hours (৳120 BDT)'}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            COD Amount: ৳1,700 BDT
          </span>
        </div>

        <button
          onClick={handleBook}
          disabled={status === 'generating'}
          className="px-6 py-2.5 rounded-xl bg-brand-sky text-black font-mono font-bold text-xs flex items-center gap-2 hover:opacity-90"
        >
          <Truck className="w-4 h-4" />
          <span>{status === 'generating' ? 'Booking Consignment...' : 'Book Pathao Consignment'}</span>
        </button>
      </div>

      {status === 'created' && (
        <div className="p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald/30 text-xs font-mono text-brand-emerald flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-bold block">Consignment Successfully Created</span>
              <span>Consignment ID: {consignmentId} • Status: In Review → Assigned to Rider</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-brand-emerald text-black font-bold text-[10px]">
            LIVE
          </span>
        </div>
      )}
    </div>
  );
};

export const TelegramErpSimulator: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'SRH-9041', customer: 'Tanvir Ahmed', phone: '+880 1711-XXXXXX', item: 'Cyberpunk Heavy Tee (Size: XL)', cod: '৳1,700', status: 'Pending' }
  ]);

  const handleOrder = () => {
    soundEngine.playChime();
    const newId = 'SRH-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: newId,
      customer: 'Siam Rahman',
      phone: '+880 1819-XXXXXX',
      item: 'Vintage Washed Hoodie (Size: L)',
      cod: '৳2,450',
      status: 'In Review'
    };
    setOrders([newOrder, ...orders]);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-950 border border-brand-yellow/30 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase font-bold">Telegram Bot Webhook ERP</span>
          <h4 className="font-display font-bold text-xl text-white">Instant Order Alerts & 1-Touch Admin Dispatches</h4>
        </div>
        <button
          onClick={handleOrder}
          className="px-4 py-2 rounded-xl bg-brand-yellow text-black font-mono font-bold text-xs flex items-center gap-2 hover:opacity-90"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Simulate Customer Order</span>
        </button>
      </div>

      <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#17212b] border border-white/10 text-white space-y-3 shadow-2xl">
        <div className="flex items-center gap-3 pb-2 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-brand-sky flex items-center justify-center text-black font-bold text-xs">
            <Bot className="w-4 h-4 text-black" />
          </div>
          <div>
            <span className="text-xs font-bold block">SIIRHAM ERP Bot (@siirham_dispatch_bot)</span>
            <span className="text-[10px] text-slate-400 font-mono">Private Admin Group</span>
          </div>
        </div>

        <div className="text-xs font-mono space-y-1.5 text-slate-200">
          <div className="text-brand-yellow font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> NEW ORDER RECEIVED!
          </div>
          <div>Order ID: <span className="text-white font-bold">{orders[0].id}</span></div>
          <div>Customer: {orders[0].customer} ({orders[0].phone})</div>
          <div>Item: {orders[0].item}</div>
          <div>COD Collectable: <span className="text-brand-emerald font-bold">{orders[0].cod}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button 
            onClick={() => {
              soundEngine.playSuccess();
              alert('Order marked APPROVED via Telegram Webhook callback!');
            }}
            className="py-1.5 rounded-lg bg-[#2b5278] hover:bg-[#346696] text-[11px] font-mono font-bold text-white transition-colors"
          >
            1-Click Approve
          </button>
          <button 
            onClick={() => soundEngine.playClick()}
            className="py-1.5 rounded-lg bg-surface-800 hover:bg-surface-750 text-[11px] font-mono text-slate-300 transition-colors"
          >
            View DTF Mockup
          </button>
        </div>
      </div>
    </div>
  );
};

export const InventoryMatrixSimulator: React.FC = () => {
  const [stock, setStock] = useState<Record<string, number>>({
    'S': 14,
    'M': 28,
    'L': 35,
    'XL': 8,
    '2XL': 3,
    '3XL': 0
  });

  const handleDeplete = (size: string) => {
    soundEngine.playClick();
    if (stock[size] > 0) {
      setStock(prev => ({ ...prev, [size]: prev[size] - 1 }));
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-950 border border-brand-emerald/30 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-brand-emerald uppercase font-bold">Role-Based Access Control (RBAC) Matrix</span>
          <h4 className="font-display font-bold text-xl text-white">SKU Size-Matrix Stock Tracking & Anti-Oversell</h4>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Click size pill to simulate real-time purchase depletion:
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(stock).map(([size, count]) => (
          <button
            key={size}
            onClick={() => handleDeplete(size)}
            className={`p-4 rounded-2xl border text-center transition-all ${
              count === 0 
                ? 'bg-red-950/40 border-red-500/40 text-red-400' 
                : count < 5 
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-400 hover:scale-105'
                : 'bg-surface-900 border-white/10 text-white hover:border-brand-emerald'
            }`}
          >
            <span className="text-xs font-mono font-bold block mb-1">Size {size}</span>
            <span className="font-display font-black text-2xl block">
              {count}
            </span>
            <span className="text-[10px] font-mono uppercase block mt-1">
              {count === 0 ? 'Out of Stock' : count < 5 ? 'Low Stock' : 'In Stock'}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
        <span>SQL Atomic Transaction Locking: Ensures 0% overselling across 500+ active SKU variations.</span>
        <span className="text-brand-emerald font-bold flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> VERIFIED
        </span>
      </div>
    </div>
  );
};

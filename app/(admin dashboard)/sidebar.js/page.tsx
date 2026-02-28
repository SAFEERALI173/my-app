"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,  
  Stethoscope, 
  ClipboardList,  
  LogOut, 
  ChevronRight,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Menu Items categorized by Roles
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, role: 'all' },
    { name: 'Admin Panel', href: '/admin', icon: ShieldCheck, role: 'admin' },
    { name: 'Doctor Panel', href: '/doctor', icon: Stethoscope, role: 'doctor' },
    { name: 'Receptionist', href: '/receptionist', icon: UserPlus, role: 'receptionist' },
    { name: 'Patient Records', href: '/records', icon: ClipboardList, role: 'all' },
  ];

  return (
    <div className={`flex flex-col h-screen bg-[#0a0f1d] border-r border-white/10 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-cyan-500 p-2 rounded-lg">
          <Stethoscope className="text-white" size={20} />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold text-white tracking-tight">
            Health<span className="text-cyan-400">Core</span>
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={`group flex items-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive 
                ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}>
                <Icon size={22} className={isActive ? 'text-cyan-400' : 'group-hover:scale-110 transition-transform'} />
                {!isCollapsed && (
                  <div className="ml-4 flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section (User & Logout) */}
      <div className="p-4 border-t border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-3 p-2 mb-4 bg-white/5 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Dr. Ahmed</p>
              <p className="text-xs text-slate-500 truncate">Admin Access</p>
            </div>
          </div>
        )}
        
        <Link href="/login">
          <button className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all group">
            <LogOut size={22} />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </Link>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-cyan-500 text-white rounded-full p-1 border-2 border-[#0a0f1d] hover:scale-110 transition-transform"
      >
        <ChevronRight size={14} className={isCollapsed ? '' : 'rotate-180'} />
      </button>
    </div>
  );
};

export default Sidebar;
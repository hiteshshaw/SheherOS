import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, Award, ShieldAlert, ChevronRight, Zap } from 'lucide-react';

const MAIN_NAV_ITEMS = [
  { name: 'Home',        id: 'home',        emoji: '🏠' },
  { name: 'Report',      id: 'report',      emoji: '📸' },
  { name: 'Live Map',    id: 'map',         emoji: '🗺️' },
  { name: 'Track',       id: 'track',       emoji: '📋' },
  { name: 'Dashboard',   id: 'admin',       emoji: '🛠️' },
];

const DROPDOWN_NAV_ITEMS = [
  { name: 'Verify',      id: 'verify',      emoji: '✅' },
  { name: 'Leaderboard', id: 'leaderboard', emoji: '🏆' },
  { name: 'About',       id: 'about',       emoji: 'ℹ️' },
];

export default function Navbar({ activePage, setActivePage, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const notifications = [
    { id: 1, text: 'Report CS-7711 (Water Leakage) is awaiting community verification.', time: '10 mins ago', unread: true },
    { id: 2, text: 'Issue CS-9081 (Pothole) status changed to In Progress.', time: '2 hours ago', unread: true },
    { id: 3, text: 'You earned +20 points for reporting a verified issue!', time: '1 day ago', unread: false },
    { id: 4, text: 'CS-6523 (Broken Streetlight) needs citizen proof upload.', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setActivePage(id);
    setIsOpen(false);
    setShowNotifications(false);
    setShowMenu(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowMenu(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-slate-950/95 shadow-premium-lg border-b border-slate-800/80'
        : 'bg-slate-900/90 border-b border-slate-800/60'
    } backdrop-blur-xl text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={() => handleNav('home')}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-glow-blue group-hover:shadow-lg transition-all duration-300 animate-pulse-subtle">
                <ShieldAlert className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-emerald-400 rounded-full border border-slate-900 animate-pulse"></div>
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-base font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                SheherOS
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">Report. Verify. Track. Solve.</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {MAIN_NAV_ITEMS.map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 bg-blue-600/90 rounded-lg shadow-glow-blue"></span>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}

            {/* Dropdown for verify, leaderboard, about */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>•••</span>
              </button>
              {showMenu && (
                <div className="absolute left-0 mt-2 w-48 card-dark shadow-premium-lg z-50 overflow-hidden border border-slate-800 bg-slate-950/95 backdrop-blur-md rounded-xl py-1">
                  {DROPDOWN_NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right widgets */}
          <div className="flex items-center gap-2.5">
            {/* Points badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full">
              <Award className="h-3.5 w-3.5 text-amber-400 animate-bounce" style={{ animationDuration: '2s' }} />
              <span className="text-amber-400 font-black text-xs">{userProfile.points}</span>
              <span className="text-slate-500 text-[10px]">pts</span>
            </div>

            {/* Badge chip */}
            <div className="hidden md:flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
              <Zap className="h-3 w-3 text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-300 truncate max-w-[120px]">{userProfile.badge}</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => { setShowNotifications(!showNotifications); setIsOpen(false); }}
                className="relative p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-slate-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Admin Dashboard shortcut */}
              <button
                id="admin-dashboard-btn"
                onClick={() => { handleNav('admin'); }}
                className="ml-2 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                title="Admin Dashboard"
              >
                <ShieldAlert className="h-4 w-4" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 card-dark shadow-premium-lg z-50 page-transition overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/80">
                    <span className="font-bold text-sm text-slate-100">Activity Feed</span>
                    <span className="text-[10px] font-bold text-blue-400 cursor-pointer hover:text-blue-300 px-2 py-0.5 bg-blue-500/10 rounded-full">Mark all read</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3.5 hover:bg-slate-800/40 transition cursor-pointer ${notif.unread ? 'bg-blue-950/20' : ''}`}>
                        <div className="flex gap-3 items-start">
                          <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${notif.unread ? 'bg-blue-400' : 'bg-slate-700'}`}></div>
                          <div>
                            <p className="text-xs text-slate-300 leading-relaxed">{notif.text}</p>
                            <span className="text-[10px] text-slate-600 font-mono mt-1 block">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar and Welcome Message */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/40 border border-slate-700/30 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 select-none">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-glow-blue shrink-0">
                {userProfile.avatar || 'HP'}
              </div>
              <span className="max-w-[80px] truncate text-slate-300 font-bold">Hi, {userProfile.name?.split(' ')[0] || 'Harsh'}</span>
              <span className="text-[8px] text-slate-500">▼</span>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => { setIsOpen(!isOpen); setShowNotifications(false); }}
              className="lg:hidden p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-950/98 border-t border-slate-800/50 px-4 py-4">
          {/* User info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-900/60 rounded-2xl border border-slate-800/60">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-black shadow-glow-blue">
              {userProfile.avatar}
            </div>
            <div>
              <p className="font-bold text-sm text-white">{userProfile.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-amber-400 font-bold">{userProfile.points} pts</span>
                <span className="text-slate-700">·</span>
                <span className="text-[10px] text-indigo-400 font-semibold">{userProfile.badge}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {[...MAIN_NAV_ITEMS, ...DROPDOWN_NAV_ITEMS].map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-glow-blue'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{item.emoji}</span>
                    {item.name}
                  </span>
                  {active && <ChevronRight className="h-4 w-4 text-blue-200" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

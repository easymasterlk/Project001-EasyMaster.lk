//  "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import {
//   Menu, X, ChevronDown, ArrowRight,
//   Info, BookOpen, Users, Briefcase, MessageSquare, // Company
//   Monitor, Code, PenTool, Video, Share2, // Solutions
//   Phone, CalendarDays, FileEdit, LifeBuoy, MapPin, // Contact
//   FileText, Newspaper, Book, Download, Calendar, // Insight
//   Layers, Calculator, FileSignature, Wrench, HelpCircle, // Pricing
//   FolderGit2, Trophy, Cpu, ImageIcon, // Portfolio
//   Layout, Server, Smartphone, Cloud, Database, Sparkles // Technologies
// } from "lucide-react";

// // --- Dropdown Menu Data ---
// // මේ array එකේ තියෙන විදිහට තමයි Dropdowns ඔක්කොම dynamic විදිහට හැදෙන්නේ.
// // const menuData = [
// //   {
// //     title: "Company",
// //     description: "Discover who we are and the core values that drive our team forward.",
// //     mainButton: { label: "About Easymaster", href: "/company" },
// //     theme: { from: "from-blue-500", to: "to-blue-700", bgHover: "hover:bg-blue-50", text: "text-blue-600", btn: "bg-blue-800 hover:bg-blue-900" },
// //     align: "left",
// //     items: [
// //       { label: "About Us (Vision & Mission)", href: "/company/about", icon: Info },
// //       { label: "Our Story", href: "/company/story", icon: BookOpen },
// //       { label: "Our Team", href: "/company/team", icon: Users },
// //       { label: "Careers", href: "/company/careers", icon: Briefcase },
// //       { label: "CEO Message", href: "/company/ceo", icon: MessageSquare },
// //     ],
// //   },
// //   {
// //     title: "Solutions",
// //     description: "Innovative and scalable IT solutions tailored to elevate your business.",
// //     mainButton: { label: "All Solutions", href: "/solutions" },
// //     theme: { from: "from-indigo-500", to: "to-indigo-700", bgHover: "hover:bg-indigo-50", text: "text-indigo-600", btn: "bg-indigo-800 hover:bg-indigo-900" },
// //     align: "left",
// //     items: [
// //       { label: "Web Design", href: "/solutions/web-design", icon: Monitor },
// //       { label: "Software Design", href: "/solutions/software-design", icon: Code },
// //       { label: "Graphic Design", href: "/solutions/graphic-design", icon: PenTool },
// //       { label: "Video Editing", href: "/solutions/video-editing", icon: Video },
// //       { label: "Social Media Manage", href: "/solutions/social-media", icon: Share2 },
// //     ],
// //   },
// //   {
// //     title: "Insight",
// //     description: "Stay updated with our latest thoughts, industry news, and guides.",
// //     mainButton: { label: "Visit Blog", href: "/insight" },
// //     theme: { from: "from-orange-400", to: "to-orange-600", bgHover: "hover:bg-orange-50", text: "text-orange-500", btn: "bg-orange-700 hover:bg-orange-800" },
// //     align: "left",
// //     items: [
// //       { label: "Blog", href: "/insight/blog", icon: FileText },
// //       { label: "News", href: "/insight/news", icon: Newspaper },
// //       { label: "Guides", href: "/insight/guides", icon: Book },
// //       { label: "Downloads", href: "/insight/downloads", icon: Download },
// //       { label: "Events", href: "/insight/events", icon: Calendar },
// //     ],
// //   },
// //   {
// //     title: "Pricing",
// //     description: "Transparent pricing and flexible packages for every business size.",
// //     mainButton: { label: "View Packages", href: "/pricing" },
// //     theme: { from: "from-emerald-500", to: "to-emerald-700", bgHover: "hover:bg-emerald-50", text: "text-emerald-600", btn: "bg-emerald-800 hover:bg-emerald-900" },
// //     align: "right", // Right align to prevent screen overflow on smaller displays
// //     items: [
// //       { label: "Packages", href: "/pricing/packages", icon: Layers },
// //       { label: "Cost Calculator", href: "/pricing/calculator", icon: Calculator },
// //       { label: "Request Quote", href: "/pricing/quote", icon: FileSignature },
// //       { label: "Maintenance Plans", href: "/pricing/maintenance", icon: Wrench },
// //       { label: "FAQ", href: "/pricing/faq", icon: HelpCircle },
// //     ],
// //   },
// //   {
// //     title: "Portfolio",
// //     description: "Explore our successful projects and inspiring client success stories.",
// //     mainButton: { label: "View Portfolio", href: "/portfolio" },
// //     theme: { from: "from-rose-500", to: "to-rose-700", bgHover: "hover:bg-rose-50", text: "text-rose-600", btn: "bg-rose-800 hover:bg-rose-900" },
// //     align: "right",
// //     items: [
// //       { label: "All Projects", href: "/portfolio/projects", icon: FolderGit2 },
// //       { label: "Case Studies", href: "/portfolio/case-studies", icon: Briefcase },
// //       { label: "Client Success Stories", href: "/portfolio/success-stories", icon: Trophy },
// //       { label: "Technologies Used", href: "/portfolio/tech-used", icon: Cpu },
// //       { label: "Project Gallery", href: "/portfolio/gallery", icon: ImageIcon },
// //     ],
// //   },
// //   {
// //     title: "Technologies",
// //     description: "The cutting-edge technologies we use to build secure and modern applications.",
// //     mainButton: { label: "Our Tech Stack", href: "/technologies" },
// //     theme: { from: "from-cyan-500", to: "to-cyan-700", bgHover: "hover:bg-cyan-50", text: "text-cyan-600", btn: "bg-cyan-800 hover:bg-cyan-900" },
// //     align: "right",
// //     items: [
// //       { label: "Frontend Technologies", href: "/technologies/frontend", icon: Layout },
// //       { label: "Backend Technologies", href: "/technologies/backend", icon: Server },
// //       { label: "Mobile Technologies", href: "/technologies/mobile", icon: Smartphone },
// //       { label: "Cloud & DevOps", href: "/technologies/cloud", icon: Cloud },
// //       { label: "Database Technologies", href: "/technologies/database", icon: Database },
// //       { label: "AI & Emerging Tech", href: "/technologies/ai", icon: Sparkles },
// //     ],
// //   },
// //   {
// //     title: "Contact",
// //     description: "Get in touch with us for inquiries, technical support, and price quotes.",
// //     mainButton: { label: "Contact Us", href: "/contact" },
// //     theme: { from: "from-violet-500", to: "to-violet-700", bgHover: "hover:bg-violet-50", text: "text-violet-600", btn: "bg-violet-800 hover:bg-violet-900" },
// //     align: "right",
// //     items: [
// //       { label: "Contact Us", href: "/contact", icon: Phone },
// //       { label: "Book a Meeting", href: "/contact/meeting", icon: CalendarDays },
// //       { label: "Request a Quote", href: "/contact/quote", icon: FileEdit },
// //       { label: "Support Center", href: "/contact/support", icon: LifeBuoy },
// //       { label: "Office Locations", href: "/contact/locations", icon: MapPin },
// //     ],
// //   },
// // ];
// const menuData = [
//   // 1. Theme 1 (Blue & Cyan)
//   {
//     title: "Company",
//     description: "Discover who we are and the core values that drive our team forward.",
//     mainButton: { label: "About Easymaster", href: "/company" },
//     theme: { from: "from-blue-600", to: "to-cyan-500", bgHover: "hover:bg-blue-50", text: "text-blue-600", btn: "bg-blue-800 hover:bg-blue-900" },
//     align: "left",
//     items: [
//       { label: "About Us (Vision & Mission)", href: "/company/about", icon: Info },
//       { label: "Our Story", href: "/company/story", icon: BookOpen },
//       { label: "Our Team", href: "/company/team", icon: Users },
//       { label: "Careers", href: "/company/careers", icon: Briefcase },
//       { label: "CEO Message", href: "/company/ceo", icon: MessageSquare },
//     ],
//   },
//   // 2. Theme 2 (Purple & Pink)
//   {
//     title: "Solutions",
//     description: "Innovative and scalable IT solutions tailored to elevate your business.",
//     mainButton: { label: "All Solutions", href: "/solutions" },
//     theme: { from: "from-purple-600", to: "to-pink-500", bgHover: "hover:bg-purple-50", text: "text-purple-600", btn: "bg-purple-800 hover:bg-purple-900" },
//     align: "left",
//     items: [
//       { label: "Web Design", href: "/solutions/web-design", icon: Monitor },
//       { label: "Software Design", href: "/solutions/software-design", icon: Code },
//       { label: "Graphic Design", href: "/solutions/graphic-design", icon: PenTool },
//       { label: "Video Editing", href: "/solutions/video-editing", icon: Video },
//       { label: "Social Media Manage", href: "/solutions/social-media", icon: Share2 },
//     ],
//   },
//   // 3. Theme 3 (Orange & Amber)
//   {
//     title: "Insight",
//     description: "Stay updated with our latest thoughts, industry news, and guides.",
//     mainButton: { label: "Visit Blog", href: "/insight" },
//     theme: { from: "from-orange-500", to: "to-amber-500", bgHover: "hover:bg-orange-50", text: "text-orange-600", btn: "bg-orange-700 hover:bg-orange-800" },
//     align: "left",
//     items: [
//       { label: "Blog", href: "/insight/blog", icon: FileText },
//       { label: "News", href: "/insight/news", icon: Newspaper },
//       { label: "Guides", href: "/insight/guides", icon: Book },
//       { label: "Downloads", href: "/insight/downloads", icon: Download },
//       { label: "Events", href: "/insight/events", icon: Calendar },
//     ],
//   },
//   // 4. Theme 4 (Emerald & Teal)
//   {
//     title: "Pricing",
//     description: "Transparent pricing and flexible packages for every business size.",
//     mainButton: { label: "View Packages", href: "/pricing" },
//     theme: { from: "from-emerald-500", to: "to-teal-500", bgHover: "hover:bg-emerald-50", text: "text-emerald-600", btn: "bg-emerald-800 hover:bg-emerald-900" },
//     align: "right", 
//     items: [
//       { label: "Packages", href: "/pricing/packages", icon: Layers },
//       { label: "Cost Calculator", href: "/pricing/calculator", icon: Calculator },
//       { label: "Request Quote", href: "/pricing/quote", icon: FileSignature },
//       { label: "Maintenance Plans", href: "/pricing/maintenance", icon: Wrench },
//       { label: "FAQ", href: "/pricing/faq", icon: HelpCircle },
//     ],
//   },
//   // 5. Theme 5 (Rose & Red) - New
//   {
//     title: "Portfolio",
//     description: "Explore our successful projects and inspiring client success stories.",
//     mainButton: { label: "View Portfolio", href: "/portfolio" },
//     theme: { from: "from-rose-500", to: "to-red-500", bgHover: "hover:bg-rose-50", text: "text-rose-600", btn: "bg-rose-800 hover:bg-rose-900" },
//     align: "right",
//     items: [
//       { label: "All Projects", href: "/portfolio/projects", icon: FolderGit2 },
//       { label: "Case Studies", href: "/portfolio/case-studies", icon: Briefcase },
//       { label: "Client Success Stories", href: "/portfolio/success-stories", icon: Trophy },
//       { label: "Technologies Used", href: "/portfolio/tech-used", icon: Cpu },
//       { label: "Project Gallery", href: "/portfolio/gallery", icon: ImageIcon },
//     ],
//   },
//   // 6. Theme 6 (Indigo & Violet) - New
//   {
//     title: "Technologies",
//     description: "The cutting-edge technologies we use to build secure and modern applications.",
//     mainButton: { label: "Our Tech Stack", href: "/technologies" },
//     theme: { from: "from-indigo-600", to: "to-violet-600", bgHover: "hover:bg-indigo-50", text: "text-indigo-600", btn: "bg-indigo-800 hover:bg-indigo-900" },
//     align: "right",
//     items: [
//       { label: "Frontend Technologies", href: "/technologies/frontend", icon: Layout },
//       { label: "Backend Technologies", href: "/technologies/backend", icon: Server },
//       { label: "Mobile Technologies", href: "/technologies/mobile", icon: Smartphone },
//       { label: "Cloud & DevOps", href: "/technologies/cloud", icon: Cloud },
//       { label: "Database Technologies", href: "/technologies/database", icon: Database },
//       { label: "AI & Emerging Tech", href: "/technologies/ai", icon: Sparkles },
//     ],
//   },
//   // 7. Theme 7 (Sky & Blue) - New
//   {
//     title: "Contact",
//     description: "Get in touch with us for inquiries, technical support, and price quotes.",
//     mainButton: { label: "Contact Us", href: "/contact" },
//     theme: { from: "from-sky-500", to: "to-blue-600", bgHover: "hover:bg-sky-50", text: "text-sky-600", btn: "bg-sky-800 hover:bg-sky-900" },
//     align: "right",
//     items: [
//       { label: "Contact Us", href: "/contact", icon: Phone },
//       { label: "Book a Meeting", href: "/contact/meeting", icon: CalendarDays },
//       { label: "Request a Quote", href: "/contact/quote", icon: FileEdit },
//       { label: "Support Center", href: "/contact/support", icon: LifeBuoy },
//       { label: "Office Locations", href: "/contact/locations", icon: MapPin },
//     ],
//   },
// ];

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  
//   const navRef = useRef<HTMLElement>(null);

//   // Close dropdowns when clicking outside the navbar
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setActiveDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleDropdown = (title: string) => {
//     setActiveDropdown(activeDropdown === title ? null : title);
//   };

//   const toggleMobileDropdown = (title: string) => {
//     setActiveMobileDropdown(activeMobileDropdown === title ? null : title);
//   };

//   const closeAllMenus = () => {
//     setActiveDropdown(null);
//     setMobileMenuOpen(false);
//     setActiveMobileDropdown(null);
//   };

//   return (
//     <nav ref={navRef} className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-gray-100">
//       <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 flex items-center justify-between h-20">
        
//         {/* 1. Left Side - Logo */}
//         <div className="flex-shrink-0">
//           <Link href="/" className="flex items-center gap-2" onClick={closeAllMenus}>
//             {/* Logo Icon (Replace src with your actual logo path if needed) */}
//             <div className="bg-blue-600 text-white p-1.5 rounded-lg">
//               <Monitor size={24} />
//             </div>
//             <div className="text-2xl font-bold leading-tight">
//               <span className="text-blue-700">Easymaster</span>
//               <span className="text-gray-800 block text-[11px] uppercase tracking-widest -mt-1">IT Solution</span>
//             </div>
//           </Link>
//         </div>

//         {/* 2. Center - Main Navigation */}
//         <div className="hidden lg:flex items-center xl:gap-6 lg:gap-4 text-slate-700">
//           {/* Home Link */}
//           <Link 
//             href="/" 
//             className="hover:text-blue-600 transition text-[15px] font-semibold"
//             onClick={closeAllMenus}
//           >
//             Home
//           </Link>

//           {/* Dynamic Dropdown Menus */}
//           {menuData.map((menu) => (
//             <div key={menu.title} className="relative">
//               <button
//                 onClick={() => toggleDropdown(menu.title)}
//                 className={`flex items-center gap-1.5 hover:text-blue-600 transition text-[15px] font-semibold ${
//                   activeDropdown === menu.title ? "text-blue-600" : "text-slate-700"
//                 }`}
//               >
//                 {menu.title}
//                 <ChevronDown 
//                   size={16} 
//                   className={`transition-transform duration-300 ${activeDropdown === menu.title ? "rotate-180" : ""}`} 
//                 />
//               </button>

//               {/* Megamenu Card Container */}
//               {activeDropdown === menu.title && (
//                 <div 
//                   className={`absolute mt-6 w-[550px] xl:w-[600px] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 
//                   ${menu.align === "right" ? "right-0" : "left-0"}`}
//                 >
//                   <div className="grid grid-cols-5 gap-0">
                    
//                     {/* Left Section (Gradient Background, Title, Sentence, Button) */}
//                     <div className={`relative col-span-2 overflow-hidden bg-gradient-to-br ${menu.theme.from} ${menu.theme.to} p-6 flex flex-col justify-between`}>
//                       {/* Decorative Circles */}
//                       <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/20" />
//                       <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full border border-white/25" />
//                       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_45%)]" />

//                       <div className="relative z-10">
//                         <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-wide">{menu.title}</h3>
//                         <p className="text-white/95 text-[13px] leading-relaxed">
//                           {menu.description}
//                         </p>
//                       </div>
//                       <Link
//                         href={menu.mainButton.href}
//                         onClick={closeAllMenus}
//                         className={`relative z-10 inline-flex items-center justify-between mt-6 ${menu.theme.btn} text-white font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md group`}
//                       >
//                         {menu.mainButton.label}
//                         <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                       </Link>
//                     </div>

//                     {/* Right Section (White Background, List of links with icons) */}
//                     <div className="col-span-3 bg-white p-6 border-l border-gray-100">
//                       <h4 className={`font-bold text-xs uppercase tracking-wider mb-4 ${menu.theme.text}`}>
//                         Quick Links
//                       </h4>
//                       <div className="space-y-2">
//                         {menu.items.map((item) => {
//                           const Icon = item.icon;
//                           return (
//                             <Link
//                               key={item.label}
//                               href={item.href}
//                               onClick={closeAllMenus}
//                               className={`flex items-center justify-between p-2.5 bg-gray-50 ${menu.theme.bgHover} rounded-xl transition-colors group`}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <Icon size={18} className={menu.theme.text} />
//                                 <span className="text-gray-800 font-semibold text-[13px]">{item.label}</span>
//                               </div>
//                               <ChevronDown size={16} className={`${menu.theme.text} opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all rotate-[-90deg]`} />
//                             </Link>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* 3. Right Side - Get Started Button & Mobile Toggle */}
//         <div className="flex items-center gap-4">
//           <Link
//             href="/get-started"
//             className="hidden lg:flex bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg items-center gap-2"
//           >
//             Get Started
//             <ArrowRight size={18} />
//           </Link>

//           {/* Mobile Hamburger Button */}
//           <button
//             className="lg:hidden text-slate-700 hover:text-blue-600 transition"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* --- Mobile Navigation Menu --- */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto absolute w-full left-0">
//           <div className="px-5 py-6 space-y-4">
            
//             <Link
//               href="/"
//               onClick={closeAllMenus}
//               className="block text-lg font-bold text-slate-800 hover:text-blue-600 transition pb-2 border-b border-gray-100"
//             >
//               Home
//             </Link>

//             {/* Mobile Dropdowns */}
//             {menuData.map((menu) => (
//               <div key={menu.title} className="py-1">
//                 <button
//                   onClick={() => toggleMobileDropdown(menu.title)}
//                   className="flex justify-between items-center w-full text-left text-lg font-bold text-slate-800 hover:text-blue-600 transition"
//                 >
//                   {menu.title}
//                   <ChevronDown size={20} className={`transition-transform duration-300 ${activeMobileDropdown === menu.title ? "rotate-180" : ""}`} />
//                 </button>

//                 {activeMobileDropdown === menu.title && (
//                   <div className={`mt-4 mb-2 bg-gradient-to-br ${menu.theme.from} ${menu.theme.to} p-4 rounded-xl shadow-inner`}>
                    
//                     {/* Mobile Card Main Button */}
//                     <Link
//                       href={menu.mainButton.href}
//                       onClick={closeAllMenus}
//                       className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-lg transition mb-4 backdrop-blur-sm border border-white/20"
//                     >
//                       {menu.mainButton.label}
//                     </Link>

//                     {/* Mobile Card Links */}
//                     <div className="space-y-2 bg-white rounded-lg p-2">
//                       {menu.items.map((item) => {
//                         const Icon = item.icon;
//                         return (
//                           <Link
//                             key={item.label}
//                             href={item.href}
//                             onClick={closeAllMenus}
//                             className={`flex items-center gap-3 p-3 rounded-lg ${menu.theme.bgHover} transition-colors group`}
//                           >
//                             <div className={`p-1.5 rounded-md bg-gray-50 group-hover:bg-white`}>
//                               <Icon size={16} className={menu.theme.text} />
//                             </div>
//                             <span className="text-gray-800 font-medium text-sm">{item.label}</span>
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Mobile Get Started Button */}
//             <div className="pt-6 mt-6 border-t border-gray-100">
//               <Link
//                 href="/get-started"
//                 onClick={closeAllMenus}
//                 className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
//               >
//                 Get Started
//                 <ArrowRight size={20} />
//               </Link>
//             </div>
            
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }




"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Oxanium } from "next/font/google";
import {
  Menu, X, ChevronDown, ArrowRight,
  Info, BookOpen, Users, Briefcase, MessageSquare, // Company
  Monitor, Code, PenTool, Video, Share2, // Solutions
  Phone, CalendarDays, FileEdit, LifeBuoy, MapPin, // Contact
  FileText, Newspaper, Book, Download, Calendar, // Insight
  Layers, Calculator, FileSignature, Wrench, HelpCircle, // Pricing
  FolderGit2, Trophy, Cpu, ImageIcon, // Portfolio
  Layout, Server, Smartphone, Cloud, Database, Sparkles // Technologies
} from "lucide-react";

const oxanium = Oxanium({
  subsets: ["latin"],
});

// --- Dropdown Menu Data ---
const menuData = [
  // 1. Uni-Mart Theme (Orange) -> Applied to Company
  {
    title: "Company",
    description: "Discover who we are and the core values that drive our team forward.",
    mainButton: { label: "About Easymaster", href: "/company" },
    theme: { from: "from-orange-400", to: "to-orange-500", bgHover: "hover:bg-orange-50", text: "text-orange-400", btn: "bg-orange-600 hover:bg-orange-700" },
    align: "left",
    bgIcon: MessageSquare,
    items: [
      { label: "About Us (Vision & Mission)", href: "/company/about", icon: Info },
      { label: "Our Story", href: "/company/story", icon: BookOpen },
      { label: "Our Team", href: "/company/team", icon: Users },
      { label: "Careers", href: "/company/careers", icon: Briefcase },
      { label: "CEO Message", href: "/company/ceo", icon: MessageSquare },
    ],
  },
  // 2. Project Finder Theme (Yellow/Amber) -> Applied to Solutions
  {
    title: "Solutions",
    description: "Innovative and scalable IT solutions tailored to elevate your business.",
    mainButton: { label: "All Solutions", href: "/solutions" },
    theme: { from: "from-yellow-400", to: "to-amber-500", bgHover: "hover:bg-amber-50", text: "text-amber-500", btn: "bg-amber-600 hover:bg-amber-700" },
    align: "left",
    bgIcon: Monitor,
    items: [
      { label: "Web Design", href: "/solutions/web-design", icon: Monitor },
      { label: "Software Design", href: "/solutions/software-design", icon: Code },
      { label: "Graphic Design", href: "/solutions/graphic-design", icon: PenTool },
      { label: "Video Editing", href: "/solutions/video-editing", icon: Video },
      { label: "Social Media Manage", href: "/solutions/social-media", icon: Share2 },
    ],
  },
  // 3. Startup Connect Theme (Blue/Indigo) -> Applied to Insight
  {
    title: "Insight",
    description: "Stay updated with our latest thoughts, industry news, and guides.",
    mainButton: { label: "Visit Blog", href: "/insight" },
    theme: { from: "from-blue-600", to: "to-indigo-700", bgHover: "hover:bg-blue-50", text: "text-blue-600", btn: "bg-blue-800 hover:bg-blue-900" },
    align: "left",
    bgIcon: FileText,
    items: [
      { label: "Blog", href: "/insight/blog", icon: FileText },
      { label: "News", href: "/insight/news", icon: Newspaper },
      { label: "Guides", href: "/insight/guides", icon: Book },
      { label: "Downloads", href: "/insight/downloads", icon: Download },
      { label: "Events", href: "/insight/events", icon: Calendar },
    ],
  },
  // 4. Tutor Connect Theme (Sky/Blue) -> Applied to Pricing
  {
    title: "Pricing",
    description: "Transparent pricing and flexible packages for every business size.",
    mainButton: { label: "View Packages", href: "/pricing" },
    theme: { from: "from-sky-400", to: "to-blue-500", bgHover: "hover:bg-sky-50", text: "text-sky-500", btn: "bg-sky-600 hover:bg-sky-700" },
    align: "right", // Right align to prevent screen overflow on smaller displays
    bgIcon: Calculator,
    items: [
      { label: "Packages", href: "/pricing/packages", icon: Layers },
      { label: "Cost Calculator", href: "/pricing/calculator", icon: Calculator },
      { label: "Request Quote", href: "/pricing/quote", icon: FileSignature },
      { label: "Maintenance Plans", href: "/pricing/maintenance", icon: Wrench },
      { label: "FAQ", href: "/pricing/faq", icon: HelpCircle },
    ],
  },
  {
    title: "Portfolio",
    description: "Explore our successful projects and inspiring client success stories.",
    mainButton: { label: "View Portfolio", href: "/portfolio" },
    theme: { from: "from-rose-500", to: "to-rose-700", bgHover: "hover:bg-rose-50", text: "text-rose-600", btn: "bg-rose-800 hover:bg-rose-900" },
    align: "right",
    bgIcon: ImageIcon,
    items: [
      { label: "All Projects", href: "/portfolio/projects", icon: FolderGit2 },
      { label: "Case Studies", href: "/portfolio/case-studies", icon: Briefcase },
      { label: "Client Success Stories", href: "/portfolio/success-stories", icon: Trophy },
      { label: "Technologies Used", href: "/portfolio/tech-used", icon: Cpu },
      { label: "Project Gallery", href: "/portfolio/gallery", icon: ImageIcon },
    ],
  },
  {
    title: "Technologies",
    description: "The cutting-edge technologies we use to build secure and modern applications.",
    mainButton: { label: "Our Tech Stack", href: "/technologies" },
    theme: { from: "from-cyan-500", to: "to-cyan-700", bgHover: "hover:bg-cyan-50", text: "text-cyan-600", btn: "bg-cyan-800 hover:bg-cyan-900" },
    align: "right",
    bgIcon: Cpu,
    items: [
      { label: "Frontend Technologies", href: "/technologies/frontend", icon: Layout },
      { label: "Backend Technologies", href: "/technologies/backend", icon: Server },
      { label: "Mobile Technologies", href: "/technologies/mobile", icon: Smartphone },
      { label: "Cloud & DevOps", href: "/technologies/cloud", icon: Cloud },
      { label: "Database Technologies", href: "/technologies/database", icon: Database },
      { label: "AI & Emerging Tech", href: "/technologies/ai", icon: Sparkles },
    ],
  },
  {
    title: "Contact",
    description: "Get in touch with us for inquiries, technical support, and price quotes.",
    mainButton: { label: "Contact Us", href: "/contact" },
    theme: { from: "from-violet-500", to: "to-violet-700", bgHover: "hover:bg-violet-50", text: "text-violet-600", btn: "bg-violet-800 hover:bg-violet-900" },
    align: "right",
    bgIcon: Phone,
    items: [
      { label: "Contact Us", href: "/contact", icon: Phone },
      { label: "Book a Meeting", href: "/contact/meeting", icon: CalendarDays },
      { label: "Request a Quote", href: "/contact/quote", icon: FileEdit },
      { label: "Support Center", href: "/contact/support", icon: LifeBuoy },
      { label: "Office Locations", href: "/contact/locations", icon: MapPin },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [logoShineActive, setLogoShineActive] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns when clicking outside the navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLogoShineActive(true);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const toggleMobileDropdown = (title: string) => {
    setActiveMobileDropdown(activeMobileDropdown === title ? null : title);
  };

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  return (
    <nav ref={navRef} className={`${oxanium.className} sticky top-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-gray-100`}>
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 flex items-center justify-between h-20">
        
        {/* 1. Left Side - Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={closeAllMenus}>
            <div className="relative flex h-[58px] w-[210px] items-center overflow-visible">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-[-8px] left-[-18%] w-[58%] bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.72)_50%,transparent_65%)] ${logoShineActive ? "animate-logo-shine" : "opacity-0"}`}
              />
              <Image
                src="/images/EM web nav logo LightT .png"
                alt="Easymaster IT Solution"
                width={210}
                height={58}
                className="block h-auto w-full object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* 2. Center - Main Navigation */}
        <div className="hidden lg:flex items-center xl:gap-6 lg:gap-4 text-slate-700">
          {/* Home Link */}
          <Link 
            href="/" 
            className="hover:text-amber-500 transition text-[15px] font-semibold"
            onClick={closeAllMenus}
          >
            Home
          </Link>

          {/* Dynamic Dropdown Menus */}
          {menuData.map((menu) => (
            <div key={menu.title} className="relative">
              <button
                onClick={() => toggleDropdown(menu.title)}
                className={`flex items-center gap-1.5 hover:text-amber-500 transition text-[15px] font-semibold ${
                  activeDropdown === menu.title ? "text-amber-500" : "text-slate-700"
                }`}
              >
                {menu.title}
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${activeDropdown === menu.title ? "rotate-180" : ""}`} 
                />
              </button>

              {/* Megamenu Card Container */}
              {activeDropdown === menu.title && (
                <div 
                  className={`absolute mt-6 w-[520px] xl:w-[560px] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 
                  ${menu.align === "right" ? "right-0" : "left-0"}`}
                >
                  <div className="grid grid-cols-5 gap-0">
                    
                    {/* Left Section (Gradient Background, Title, Sentence, Button) */}
                    <div className={`relative col-span-2 overflow-hidden bg-gradient-to-br ${menu.theme.from} ${menu.theme.to} p-6 flex flex-col justify-between`}>
                      {/* Decorative Circles */}
                      <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/20" />
                      <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full border border-white/25" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_45%)]" />

                      <div className="relative z-10">
                        <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-wide">{menu.title}</h3>
                        <p className="text-white/95 text-[13px] leading-relaxed">
                          {menu.description}
                        </p>
                      </div>
                      <Link
                        href={menu.mainButton.href}
                        onClick={closeAllMenus}
                        className="relative z-10 inline-flex items-center justify-between mt-6 bg-white/20 text-white font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md backdrop-blur-sm border border-white/20 hover:bg-white/30 group"
                      >
                        {menu.mainButton.label}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Section (White Background, List of links with icons) */}
                    <div className="relative col-span-3 overflow-hidden bg-white p-6 border-l border-gray-100">
                      <div className={`pointer-events-none absolute right-[-10px] top-1/2 -translate-y-1/2 text-[140px] text-slate-900/5`}>
                        {(() => {
                          const BackgroundIcon = menu.bgIcon;
                          return <BackgroundIcon size={140} strokeWidth={1.2} />;
                        })()}
                      </div>
                      <h4 className={`relative z-10 font-bold text-xs uppercase tracking-wider mb-4 ${menu.theme.text}`}>
                        Quick Links
                      </h4>
                      <div className="relative z-10 space-y-2 pr-10">
                        {menu.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={closeAllMenus}
                              className={`flex items-center justify-between p-2.5 bg-gray-50 ${menu.theme.bgHover} rounded-xl transition-colors group`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon size={18} className={menu.theme.text} />
                                <span className="text-gray-800 font-semibold text-[13px]">{item.label}</span>
                              </div>
                              <ChevronDown size={16} className={`${menu.theme.text} opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all rotate-[-90deg]`} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3. Right Side - Get Started Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/get-started"
            className="group isolate hidden lg:flex relative items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-2.5 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span
              aria-hidden="true"
              className="cta-shine pointer-events-none absolute inset-y-[-35%] left-[-55%] z-20 w-[42%] -skew-x-12 bg-gradient-to-r from-transparent via-white/95 to-transparent blur-md"
            />
            <span className="relative z-10">Get Started</span>
            <ArrowRight size={18} className="relative z-10" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden text-slate-700 hover:text-blue-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Navigation Menu --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto absolute w-full left-0">
          <div className="px-5 py-6 space-y-4">
            
            <Link
              href="/"
              onClick={closeAllMenus}
              className="block text-lg font-bold text-slate-800 hover:text-amber-500 transition pb-2 border-b border-gray-100"
            >
              Home
            </Link>

            {/* Mobile Dropdowns */}
            {menuData.map((menu) => (
              <div key={menu.title} className="py-1">
                <button
                  onClick={() => toggleMobileDropdown(menu.title)}
                  className="flex justify-between items-center w-full text-left text-lg font-bold text-slate-800 hover:text-amber-500 transition"
                >
                  {menu.title}
                  <ChevronDown size={20} className={`transition-transform duration-300 ${activeMobileDropdown === menu.title ? "rotate-180" : ""}`} />
                </button>

                {activeMobileDropdown === menu.title && (
                  <div className={`mt-4 mb-2 bg-gradient-to-br ${menu.theme.from} ${menu.theme.to} p-4 rounded-xl shadow-inner`}>
                    
                    {/* Mobile Card Main Button */}
                    <Link
                      href={menu.mainButton.href}
                      onClick={closeAllMenus}
                      className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-lg transition mb-4 backdrop-blur-sm border border-white/20"
                    >
                      {menu.mainButton.label}
                    </Link>

                    {/* Mobile Card Links */}
                    <div className="space-y-2 bg-white rounded-lg p-2">
                      {menu.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeAllMenus}
                            className={`flex items-center gap-3 p-3 rounded-lg ${menu.theme.bgHover} transition-colors group`}
                          >
                            <div className={`p-1.5 rounded-md bg-gray-50 group-hover:bg-white`}>
                              <Icon size={16} className={menu.theme.text} />
                            </div>
                            <span className="text-gray-800 font-medium text-sm">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Get Started Button */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                href="/get-started"
                onClick={closeAllMenus}
                className="group isolate relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-3.5 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="cta-shine pointer-events-none absolute inset-y-[-35%] left-[-55%] z-20 w-[42%] -skew-x-12 bg-gradient-to-r from-transparent via-white/95 to-transparent blur-md"
                />
                <span className="relative z-10">Get Started</span>
                <ArrowRight size={20} className="relative z-10" />
              </Link>
            </div>
            
          </div>
        </div>
      )}
    </nav>
  );
}
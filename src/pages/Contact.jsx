import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, MapPin, Phone, Send, MessageCircle, ChevronDown, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_DETAILS = [
  { id: "01", label: "Location / HQ", value: "124 Concrete Ave, Ste 400\nLos Angeles, CA 90012", icon: <MapPin size={18} /> },
  { id: "02", label: "Inquiries / Email", value: "hello@arch-studio.com", icon: <Mail size={18} /> },
  { id: "03", label: "Direct Line / Phone", value: "+1 (310) 555-0192", icon: <Phone size={18} /> },
];

const PROJECT_TYPES = [
    "Residential Architecture",
    "Commercial / Retail", 
    "Interior Design",
    "Masterplanning",
    "Landscape Architecture"
];

const WHATSAPP_NUMBER = "13105550192"; 

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // State
  const [focusedField, setFocusedField] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Panel Entrance
      gsap.from(".glass-panel", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });

      // 2. Text Reveal
      gsap.from(".reveal-data", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.5
      });

      // 3. Form Reveal
      gsap.from(formRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.7
      });
      
      // 4. Floating Button Entrance
      gsap.from(".floating-whatsapp", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 1.5
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Dropdown Animation Handling
  useEffect(() => {
    if (isDropdownOpen) {
        gsap.fromTo(dropdownRef.current, 
            { y: -10, opacity: 0, scaleY: 0.95 },
            { y: 0, opacity: 1, scaleY: 1, duration: 0.3, ease: "power2.out" }
        );
    }
  }, [isDropdownOpen]);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen selection:bg-[#BC4B32] selection:text-white overflow-hidden flex items-center justify-center py-14 px-8 md:py-28 md:px-16">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#F8F7F5]">
          <img 
            src="/contact_bg.png" 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
      </div>

      {/* --- MAIN GLASS CONTAINER --- */}
      <div className="glass-panel relative z-10 w-full max-w-[1280px] bg-[#F8F7F5]/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-sm overflow-visible md:overflow-hidden flex flex-col lg:grid lg:grid-cols-12">

          {/* --- LEFT COLUMN: Info --- */}
          {/* Order-2 on mobile (bottom), Order-1 on desktop (left) */}
          <div className="order-2 lg:order-1 lg:col-span-5 p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-r border-[#1A1A1A]/10 relative font-sans flex flex-col justify-between">
            <div>
                <div className="mb-8 md:mb-12 reveal-data">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#BC4B32] block mb-2">// Project Inquiry</span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[0.9]">
                    Let's Build <br/>
                    <span className="italic text-[#666666]">Tomorrow.</span>
                    </h1>
                </div>

                <div className="space-y-8 reveal-data">
                {CONTACT_DETAILS.map((item) => (
                    <div key={item.id} className="group">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] text-[#BC4B32]">{item.id}</span>
                        <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#666666]">{item.label}</h4>
                    </div>
                    <div className="flex items-start gap-4 pl-6 border-l border-[#BC4B32]/30 group-hover:border-[#BC4B32] transition-colors duration-300">
                        <div className="text-[#1A1A1A] mt-1">{item.icon}</div>
                        <p className="text-base md:text-lg text-[#1A1A1A] whitespace-pre-wrap leading-relaxed">{item.value}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>

          <a
  href={`https://wa.me/${WHATSAPP_NUMBER}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5
    group relative flex items-center justify-between 
    w-full sm:w-auto 
    border border-[#BC4B32]/40 px-6 py-5 
    rounded-xl
    overflow-hidden
    transition-all duration-300 
    bg-white/30 backdrop-blur-md 
    shadow-sm hover:shadow-lg
  "
>

  {/* Hover Background Slide */}
  <div
    className="
      absolute inset-0 w-full h-full bg-[#BC4B32]
      translate-y-full group-hover:translate-y-0
      transition-transform duration-500 ease-out
      z-0
    "
  ></div>

  {/* Text Section */}
  <div className="relative z-10 flex flex-col">
    <span className="font-mono text-[10px] uppercase tracking-widest text-[#BC4B32] group-hover:text-white/80 transition-colors duration-300">
      // Instant Connection
    </span>
    <span className="font-serif text-lg sm:text-xl text-[#1A1A1A] group-hover:text-white transition-colors duration-300">
      WhatsApp Chat
    </span>
  </div>

  {/* Icon */}
  <div
    className="
      relative z-10 w-10 h-10 ml-4 
      rounded-full border border-[#BC4B32] 
      flex items-center justify-center 
      group-hover:border-white 
      transition-colors duration-300 
      bg-[#F8F7F5]/70 group-hover:bg-[#BC4B32]
    "
  >
    <MessageCircle
      size={20}
      className="text-[#BC4B32] group-hover:text-white transition-colors duration-300"
    />
  </div>
</a>

          </div>


          {/* --- RIGHT COLUMN: Form --- */}
          {/* Order-1 on mobile (top), Order-2 on desktop (right) */}
          <div className="order-1 lg:order-2 lg:col-span-7 p-8 md:p-12 lg:p-16 relative bg-white/20">
             <div ref={formRef} className="space-y-6 md:space-y-8">
                
                {/* Name */}
                <div className="relative group">
                    <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-xs uppercase tracking-widest ${focusedField === 'name' || document.getElementById('name')?.value ? '-top-4 text-[#BC4B32] text-[10px]' : 'top-3 text-[#666666]'}`}>
                       // Full Name *
                    </label>
                    <input 
                      type="text" id="name" required
                      onFocus={() => handleFocus('name')} onBlur={handleBlur}
                      className="w-full bg-transparent py-3 border-b border-[#1A1A1A]/20 text-[#1A1A1A] font-serif text-xl focus:outline-none focus:border-[#BC4B32] transition-colors duration-300 peer"
                    />
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-[#BC4B32] transition-all duration-500 ease-out ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
                </div>

                {/* Email */}
                <div className="relative group pt-4">
                    <label htmlFor="email" className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-xs uppercase tracking-widest ${focusedField === 'email' || document.getElementById('email')?.value ? '-top-0 text-[#BC4B32] text-[10px]' : 'top-7 text-[#666666]'}`}>
                       // Email Address *
                    </label>
                    <input 
                      type="email" id="email" required
                      onFocus={() => handleFocus('email')} onBlur={handleBlur}
                      className="w-full bg-transparent py-3 border-b border-[#1A1A1A]/20 text-[#1A1A1A] font-serif text-xl focus:outline-none focus:border-[#BC4B32] transition-colors duration-300"
                    />
                     <div className={`absolute bottom-0 left-0 h-[2px] bg-[#BC4B32] transition-all duration-500 ease-out ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                </div>

                 {/* Custom Modern Dropdown */}
                 <div className="relative group pt-4 z-50">
                    <label className="block font-mono text-xs uppercase tracking-widest text-[#BC4B32] text-[10px] mb-2">
                       // Project Type
                    </label>
                    
                    {/* The Trigger Button */}
                    <button 
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-transparent py-3 border-b border-[#1A1A1A]/20 text-[#1A1A1A] font-serif text-xl focus:outline-none flex justify-between items-center group-hover:border-[#BC4B32] transition-colors duration-300 text-left"
                    >
                        <span className={selectedType ? "text-[#1A1A1A]" : "text-[#1A1A1A]/50"}>
                            {selectedType || "Select an option..."}
                        </span>
                        <ChevronDown 
                            size={20} 
                            className={`text-[#666666] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#BC4B32]' : ''}`} 
                        />
                    </button>

                    {/* The Dropdown List */}
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute left-0 top-full w-full bg-[#F8F7F5] border border-[#BC4B32]/20 shadow-xl mt-2 max-h-60 overflow-y-auto z-50">
                             {PROJECT_TYPES.map((type, i) => (
                                 <div 
                                    key={i}
                                    onClick={() => { setSelectedType(type); setIsDropdownOpen(false); }}
                                    className="text-black px-6 py-4 border-b border-[#1A1A1A]/5 hover:bg-[#BC4B32] hover:text-white cursor-pointer transition-colors duration-200 font-serif text-lg flex items-center justify-between group/item"
                                 >
                                    {type}
                                    <ArrowUpRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                 </div>
                             ))}
                        </div>
                    )}
                </div>

                {/* Message */}
                <div className="relative group pt-8 z-0">
                     <label htmlFor="message" className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-xs uppercase tracking-widest ${focusedField === 'message' || document.getElementById('message')?.value ? '-top-4 text-[#BC4B32] text-[10px]' : 'top-11 text-[#666666]'}`}>
                       // Project Details / Vision *
                    </label>
                    <textarea 
                      id="message" rows="3" required
                      onFocus={() => handleFocus('message')} onBlur={handleBlur}
                      className="w-full bg-transparent py-3 border-b border-[#1A1A1A]/20 text-[#1A1A1A] font-sans resize-none focus:outline-none focus:border-[#BC4B32] transition-colors duration-300"
                    ></textarea>
                     <div className={`absolute bottom-[6px] left-0 h-[2px] bg-[#BC4B32] transition-all duration-500 ease-out ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                    <button className="group relative inline-flex items-center justify-between w-full md:w-auto gap-12 bg-[#1A1A1A] text-white px-8 py-6 overflow-hidden transition-all duration-300 hover:bg-[#BC4B32] shadow-lg">
                        <div className="absolute inset-0 w-full h-full bg-[#BC4B32] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                        <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em]">Transmit Inquiry</span>
                        <Send size={18} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>

             </div>
          </div>
          
          {/* Subtle top sheen */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"></div>
      </div>

   

    </div>
  );
};

export default Contact;
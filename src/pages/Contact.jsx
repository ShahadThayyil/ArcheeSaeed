import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail, MapPin, Phone, MessageCircle, Instagram, Facebook } from "lucide-react";

const CONTACT_DETAILS = [
  { id: "01", label: "Studio Location", value: "Tirur , Malappuram District, Kerala, India", icon: <MapPin size={20} /> },
  { id: "02", label: "Email Address", value: "archizaidofficial@gmail.com", icon: <Mail size={20} />, link: "mailto:archizaidofficial@gmail.com" },
  { id: "03", label: "Primary Phone", value: "+91 94009 87747", icon: <Phone size={20} />, link: "tel:+919400987747" },
  { id: "04", label: "Secondary Phone", value: "+91 75929 87747", icon: <Phone size={20} />, link: "tel:+917592987747" },
];

const WHATSAPP_NUMBER = "+919400987747";

const Contact = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Accent line animation
      gsap.from(".bg-accent-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2
      });

      // Unified entrance for all items
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#F8F7F5] selection:bg-[#BC4B32] selection:text-white flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 overflow-hidden mt-14">
      
      {/* Decorative Structural Line */}
      <div className="bg-accent-line absolute top-1/2 left-0 w-1/4 h-[1px] bg-[#BC4B32]/20 hidden lg:block"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* --- LEFT SECTION --- */}
        <div className="lg:col-span-7 space-y-12">
          <div className="reveal-item">
           
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A1A1A] leading-[0.85] tracking-tighter">
              Get in <br />
              <span className="italic text-[#666666]">Touch.</span>
            </h1>
          </div>

          {/* MAIN CALL TO ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-5 reveal-item">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 bg-[#1A1A1A] text-white px-8 py-5 rounded-sm transition-all duration-500 hover:bg-[#BC4B32] w-full sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#BC4B32] group-hover:text-white transition-colors" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Whatsapp</span>
              </div>
              <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="tel:+919400987747"
              className="group flex items-center justify-between gap-6 border border-[#1A1A1A]/10 bg-white/50 text-[#1A1A1A] px-8 py-5 rounded-sm transition-all duration-500 hover:border-[#BC4B32] w-full sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#BC4B32]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Call Office</span>
              </div>
              <ArrowUpRight size={18} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="reveal-item pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#666666] block mb-6">Digital Presence —</span>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/archizaid/" className="group relative flex items-center gap-3 px-6 py-4 bg-white border border-black/5 hover:border-[#BC4B32]/30 transition-all duration-500">
                <Instagram size={22} className="text-[#1A1A1A] group-hover:text-[#BC4B32] transition-colors" />
                <span className="font-serif text-xl text-[#1A1A1A]">Instagram</span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BC4B32] group-hover:w-full transition-all duration-500"></div>
              </a>
              
              <a href="https://www.facebook.com/share/16vf9oEtTr/" className="group relative flex items-center gap-3 px-6 py-4 bg-white border border-black/5 hover:border-[#BC4B32]/30 transition-all duration-500">
                <Facebook size={22} className="text-[#1A1A1A] group-hover:text-[#BC4B32] transition-colors" />
                <span className="font-serif text-xl text-[#1A1A1A]">Facebook</span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BC4B32] group-hover:w-full transition-all duration-500"></div>
              </a>
            </div>
          </div>
        </div>

        {/* --- RIGHT SECTION: CONTACT INFO --- */}
        <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-10">
          {CONTACT_DETAILS.map((item) => (
            <div key={item.id} className="reveal-item group">
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-[10px] text-[#BC4B32] font-bold tracking-tighter">{item.id}</span>
                <div className="h-[1px] w-6 bg-[#BC4B32]/30 group-hover:w-10 group-hover:bg-[#BC4B32] transition-all duration-500"></div>
                <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#666666]">{item.label}</h4>
              </div>
              
              {item.link ? (
                <a href={item.link} className="block group-hover:translate-x-1 transition-transform duration-500">
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] hover:text-[#BC4B32] transition-colors leading-tight">
                    {item.value}
                  </p>
                </a>
              ) : (
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] whitespace-pre-wrap leading-tight">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-6 md:left-16 font-mono text-[9px] text-[#1A1A1A]/20 tracking-[0.5em] uppercase hidden md:block">
        Archizaid Studio © 2026 / Kerala / India
      </div>
    </div>
  );
};


export default Contact;
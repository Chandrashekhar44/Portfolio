import { useState, useEffect, useRef } from "react";
import './index.css';
import emailjs from '@emailjs/browser';

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);


function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(26px)",
      transition: `opacity .72s ease ${delay}s, transform .72s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

const tools = {
  Frontend:    [["⚛","React"],["▲","Next.js"],["🌀","Tailwind CSS"],["🧩","Component-based Architecture"],["📱","Responsive UI Implementation"],["🔴","Redux Toolkit"]],
  "Backend & Data": [["🟢","Node.js"],["▲","NextJs"],["𝗘","Express.js"],["🐘","PostgreSQL"],["🍃","MongoDB"],["🔗","REST APIs"],["🔐","JWT Credential Authentication"],["🅰","Appwrite"]],
  Languages: [["𝐉𝐒","JavaScript"],["📘","TypeScript"],["☕","Java"]],
  Tools:[["📮","Postman"],["🐙","Git & Github"],["🐳","Docker"]]
};

const contactLinks = [
  { icon:"✉",  label:"Email",    value:"banothuchandu77@gmail.com",              href:"mailto:banothuchandu77@gmail.com" },
  { icon:"💼", label:"LinkedIn", value:"linkedin.com/in/chandra-shekhar-89152131b",    href:"https://www.linkedin.com/in/chandra-shekhar-89152131b" },
  { icon:"🐙", label:"GitHub",   value:"github.com/Chandrashekhar44",         href:"https://github.com/Chandrashekhar44" },
  { icon:"📍", label:"Location", value:"Hyderabad, India — Open to global opportunities",href:"https://www.google.com/maps?q=HITEC+City+Hyderabad" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const base = { fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:400, letterSpacing:"0.06em", color:"var(--muted)", textDecoration:"none", transition:"color .25s" };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding: scrolled ? "18px 64px" : "28px 64px",
        background: scrolled ? "rgba(250,248,245,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--border)" : "none",
        transition:"all .4s ease",
      }} className="nav-inner">
        <span className="nav-name" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:400, letterSpacing:"0.02em" }}>
          Chandra Shekhar
        </span>

        <div className="nav-links" style={{ display:"flex", gap:36, alignItems:"center" }}>
          {["About","Skills","Work"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={base}
              onMouseEnter={e=>e.target.style.color="var(--ink)"}
              onMouseLeave={e=>e.target.style.color="var(--muted)"}
            >{l}</a>
          ))}
          <a href="#contact" style={{
            ...base, color:"var(--ink)", border:"1px solid var(--border)",
            padding:"8px 20px", borderRadius:100, fontSize:12,
            transition:"background .25s, color .25s, border-color .25s",
          }}
            onMouseEnter={e=>{ e.target.style.background="var(--ink)"; e.target.style.color="var(--warm-white)"; e.target.style.borderColor="var(--ink)"; }}
            onMouseLeave={e=>{ e.target.style.background="transparent"; e.target.style.color="var(--muted)"; e.target.style.borderColor="var(--border)"; }}
          >Let's talk</a>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display:"none", flexDirection:"column", gap:5,
            background:"none", border:"none", cursor:"pointer", padding:4,
          }}
          aria-label="Toggle menu"
        >
          <span style={{ width:22, height:1.5, background:"var(--ink)", display:"block", transition:"all .3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <span style={{ width:22, height:1.5, background:"var(--ink)", display:"block", transition:"all .3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width:22, height:1.5, background:"var(--ink)", display:"block", transition:"all .3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={handleNavClick}>
          {["About","Skills","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={handleNavClick}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:300, color:"var(--ink)", textDecoration:"none", letterSpacing:"-0.2px" }}
            >{l}</a>
          ))}
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section id="about" style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", background:"var(--warm-white)",
    }}>

      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, var(--accent) 1px, transparent 1px)", backgroundSize:"36px 36px", opacity:0.07 }} />

      <p style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(60px,14vw,180px)", fontWeight:300, color:"var(--ink)", opacity:0.04, whiteSpace:"nowrap", userSelect:"none", letterSpacing:"-4px" }}>
        CS
      </p>

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"80px 24px", maxWidth:800, width:"100%" }}>

        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.22em", color:"var(--accent)", textTransform:"uppercase", marginBottom:40, opacity:0, animation:"fadeUp .7s .2s ease forwards" }}>
          Full-Stack Developer · Systems-Focused
        </p>

        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(42px,15vw,104px)", fontWeight:300, lineHeight:1, letterSpacing:"-2px", color:"var(--ink)", opacity:0, animation:"fadeUp .85s .35s ease forwards", whiteSpace:"nowrap" }}>
          Chandra <span style={{ fontStyle:"italic", color:"var(--accent)" }}>Shekhar</span>
        </h1>

        <div style={{ display:"flex", alignItems:"center", gap:16, margin:"36px 0", opacity:0, animation:"fadeUp .7s .6s ease forwards" }}>
          <div style={{ width:32, height:"0.5px", background:"var(--accent)", flexShrink:0 }} />
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--muted)" }}>Turning ideas into experiences</p>
          <div style={{ width:32, height:"0.5px", background:"var(--accent)", flexShrink:0 }} />
        </div>

        <p style={{ fontSize:15, lineHeight:1.9, color:"var(--ink-light)", maxWidth:520, opacity:0, animation:"fadeUp .7s .8s ease forwards" }}>
          I craft scalable web applications with clean architecture and thoughtful design —
          from intuitive interfaces to reliable backend systems, built to last.
        </p>

        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:24, marginTop:48, opacity:0, animation:"fadeUp .7s 1s ease forwards" }}>
          <HoverBtn href="#work" bg="var(--ink)" color="var(--warm-white)" hoverBg="var(--accent)">See my work</HoverBtn>
          <a href="#contact" style={{ fontSize:13, color:"var(--muted)", textDecoration:"none", display:"flex", alignItems:"center", gap:8, transition:"color .25s" }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--ink)"}
            onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
          >Get in touch <span>→</span></a>
        </div>

      </div>

    </section>
  );
}

function HoverBtn({ href, bg, color, hoverBg, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      background: hov ? hoverBg : bg, color,
      fontSize:13, fontWeight:400, letterSpacing:"0.05em",
      padding:"14px 32px", borderRadius:100, textDecoration:"none",
      display:"inline-block",
      transform: hov ? "translateY(-2px)" : "none",
      transition:"background .25s, transform .25s",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >{children}</a>
  );
}

function Tools() {
  return (
    <section id="skills" style={{ background:"var(--paper)" }}>
      <div className="section-pad" style={{ padding:"120px 64px" }}>
        <div className="tools-grid" style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:80, alignItems:"start" }}>
          <div className="tools-sticky" style={{ position:"sticky", top:120 }}>
            <Reveal><p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.22em", color:"var(--muted)", textTransform:"uppercase", marginBottom:16 }}>Skills & Tools</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(46px,5.5vw,68px)", fontWeight:300, lineHeight:1.05 }}>My<br/><em style={{ fontStyle:"italic", color:"var(--accent)" }}>toolkit</em></h2></Reveal>
            <Reveal delay={0.2}><p style={{ fontSize:15, lineHeight:1.9, color:"var(--ink-light)", marginTop:20 }}>I work across the full stack — from pixel-precise interfaces to resilient APIs and cloud deployments.</p></Reveal>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
            {Object.entries(tools).map(([cat, items], ci) => (
              <Reveal key={cat} delay={ci * 0.1}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"var(--accent)", textTransform:"uppercase", marginBottom:18, paddingBottom:10, borderBottom:"1px solid var(--border)" }}>{cat}</p>
                <div className="pill-grid" style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {items.map(([icon, name]) => <Pill key={name} icon={icon} name={name} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, name }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:8,
        padding:"10px 18px", background:"var(--warm-white)",
        border: hov ? "1px solid var(--accent)" : "1px solid var(--border)",
        borderRadius:100, fontSize:13,
        color: hov ? "var(--accent)" : "var(--ink-light)",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 4px 16px rgba(196,98,45,0.1)" : "none",
        transition:"all .25s", cursor:"default",
      }}
    >
      <span style={{ fontSize:16 }}>{icon}</span>{name}
    </div>
  );
}

function Projects() {
  return (
    <section id="work" style={{ background:"var(--warm-white)" }}>
      <div className="section-pad" style={{ padding:"120px 64px" }}>
        <Reveal><p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.22em", color:"var(--muted)", textTransform:"uppercase", marginBottom:16 }}>Selected Work</p></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(46px,5.5vw,68px)", fontWeight:300, lineHeight:1.05, marginBottom:64 }}>Recent<br/><em style={{ fontStyle:"italic", color:"var(--accent)" }}>projects</em></h2></Reveal>

        <Reveal><FeaturedCard /></Reveal>

        <div style={{ display:"flex", flexDirection:"column" }}>
          {projects.map((p, i) => <Reveal key={p.num} delay={i * 0.08}><ProjectRow {...p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard() {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="featured-card-grid"
      style={{
        borderRadius:14, overflow:"hidden", background:"var(--ink)",
        display:"grid", gridTemplateColumns:"1fr 1fr",
        minHeight:400, marginBottom:56,
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? "0 32px 60px rgba(26,22,18,0.14)" : "0 8px 32px rgba(26,22,18,0.06)",
        transition:"transform .45s ease, box-shadow .45s ease",
      }}>
      <div className="featured-card-img" style={{ background:"linear-gradient(140deg,#2a1f1a,#1a1612)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", minHeight:220,padding:24 }}>
        <div style={{ width:180, height:180, background:"linear-gradient(135deg,#c4622d,#7a2e0e)", opacity:.75, animation:"blobMorph 9s ease-in-out infinite", borderRadius:"60% 40% 55% 45% / 50% 60% 40% 50%" }} />
      </div>
      <div className="featured-card-content" style={{ padding:"52px 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"rgba(247,243,237,.35)", textTransform:"uppercase", marginBottom:16 }}>2025</p>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:300, lineHeight:1.05, color:"var(--cream)", marginBottom:14 }}>Anonymous<br/>Messages</h3>
        <p style={{ fontSize:14, lineHeight:1.8, color:"rgba(247,243,237,.5)", marginBottom:28 }}>Architected a full-stack anonymous messaging platform using the Next.js App Router with modular API routes, JWT-based authentication, and database-driven user/message management.
                                           Integrated AI-powered message suggestions, email verification workflows, and secure middleware to ensure scalable and privacy-focused communication.</p>
        <div className="featured-tags" style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {["Next.js","TypeScript","NextAuth (JWT)","MongoDB / Mongoose  ","AI API integration","Resend (email)","Tailwind CSS","Zod"].map(t => (
            <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.1em", color:"rgba(247,243,237,.35)", border:"1px solid rgba(247,243,237,.1)", padding:"4px 12px", borderRadius:4, textTransform:"uppercase" }}>{t}</span>
          ))}
        </div>
        <a href="https://github.com/Chandrashekhar44/mystery" style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:13, color:"var(--accent-light)", textDecoration:"none" }}> View Source →</a>
      </div>
    </div>
  );
}

const projects = [
  { num:"02", title:"Media Sharing Platform Backend",    desc:"Built a scalable backend API for a social media and video-sharing platform using a modular MVC architecture with Express.js and MongoDB.Implemented features like authentication, media uploads with Cloudinary, playlists, subscriptions, likes, and comments with structured controllers and middleware.",               tags:["MVC pattern (controllers / models / routes)","Express backend","MongoDB models","Cloudinary for media storage","Multer for file uploads","Custom API utilities and error handling","Authentication middleware"],Link :["https://github.com/Chandrashekhar44/backend/"] },
  { num:"03", title:"ShareBoard",   desc:"EShareBoard is a modern blog platform built with React and Redux for frontend state management, with Appwrite as the backend/database. It supports authentication, rich text posts, and a responsive custom UI.",                          tags:["React","Redux","Appwrite","JavaScript","Authentication"] , Link : ["https://github.com/Chandrashekhar44/blog-app-appwrite"] },
];

function ProjectRow({ num, title, desc, tags, Link }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={Link} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="project-row-grid"
      style={{
        display:"grid", gridTemplateColumns:"72px 1fr auto",
        alignItems:"center", gap:36,
        padding: hov ? "34px 0 34px 18px" : "34px 0",
        borderBottom:"1px solid var(--border)",
        textDecoration:"none", color:"inherit",
        position:"relative", overflow:"hidden",
        transition:"padding .35s cubic-bezier(.4,0,.2,1)",
      }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"var(--accent)", transform: hov ? "scaleY(1)" : "scaleY(0)", transformOrigin:"top", transition:"transform .35s cubic-bezier(.4,0,.2,1)" }} />
      <div className="project-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:300, lineHeight:1, color: hov ? "var(--accent)" : "var(--border)", transition:"color .3s" }}>{num}</div>
      <div>
        <div className="project-title" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:400, letterSpacing:"-0.2px", color: hov ? "var(--accent)" : "var(--ink)", marginBottom:5, transition:"color .25s" }}>{title}</div>
        <div style={{ fontSize:13, color: hov ? "var(--ink-light)" : "var(--muted)", lineHeight:1.6, maxWidth:1000, transition:"color .25s" }}>{desc}</div>
      </div>
      <div className="project-tags-col" style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
        <div style={{ display:"flex", gap:6, width:"500px", flexWrap:"wrap", justifyContent:"flex-end" }}>
          {tags.map(t => <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.08em", color:"var(--muted)", textTransform:"uppercase", background:"var(--surface)", padding:"4px 10px", borderRadius:4 }}>{t}</span>)}
        </div>
        <span style={{ fontSize:16, color: hov ? "var(--accent)" : "var(--border)", transform: hov ? "translate(3px,-2px)" : "none", transition:"color .25s, transform .25s" }}>↗</span>
      </div>
    </a>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    console.log("KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    emailjs.send(
       import.meta.env.VITE_EMAILJS_SERVICE_ID,
       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setSent(true);
      setForm({ name:"", email:"", subject:"", message:"" });
      setTimeout(() => setSent(false), 4000);
    })
    .catch((error) => {
        console.log("EmailJS Error:", error);
        alert("Something went wrong. Please try again.");
    })
    .finally(() => setSending(false));
  };

  return (
    <section id="contact" style={{ background:"var(--paper)" }}>
      <div className="contact-pad" style={{ padding:"120px 64px" }}>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:100, alignItems:"start" }}>
          <div>
            <Reveal>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,4.5vw,56px)", fontWeight:300, lineHeight:1.2, marginBottom:22 }}>
                Let's build<br/>something<br/><em style={{ fontStyle:"italic", color:"var(--accent)" }}>great together.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize:15, lineHeight:1.9, color:"var(--ink-light)", marginBottom:44, maxWidth:400 }}>
                Always excited to work on innovative projects, whether it's an internship, a full-time role, or freelance collaboration. I enjoy turning ideas into working products, especially in web development, content platforms, and interactive applications. Let's build something great together.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display:"flex", flexDirection:"column", marginBottom:44 }}>
                {contactLinks.map((l, i) => <ContactLink key={i} {...l} first={i===0} />)}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:9, fontSize:13, color:"var(--green)", background:"rgba(61,107,79,0.07)", padding:"9px 18px", borderRadius:100, border:"1px solid rgba(61,107,79,0.18)" }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", animation:"blink 2.2s ease-in-out infinite" }} />
                Available for new projects
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{ display:"flex", flexDirection:"column", gap:18, paddingTop:4 }}>
              <div className="form-name-email" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <FormField label="Your name" placeholder="Jane Smith" value={form.name} onChange={v=>setForm({...form,name:v})} />
                <FormField label="Email" placeholder="jane@company.com" value={form.email} onChange={v=>setForm({...form,email:v})} type="email" />
              </div>
              <FormField label="Subject" placeholder="A project, job offer, collaboration…" value={form.subject} onChange={v=>setForm({...form,subject:v})} />
              <FormField label="Message" placeholder="Tell me what you're working on…" value={form.message} onChange={v=>setForm({...form,message:v})} textarea />
              <SendButton sent={sent} sending={sending} onClick={handleSend} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href, first }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding: hov ? "17px 0 17px 10px" : "17px 0", borderBottom:"1px solid var(--border)", borderTop: first ? "1px solid var(--border)" : "none", textDecoration:"none", color:"inherit", transition:"padding .3s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <span style={{ fontSize:18, width:30, textAlign:"center" }}>{icon}</span>
        <div>
          <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.14em", color:"var(--muted)", textTransform:"uppercase", marginBottom:2 }}>{label}</span>
          <span style={{ fontSize:14, color:"var(--ink)", wordBreak:"break-word" }}>{value}</span>
        </div>
      </div>
      <span style={{ fontSize:16, color: hov ? "var(--accent)" : "var(--border)", transform: hov ? "translate(3px,-2px)" : "none", transition:"color .25s, transform .25s", flexShrink:0, marginLeft:8 }}>↗</span>
    </a>
  );
}

function FormField({ label, placeholder, value, onChange, type="text", textarea=false }) {
  const [focused, setFocused] = useState(false);
  const shared = {
    background:"var(--warm-white)",
    border: focused ? "1px solid var(--accent)" : "1px solid var(--border)",
    boxShadow: focused ? "0 0 0 3px rgba(196,98,45,0.07)" : "none",
    borderRadius:8, padding:"13px 15px",
    fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300,
    color:"var(--ink)", outline:"none", width:"100%",
    transition:"border-color .25s, box-shadow .25s",
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.15em", color:"var(--muted)", textTransform:"uppercase" }}>{label}</label>
      {textarea
        ? <textarea placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{ ...shared, resize:"none", height:130, lineHeight:1.7 }} />
        : <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={shared} />
      }
    </div>
  );
}

function SendButton({ sent, sending, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      disabled={sending}
      style={{
        background: sent ? "var(--green)" : hov ? "var(--accent)" : "var(--ink)",
        color:"var(--warm-white)", border:"none", borderRadius:100,
        padding:"15px 36px", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:400,
        letterSpacing:"0.03em", cursor: sending ? "not-allowed" : "pointer", alignSelf:"flex-start",
        opacity: sending ? 0.7 : 1,
        transform: hov && !sent && !sending ? "translateY(-2px)" : "none",
        transition:"background .25s, transform .25s",
      }}>
      {sent ? "Sent ✓" : sending ? "Sending…" : "Send message"}
    </button>
  );
}

function Footer() {
  return (
    <footer style={{ background:"var(--ink)" }}>
      <div className="footer-inner" style={{ padding:"44px 64px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:"var(--cream)", letterSpacing:"0.02em" }}>Chandra Shekhar</span>
        <span className="footer-credit" style={{ fontSize:12, color:"rgba(247,243,237,.3)", fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em" }}>Designed & built by Chandrashekhar · 2025</span>
        <span className="footer-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{ fontSize:12, color:"rgba(247,243,237,.3)", fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", cursor:"pointer", transition:"color .25s" }}
          onMouseEnter={e=>e.target.style.color="rgba(247,243,237,.7)"}
          onMouseLeave={e=>e.target.style.color="rgba(247,243,237,.3)"}
        >Back to top ↑</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Tools />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

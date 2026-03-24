"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants, useSpring, useInView } from "framer-motion";
import { ArrowRight, Download, Link2, Github, Mail, Phone, MapPin, Send, Award, Briefcase, GraduationCap, Code2, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import resumeData from "@/data/resume.json";
import projectsData from "@/data/projects.json";

/* ============ ANIMATION VARIANTS ============ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

/* ============ SUB-COMPONENTS ============ */
function AnimatedText({ text, className, once = true }: { text: string; className?: string; once?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-100px" });
  return (
    <motion.span ref={ref} variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariant} className="inline-block" style={{ whiteSpace: "pre" }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MagneticButton({ children, className, href, onClick, download, type, disabled }: any) {
  const ref = useRef<any>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPos({ x: (clientX - (left + width / 2)) * 0.15, y: (clientY - (top + height / 2)) * 0.15 });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp ref={ref} href={href} onClick={onClick} download={download} type={type} disabled={disabled}
      onMouseMove={handleMouse} onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}>{children}</Comp>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8 relative z-10">
      <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary-500/50 to-transparent" />
    </div>
  );
}

/* ============ MAIN PAGE ============ */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const smoothX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ from_name: "", from_email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus("loading");
    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      setFormData({ from_name: "", from_email: "", message: "", honeypot: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.text || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="relative">
      {/* GLOBAL MOUSE GLOW */}
      <motion.div className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[120px] mix-blend-screen z-[5] hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }} />

      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <motion.section id="home" style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-primary-500 dark:text-primary-400">
              <span className="flex w-2 h-2 rounded-full bg-primary-500 mr-2.5 animate-pulse glow-dot" />
              Available for new opportunities
            </motion.div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-emerald-300 to-blue-400 animate-text-gradient block">
                <AnimatedText text="Prince Kushwaha" />
              </span>
              <motion.span variants={fadeUp} className="block text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600 dark:text-gray-400 mt-4 tracking-wide">
                {resumeData.basics.title}
              </motion.span>
            </h1>

            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              {resumeData.basics.summary}
            </motion.p>

            {/* Stats Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 sm:gap-16 pt-4">
              {[
                { value: 4, suffix: "+", label: "Production Apps" },
                { value: 2, suffix: "+", label: "Years Experience" },
                { value: 100, suffix: "/100", label: "Lighthouse Score" },
                { value: 25, suffix: "%", label: "Conversion Boost" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 uppercase tracking-widest font-mono">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              <MagneticButton href="#projects" className="group relative w-full sm:w-auto items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white overflow-hidden transition-shadow hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.9)] focus:outline-none focus:ring-2 focus:ring-primary-500 flex">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                View My Work <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="#contact" className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-primary-500/50 bg-white/5 dark:bg-black/20 backdrop-blur-md px-8 py-4 text-lg font-semibold hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                <Mail className="mr-2 h-5 w-5" /> Get In Touch
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-400">
          <span className="text-xs tracking-widest uppercase mb-2 font-mono">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <SectionDivider />

      {/* ═══════════════════ 2. ABOUT ═══════════════════ */}
      <section id="about" className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-primary-500 text-sm font-mono tracking-widest uppercase">Who I Am</span>
              <div className="h-px w-12 bg-primary-500" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-center text-gray-900 dark:text-white">
              <AnimatedText text="About Me" />
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div variants={slideInLeft} className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{resumeData.basics.summary}</p>
                
                {/* Key Highlights */}
                <div className="space-y-3 pt-4">
                  <h4 className="text-sm font-mono tracking-widest text-primary-500 uppercase mb-4">Key Highlights</h4>
                  {resumeData.basics.highlights.map((h, i) => (
                    <motion.div key={i} whileHover={{ x: 8 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5 hover:border-primary-500/30 transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={slideInRight} className="space-y-6">
                {/* Education Card */}
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/20 transition-all duration-500 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                  </div>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="border-l-2 border-primary-500 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.institution}</h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{edu.degree}</p>
                      <p className="text-gray-500 text-sm mt-2">{edu.description}</p>
                      <span className="text-xs text-gray-400 font-mono mt-2 block">{edu.startDate} — {edu.endDate}</span>
                    </div>
                  ))}
                </div>

                {/* Certifications Card */}
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/20 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                  </div>
                  <ul className="space-y-3">
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════ 3. EXPERIENCE ═══════════════════ */}
      <section id="experience" className="py-28 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-primary-500 text-sm font-mono tracking-widest uppercase">Career</span>
              <div className="h-px w-12 bg-primary-500" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-20 text-center text-gray-900 dark:text-white">
              <AnimatedText text="Experience" />
            </h2>

            <div className="space-y-12">
              {resumeData.experience.map((exp, index) => (
                <motion.div key={index} variants={fadeUp}
                  className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.2)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                          <h4 className="text-lg text-primary-600 dark:text-primary-400 font-medium">{exp.company}</h4>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-1.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold tracking-wider font-mono shrink-0">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  {exp.achievements && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {exp.achievements.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 5 }} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary-500/30 transition-all">
                          <ArrowRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════ 4. PROJECTS ═══════════════════ */}
      <section id="projects" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary-500" />
                <span className="text-primary-500 text-sm font-mono tracking-widest uppercase">Portfolio</span>
                <div className="h-px w-12 bg-primary-500" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
                <AnimatedText text="Featured Projects" />
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">Real-world applications built from scratch, deployed on production infrastructure.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projectsData.map((project, index) => (
                <motion.div key={index} variants={fadeUp} whileHover={{ y: -8 }}
                  className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary-500/20 transition-all duration-500 flex flex-col">
                  
                  {/* Project Image */}
                  <div className="aspect-[16/9] w-full relative overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                    
                    <h3 className="absolute bottom-5 left-6 right-6 z-20 text-white font-bold text-2xl sm:text-3xl tracking-tight">
                      {project.title}
                    </h3>

                    <div className="absolute top-5 right-5 z-20 flex gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {project.githubLink !== "#" && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-2.5 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-primary-500 hover:border-primary-500 transition-all shadow-lg">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink !== "#" && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-2.5 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-primary-500 hover:border-primary-500 transition-all shadow-lg">
                          <Link2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary-500/10 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold tracking-wider border border-primary-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-black/10 dark:border-white/10 pt-5">
                      <div className="grid grid-cols-2 gap-3">
                        {project.caseStudy.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════ 5. SKILLS ═══════════════════ */}
      <section id="skills" className="py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-primary-500 text-sm font-mono tracking-widest uppercase">Expertise</span>
              <div className="h-px w-12 bg-primary-500" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-20 text-center text-gray-900 dark:text-white">
              <AnimatedText text="Tech Stack" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { title: "Frontend", icon: Code2, data: resumeData.skills.frontend, gradient: "from-blue-500 to-cyan-400" },
                { title: "Backend", icon: Briefcase, data: resumeData.skills.backend, gradient: "from-emerald-500 to-teal-400" },
                { title: "Database", icon: Award, data: resumeData.skills.database, gradient: "from-purple-500 to-pink-400" },
                { title: "DevOps", icon: Send, data: resumeData.skills.devops, gradient: "from-orange-500 to-amber-400" }
              ].map((category, idx) => (
                <motion.div key={idx} variants={scaleIn}
                  className="bg-card/80 backdrop-blur-xl rounded-3xl p-7 border border-white/10 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.data.map((skill, sIdx) => (
                      <motion.span whileHover={{ scale: 1.08 }} key={sIdx}
                        className="px-3.5 py-1.5 bg-white dark:bg-white/5 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 border border-black/5 dark:border-white/10 hover:bg-primary-500 hover:text-white hover:border-primary-500 dark:hover:bg-primary-500 transition-all cursor-default shadow-sm">
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════ 6. CONTACT (EmailJS) ═══════════════════ */}
      <section id="contact" className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary-500" />
                <span className="text-primary-500 text-sm font-mono tracking-widest uppercase">Contact</span>
                <div className="h-px w-12 bg-primary-500" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
                <AnimatedText text="Let's Connect" />
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-xl mx-auto">
                Have a project in mind or want to discuss opportunities? I'd love to hear from you.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}
              className="bg-card/60 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Get in Touch</h3>
                  <p className="text-gray-500 dark:text-gray-400">Fill out the form and I'll respond within 24 hours. Auto-reply is enabled.</p>

                  {[
                    { icon: Mail, label: "Email", value: resumeData.basics.email, href: `mailto:${resumeData.basics.email}` },
                    { icon: Phone, label: "Phone", value: resumeData.basics.phone, href: `tel:${resumeData.basics.phone}` },
                    { icon: MapPin, label: "Location", value: resumeData.basics.location, href: null }
                  ].map((c, idx) => (
                    <motion.div key={idx} whileHover={{ x: 8 }} className="flex items-center group">
                      <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl flex items-center justify-center mr-5 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300 shadow-sm">
                        <c.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">{c.label}</p>
                        {c.href ? (
                          <a href={c.href} className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 transition-colors">{c.value}</a>
                        ) : (
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{c.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* EmailJS Form */}
                <div className="lg:col-span-3 bg-white/60 dark:bg-black/40 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-inner">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <input type="text" id="from_name" name="from_name" required placeholder=" " value={formData.from_name} onChange={handleChange}
                          className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700 pb-3 pt-6 text-lg placeholder-transparent focus:ring-0 focus:border-primary-500 transition-colors" />
                        <label htmlFor="from_name" className="absolute left-0 top-0 text-xs text-gray-400 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 cursor-text font-mono uppercase tracking-widest">Name</label>
                      </div>
                      <div className="relative">
                        <input type="email" id="from_email" name="from_email" required placeholder=" " value={formData.from_email} onChange={handleChange}
                          className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700 pb-3 pt-6 text-lg placeholder-transparent focus:ring-0 focus:border-primary-500 transition-colors" />
                        <label htmlFor="from_email" className="absolute left-0 top-0 text-xs text-gray-400 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 cursor-text font-mono uppercase tracking-widest">Email</label>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea id="message" name="message" rows={4} required placeholder=" " value={formData.message} onChange={handleChange}
                        className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700 pb-3 pt-6 text-lg placeholder-transparent focus:ring-0 focus:border-primary-500 transition-colors resize-none" />
                      <label htmlFor="message" className="absolute left-0 top-0 text-xs text-gray-400 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 cursor-text font-mono uppercase tracking-widest">Message</label>
                    </div>

                    {status === "success" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-600 bg-green-500/10 p-4 rounded-xl font-medium text-sm">✓ Message sent! Auto-reply has been sent to your email.</motion.div>}
                    {status === "error" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 bg-red-500/10 p-4 rounded-xl font-medium text-sm">{errorMessage}</motion.div>}

                    <MagneticButton type="submit" disabled={status === "loading"}
                      className="w-full h-14 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg font-bold hover:scale-[1.02] hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center group overflow-hidden relative border-0">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-500">
                        {status === "loading" ? (
                          <><span className="animate-spin mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Sending...</>
                        ) : (
                          <>Send Message <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </span>
                    </MagneticButton>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

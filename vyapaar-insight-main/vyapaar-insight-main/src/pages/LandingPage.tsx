import { Link } from "react-router-dom";
import { Zap, TrendingUp, BarChart2, AlertTriangle, IndianRupee, ArrowLeftRight, Factory, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "@/components/ui/typewriter";
import { Logo } from "@/components/ui/logo";

const features = [
  { icon: TrendingUp, title: "Profit Prediction", desc: "ML-powered forecasting using Linear Regression + Random Forest", color: "#6366F1", colSpan: "lg:col-span-2", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
  { icon: BarChart2, title: "Trend Analysis", desc: "Discover top-selling products & seasonal demand patterns", color: "#8B5CF6", colSpan: "lg:col-span-1", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
  { icon: AlertTriangle, title: "Churn Prediction", desc: "Know which customers are about to leave — before they do", color: "#F59E0B", colSpan: "lg:col-span-1", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" },
  { icon: IndianRupee, title: "Revenue Tracking", desc: "Real-time income monitoring with categorization", color: "#10B981", colSpan: "lg:col-span-2", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" },
];

const stats = [
  { value: "₹2.4Cr+", label: "Total revenue tracked" },
  { value: "1,200+", label: "Businesses using Vyapaar-View" },
  { value: "94%", label: "Prediction accuracy" },
  { value: "18 days", label: "Avg cash shortage prevented" },
];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-50 mix-blend-overlay"></div>
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-40 bg-background/40 backdrop-blur-2xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo className="w-8 h-8 text-foreground" />
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-foreground">Vyapaar-View</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Platform</a>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Resources</Link>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hidden sm:inline-flex text-sm font-semibold hover:text-primary transition-colors">
              Log in
            </Link>
            <Link to="/dashboard" className="relative group overflow-hidden rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Glows */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/30 via-secondary/10 to-transparent blur-[120px] rounded-[100%] pointer-events-none" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10 w-full"
          style={{ y: heroY, opacity: opacityHero }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-sans font-black leading-[1.05] tracking-tighter text-foreground mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x leading-tight block pb-4">
                  <Typewriter 
                    words={[
                      "Financial Intelligence.", 
                      "Predictive Insights.", 
                      "Automated Growth.", 
                      "Smarter Decisions."
                    ]} 
                    speed={140} 
                    delayBetweenWords={2500}
                  />
                </span>
              </h1>
              <p className="mt-8 text-muted-foreground text-2xl md:text-3xl max-w-xl mx-auto lg:mx-0 font-space font-medium leading-relaxed tracking-tight">
                Apna Vyapaar, Apna Insight.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2">
                  Launch App <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-card/50 backdrop-blur-md border border-border text-foreground font-bold text-lg hover:bg-card hover:border-primary/30 transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" /> Watch Presentation
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full max-w-2xl perspective-1000"
            >
              <div className="relative rounded-[2rem] border border-border/50 bg-card outline outline-4 outline-white/5 shadow-2xl shadow-primary/20 overflow-hidden transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay z-10" />
                {/* Simulated App Header */}
                <div className="h-12 border-b border-border/50 bg-background/50 backdrop-blur-md flex items-center px-4 gap-2 z-20 relative">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                {/* High quality dashboard image placeholder */}
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <section className="border-y border-border/50 bg-card/30 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <motion.div 
              key={s.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center"
            >
              <p className="font-sans font-black text-4xl md:text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">{s.value}</p>
              <p className="text-muted-foreground font-medium mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features: Bento Box Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Built for growth. <br/><span className="text-muted-foreground">Designed for you.</span></h2>
            <p className="text-xl text-muted-foreground">Every insight meticulously calculated and presented beautifully to help you make split-second business decisions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card min-h-[400px] flex flex-col justify-end p-8 cursor-pointer ${f.colSpan}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-background/50 backdrop-blur-xl border border-border shadow-2xl">
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-sans font-bold text-3xl tracking-tight text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 relative z-10 text-center"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">Ready to scale?</h2>
          <p className="text-2xl text-muted-foreground mb-12">Join 1,200+ Indian businesses automating their growth today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-full bg-foreground text-background font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
              Start Free Trial <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-foreground" />
            <span className="font-display font-black tracking-tight text-xl">Vyapaar-View</span>
          </div>
          <p className="text-muted-foreground font-medium">© 2026 Vyapaar-View. Designed & Developed by <span className="text-foreground font-bold">EurekaX</span>.</p>
        </div>
      </footer>
    </div>
  );
}

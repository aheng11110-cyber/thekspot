import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ConnectAILabLogo } from './components/ConnectAILabLogo';
import { CurationSection } from './components/CurationSection';
import { MondrianHeroGrid } from './components/MondrianHeroGrid';
import { NewsSidebar } from './components/NewsSidebar';
import PayPalCheckoutButton from './components/payment/PayPalCheckoutButton';
import { useAuth } from './contexts/AuthContext';
import { createOrder } from './lib/firestore';
import { PRODUCTS } from './lib/paypal';
import { VIDEO_URLS } from './config/videos';
import { SITE_CONTENT, BRAND_NAME, COPYRIGHT } from './config/content';
import { useLanguage } from './contexts/LanguageContext';
import { AdminNews } from './pages/AdminNews';
import { PopupCalendar } from './components/PopupCalendar';
import { HashtagSearchModal } from './components/HashtagSearchModal';
import { FoodMapModal } from './components/FoodMapModal';
import { KSlangModal } from './components/KSlangModal';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function App() {
  const isAdminRoute = window.location.search.includes('admin=true');
  if (isAdminRoute) {
    return <AdminNews />;
  }
  return <MainApp />;
}

function MainApp() {
  const [entranceComplete, setEntranceComplete] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHashtagModal, setShowHashtagModal] = useState(false);
  const [showFoodMapModal, setShowFoodMapModal] = useState(false);
  const [showSlangModal, setShowSlangModal] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    try {
      await fetch('https://hook.us2.make.com/vxh0xtei54rpvmombfmg61dbvanvcbrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'TheKSpot Footer', timestamp: new Date().toISOString() }),
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => {
        const el = document.getElementById('pricing-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } catch (error) {
      console.error('Subscription error:', error);
      setNewsletterStatus('error');
    }
  };

  const { user } = useAuth();
  const { lang } = useLanguage();

  /* ── PayPal 결제 완료 → Firestore 저장 ── */
  const handlePayPalSuccess = useCallback(
    async (details: any, productId: string, productName: string, amount: string) => {
      const orderId = details.id || `pp_${Date.now()}`;
      try {
        await createOrder({
          id: orderId,
          userId: user?.uid || 'anonymous',
          productId,
          productName,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'completed',
          paypalOrderId: orderId,
          paypalPayerId: details.payer?.payer_id || '',
        });
        console.log('[Firestore] Order saved:', orderId);
        alert(`✅ 결제 완료! Order: ${orderId}`);
      } catch (err) {
        console.error('[Firestore] Failed to save order:', err);
        alert(`결제는 완료되었지만 기록 저장에 실패했습니다. Order: ${orderId}`);
      }
    },
    [user]
  );


  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ── Section 2 scroll-driven 3D text ── */
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });
  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform3D = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  /* ── Destructure config for readability ── */
  const currentContent = SITE_CONTENT[lang];
  const { hero, cinematic, metrics, technology, architecture, footer, pricing } = currentContent;

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section className="snap-start snap-always relative h-screen h-[100dvh] flex flex-row overflow-hidden bg-black">
        {/* Animated Mondrian Grid on the left */}
        <div className="relative w-[45%] h-full shrink-0">
          <MondrianHeroGrid />
        </div>

        {/* Hero content on the right */}
        <motion.div
          className="relative z-20 flex flex-col flex-1 px-8 lg:px-16 pr-[280px] lg:pr-[360px]"

          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full max-w-[800px] flex-1 flex flex-col justify-center">
          <div className="w-full max-w-[800px] flex-1 flex flex-col justify-center gap-8 lg:gap-12 pb-12">
            <h1
              className="text-white font-light leading-[1.1] tracking-[-0.03em] text-left"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                {hero.titleLeft.join(' ')}
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block text-white/60"
              >
                {hero.titleRight.join(' ')}
              </motion.span>
            </h1>

            <motion.p
              className="max-w-[500px] text-white/80 leading-[1.6] font-normal"
              style={{ fontSize: 'clamp(15px, 2vw, 20px)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.215, 0.61, 0.355, 1.0],
                delay: 0.6,
              }}
            >
              {hero.description}
            </motion.p>
          </div>
          </div>

          {/* Newsletter Form Aligned to the Bottom */}
          <div className="w-full max-w-[800px] pb-12 sm:pb-16 pl-10 sm:pl-20">
            <motion.form 
              onSubmit={handleSubscribe} 
              className="max-w-[450px]"
              initial={{ opacity: 0, y: 20 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-white/70 text-[13px] mb-3 uppercase tracking-wider font-medium">Join our Newsletter</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all shadow-inner"
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus === 'loading'}
                  className="bg-white text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {newsletterStatus === 'loading' ? 'Sending...' : 'Subscribe'}
                </button>
              </div>
              {newsletterStatus === 'success' && <p className="text-[#39FF14] text-[13px] mt-3 font-medium">Successfully subscribed! Welcome aboard.</p>}
              {newsletterStatus === 'error' && <p className="text-red-400 text-[13px] mt-3 font-medium">Failed to subscribe. Please try again.</p>}
            </motion.form>
          </div>
        </motion.div>

        {/* News Sidebar Overlay */}
        <NewsSidebar />
      </section>

      {/* ════════════════ SECTION 1.5: CURATION SECTION ════════════════ */}
      <CurationSection />

      {/* ════════════════ SECTION 5: ARCHITECTURE (Moved to Page 3) ════════════════ */}
      <section className="snap-start snap-always min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              {architecture.subtitle}
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              {architecture.heading}
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              {architecture.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {architecture.layers.map((l: any) => {
              const handleClick = () => {
                if (l.num === 1) setShowFoodMapModal(true);
                else if (l.num === 2) setShowCalendar(true);
                else if (l.num === 3) setShowSlangModal(true);
                else if (l.num === 4) setShowHashtagModal(true);
              };

              return (
                <div
                  key={l.num}
                  onClick={handleClick}
                  className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 cursor-pointer hover:bg-white/5 hover:border-white/30 transition-colors group"
                >
                  <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                    Layer {l.num}
                  </span>
                  <span className="text-white text-[16px] sm:text-[18px] font-light group-hover:text-blue-300 transition-colors">
                    {l.name}
                  </span>
                </div>
              );
            })}
          </motion.div>


        </div>
      </section>



      {/* ════════════════ SECTION 6: PRICING ════════════════ */}
      <section id="pricing-section" className="snap-start snap-always min-h-screen bg-black py-16 md:py-20 px-4 md:px-6 flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              {pricing.subtitle}
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              {pricing.title}
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              {pricing.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── Free ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col relative"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#111] border border-white/20 text-white/80 text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
                  Newsletter
                </span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.free}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$0</span>
                <span className="text-white/30 text-[14px]">/free</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {pricing.freeDesc}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {pricing.freeFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-white/60 text-[13px]">
                    <span className="text-white/30">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                 <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-full h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 border border-[#39FF14]/50 text-[#39FF14] bg-[#39FF14]/5 hover:bg-[#39FF14]/10 transition-colors">
                    Free Subscribe
                 </button>
              </div>
            </motion.div>

            {/* ── Pro (Featured) ── */}
            <motion.div
              className="border border-white/25 rounded-2xl p-6 lg:p-8 flex flex-col relative bg-white/[0.03]"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-white text-black text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
                  {pricing.mostPopular}
                </span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.pro}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$29.99</span>
                <span className="text-white/30 text-[14px]">{pricing.oneTime}</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {pricing.proDesc}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {pricing.proFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-white/60 text-[13px]">
                    <span className="text-white/30">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <PayPalCheckoutButton
                  product={PRODUCTS[1]}
                  onSuccess={(details) => handlePayPalSuccess(details, PRODUCTS[1].id, PRODUCTS[1].name, PRODUCTS[1].price)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              </div>
            </motion.div>

            {/* ── Enterprise ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.enterprise}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">Custom</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                {pricing.enterpriseDesc}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {pricing.enterpriseFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-white/60 text-[13px]">
                    <span className="text-white/30">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contact@thekspot.me"
                  className="w-full max-w-md mx-auto h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:bg-white/5 transition-colors"
                >
                  {pricing.contactSales}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* ════════════════ SECTION 3: METRICS ════════════════ */}
      <section className="snap-start snap-always relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

        <div className="relative z-20 pt-32 pb-32 px-6 max-w-6xl mx-auto w-full">
          <motion.p
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {metrics.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {metrics.items.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="text-white font-light tracking-[-0.04em] leading-none"
                  style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
                >
                  {m.value}
                </div>
                <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 4: TECHNOLOGY ════════════════ */}
      <section className="snap-start snap-always relative h-screen h-[100dvh] flex flex-col overflow-hidden bg-black">

        <div className="relative z-20 flex flex-col flex-1 px-8 sm:px-12 md:px-16 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <motion.h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.title[0]}
              <br />
              {technology.title[1]}
            </motion.h2>

            <motion.p
              className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.description}
            </motion.p>
          </div>

          <div className="flex-1" />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {technology.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                  {f.title}
                </h3>
                <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 2: CINEMATIC TEXT (Moved to Page 5) ════════════════ */}
      <section
        ref={section2Ref}
        className="snap-start snap-always relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      >

        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{
            height: 180,
            background: 'linear-gradient(to bottom, #010103, transparent)',
          }}
        />

        {/* 3D text content */}
        <div className="relative z-20 max-w-5xl mx-auto" style={{ perspective: 400 }}>
          <motion.p
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
            style={{
              transform: transform3D,
              opacity: textOpacity,
            }}
          >
            {cinematic.text}
          </motion.p>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="snap-start snap-always bg-black overflow-hidden flex flex-col justify-end">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Empty Space or Fallback */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative bg-black">
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <ConnectAILabLogo size={18} className="text-white/70" />
                <span className="text-[15px] font-medium text-white/70 tracking-tight">
                  {BRAND_NAME}
                </span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-12">
                {footer.tagline}
              </p>

              {/* Newsletter Form was moved to the Hero section */}
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              {COPYRIGHT}
            </p>
          </div>
        </div>
      </footer>

      {/* ──────────────── POPUP STORE CALENDAR MODAL ──────────────── */}
      <AnimatePresence>
        {showCalendar && <PopupCalendar onClose={() => setShowCalendar(false)} />}
      </AnimatePresence>

      {/* ──────────────── HASHTAG SEARCH MODAL ──────────────── */}
      <AnimatePresence>
        {showHashtagModal && <HashtagSearchModal onClose={() => setShowHashtagModal(false)} />}
      </AnimatePresence>

      {/* ──────────────── FOOD MAP MODAL (Layer 1) ──────────────── */}
      <AnimatePresence>
        {showFoodMapModal && <FoodMapModal onClose={() => setShowFoodMapModal(false)} />}
      </AnimatePresence>

      {/* ──────────────── K-SLANG MODAL (Layer 3) ──────────────── */}
      <AnimatePresence>
        {showSlangModal && <KSlangModal onClose={() => setShowSlangModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

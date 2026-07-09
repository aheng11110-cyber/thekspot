import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
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


export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
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
          className="relative z-20 flex flex-col flex-1 px-8 lg:px-16 pr-[280px] lg:pr-[360px] justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col gap-6 md:gap-12">
            <h1
              className="text-white font-light leading-[1.05] tracking-[-0.03em] text-left"
              style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                {hero.titleLeft[0]} {hero.titleLeft[1]}
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block text-white/60"
              >
                {hero.titleRight[0]} {hero.titleRight[1]}
              </motion.span>
            </h1>

            <motion.p
              className="max-w-md text-[14px] sm:text-[16px] text-white/80 leading-relaxed font-normal"
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
        </motion.div>

        {/* News Sidebar Overlay */}
        <NewsSidebar />
      </section>

      {/* ════════════════ SECTION 1.5: CURATION SECTION ════════════════ */}
      <CurationSection />

      {/* ════════════════ SECTION 2: CINEMATIC TEXT ════════════════ */}
      <section
        ref={section2Ref}
        className="snap-start snap-always relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Video background */}
        {VIDEO_URLS.section2 && (
          <video
            src={VIDEO_URLS.section2}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

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

      {/* ════════════════ SECTION 3: METRICS ════════════════ */}
      <section className="snap-start snap-always relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        {VIDEO_URLS.metrics && (
          <video
            src={VIDEO_URLS.metrics}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

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
      <section className="snap-start snap-always relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Video background */}
        {VIDEO_URLS.technology && (
          <video
            src={VIDEO_URLS.technology}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

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

      {/* ════════════════ SECTION 5: ARCHITECTURE ════════════════ */}
      <section className="snap-start snap-always min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
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
            {architecture.layers.map((l) => (
              <div
                key={l.num}
                className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
              >
                <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                  Layer {l.num}
                </span>
                <span className="text-white text-[16px] sm:text-[18px] font-light">
                  {l.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 6: PRICING ════════════════ */}
      <section className="snap-start snap-always min-h-screen bg-black py-32 px-6 flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.3 }}
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
            {/* ── Basic ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.basic}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$29.99</span>
                <span className="text-white/30 text-[14px]">/one-time</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Weekly Seongsu popup route map & Naver-filtered clean food lists.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Weekly updated popup maps
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Naver-filtered clean food list
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Basic K-slang/meme glossary
                </li>
              </ul>
              <div className="flex flex-col gap-3">
                <PayPalCheckoutButton
                  product={PRODUCTS[0]}
                  onSuccess={(details) => handlePayPalSuccess(details, PRODUCTS[0].id, PRODUCTS[0].name, PRODUCTS[0].price)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              </div>
            </motion.div>

            {/* ── Pro (Featured) ── */}
            <motion.div
              className="border border-white/25 rounded-2xl p-8 flex flex-col relative bg-white/[0.03]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-white text-black text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
                  {pricing.mostPopular}
                </span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.pro}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$29.99</span>
                <span className="text-white/30 text-[14px]">/one-time</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Real-time custom maps, K-slang guides & private Discord channel feed.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> All Naver-filtered clean food maps
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Premium weekly K-slang guides
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Priority Q&A & translation support
                </li>
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
              className="border border-white/10 rounded-2xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">{pricing.enterprise}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">Custom</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Custom corporate tour guides & retail popup placement analysis.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> B2B brand popup placement support
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Custom local SEO & marketing consulting
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Dedicated English guide support
                </li>
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

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="snap-start snap-always bg-black overflow-hidden flex flex-col justify-end">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Video */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            {VIDEO_URLS.footer ? (
              <video
                src={VIDEO_URLS.footer}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}
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
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                {footer.tagline}
              </p>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              {COPYRIGHT}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

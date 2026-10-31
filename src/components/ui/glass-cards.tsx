import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData, TreatmentCardItem } from '../../lib/utils';
import { getAssetUrl } from '../../utils/assetUrl';
import { CheckCircle2, Clock, CalendarCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    code?: string;
    subtitle?: string;
    duration?: string;
    fee?: string;
    feeNum?: number;
    image?: string;
    badge?: string;
    features?: string[];
    onOpenBooking?: (service: string, price: number) => void;
}

export const Card: React.FC<CardProps> = ({ 
    title, 
    description, 
    index, 
    totalCards, 
    color,
    code,
    subtitle,
    duration,
    fee,
    feeNum = 600,
    image,
    badge,
    features = [],
    onOpenBooking
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        // Create scroll trigger for stacking effect
        const st = ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            st.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: '80px',
                padding: '1rem 0'
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '92%',
                    maxWidth: '1040px',
                    minHeight: '480px',
                    borderRadius: '28px',
                    isolation: 'isolate',
                    top: `calc(-2vh + ${index * 20}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-2.5px',
                        borderRadius: '30px',
                        padding: '2.5px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 60deg,
                            ${color.replace('0.8', '0.5')} 120deg,
                            transparent 180deg,
                            ${color.replace('0.8', '0.3')} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Glass Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '28px',
                    background: `
                        linear-gradient(145deg, 
                            rgba(18, 18, 22, 0.94), 
                            rgba(10, 10, 12, 0.97)
                        )
                    `,
                    backdropFilter: 'blur(28px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    boxShadow: `
                        0 20px 50px rgba(0, 0, 0, 0.45),
                        0 4px 12px rgba(0, 0, 0, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.25),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.08)
                    `,
                    overflow: 'hidden'
                }}>
                    {/* Enhanced Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '45%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 60%, transparent 100%)',
                        pointerEvents: 'none',
                        borderRadius: '28px 28px 0 0'
                    }} />

                    {/* Glass shine effect */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '16px',
                        right: '16px',
                        height: '1.5px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                        borderRadius: '1px',
                        pointerEvents: 'none'
                    }} />

                    {/* Side glass reflection */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '2px',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                        borderRadius: '28px 0 0 28px',
                        pointerEvents: 'none'
                    }} />

                    {/* Frosted glass micro-texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.03) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '28px',
                        opacity: 0.6
                    }} />

                    {/* Content Layer (Grid Layout: Photo + Clinical Details) */}
                    <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch justify-between h-full text-white">
                        
                        {/* Left: Authentic Photography / Imagery Frame */}
                        {image && (
                            <div className="lg:w-5/12 relative rounded-2xl overflow-hidden border border-white/10 min-h-[220px] sm:min-h-[260px] bg-neutral-900 flex-shrink-0 group">
                                <img 
                                    src={getAssetUrl(image)} 
                                    alt={title}
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                
                                {badge && (
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white/90">
                                        {badge}
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                                    <span className="text-xs font-bold text-pink-300 font-mono">{code || `MED-0${id}`}</span>
                                    {duration && (
                                        <span className="text-[11px] text-white/80 font-medium flex items-center space-x-1">
                                            <Clock className="w-3 h-3 text-white/60" />
                                            <span>{duration}</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Right: Clinical Procedure Spec & Booking */}
                        <div className="flex-1 flex flex-col justify-between space-y-5">
                            <div className="space-y-4">
                                
                                {/* Header Row: Code & Fee */}
                                <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                                    <div className="space-y-0.5">
                                        <span className="text-xs font-semibold text-pink-400 font-mono block">
                                            {code || `PROCEDURE 0${id}`}
                                        </span>
                                        {subtitle && (
                                            <span className="text-xs text-neutral-400 font-normal">
                                                {subtitle}
                                            </span>
                                        )}
                                    </div>

                                    {fee && (
                                        <div className="text-right">
                                            <span className="font-display text-3xl font-bold text-white tracking-tight tabular-nums block">
                                                {fee}
                                            </span>
                                            <span className="text-xs text-neutral-400 font-normal block">
                                                per session
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                                    {title}
                                </h3>

                                {/* Clinical Description */}
                                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                                    {description}
                                </p>

                                {/* Features Checklist */}
                                {features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10">
                                        {features.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-center space-x-2 text-xs text-neutral-300">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                                                <span className="truncate">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Booking Action Footer */}
                            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                                <span className="text-[11px] text-neutral-400 font-normal">
                                    100% sterile single-use surgical needles included
                                </span>

                                <button
                                    onClick={() => {
                                        if (onOpenBooking) {
                                            onOpenBooking(title, feeNum);
                                        } else {
                                            window.location.hash = '#/booking';
                                        }
                                    }}
                                    className="px-6 py-3 rounded-xl text-xs font-semibold bg-brand hover:bg-brand-dark text-white flex items-center space-x-2 transition-colors duration-200 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:active:scale-95"
                                >
                                    <CalendarCheck className="w-3.5 h-3.5" />
                                    <span>Schedule session ({fee || '₹600'})</span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export interface StackedCardsProps {
    items?: TreatmentCardItem[];
    onOpenBooking?: (service: string, price: number) => void;
}

export const StackedCards: React.FC<StackedCardsProps> = ({ 
    items = cardData, 
    onOpenBooking 
}) => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.0,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="w-full relative py-12">
            {items.map((card, index) => (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    index={index}
                    totalCards={items.length}
                    color={card.color}
                    code={card.code}
                    subtitle={card.subtitle}
                    duration={card.duration}
                    fee={card.fee}
                    feeNum={card.feeNum}
                    image={card.image}
                    badge={card.badge}
                    features={card.features}
                    onOpenBooking={onOpenBooking}
                />
            ))}
        </section>
    );
};

export default StackedCards;

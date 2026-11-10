import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    /* Extended clinical props (optional — keeps backward compat with cardData) */
    code?: string;
    subtitle?: string;
    duration?: string;
    fee?: string;
    feeNum?: number;
    features?: string[];
    onOpenBooking?: (service: string, price: number) => void;
}

const Card: React.FC<CardProps> = ({
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

        // Create scroll trigger for stacking effect (exact movement mechanics preserved)
        const trigger = ScrollTrigger.create({
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
            trigger.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '450px',
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: `calc(-5vh + ${index * 25}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '27px',
                        padding: '3px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 60deg,
                            ${color.replace('0.8', '0.6')} 120deg,
                            transparent 180deg,
                            ${color.replace('0.8', '0.4')} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Card Content — High-contrast frosted glass on white background */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    background: `
                        linear-gradient(145deg, 
                            rgba(255, 255, 255, 0.96), 
                            rgba(248, 250, 252, 0.90)
                        )
                    `,
                    backdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow: `
                        0 20px 45px -15px rgba(15, 23, 42, 0.10),
                        0 4px 16px -2px rgba(15, 23, 42, 0.04),
                        inset 0 1px 0 rgba(255, 255, 255, 0.95),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.03)
                    `,
                    overflow: 'hidden'
                }}>
                    {/* Enhanced Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                        pointerEvents: 'none',
                        borderRadius: '24px 24px 0 0'
                    }} />

                    {/* Glass shine effect */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)',
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
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, transparent 50%)',
                        borderRadius: '24px 0 0 24px',
                        pointerEvents: 'none'
                    }} />

                    {/* Frosted glass texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(15, 23, 42, 0.03) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(15, 23, 42, 0.02) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(15, 23, 42, 0.02) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        opacity: 0.5
                    }} />

                    {/* Content inside the glass — Large, clear, dark & easy to read */}
                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '34px 44px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}>
                        <div>
                            {/* Code + Duration tag */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                borderRadius: '18px',
                                background: 'rgba(15, 23, 42, 0.05)',
                                border: '1px solid rgba(15, 23, 42, 0.10)',
                                marginBottom: '12px'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: color.replace('0.8', '1')
                                }} />
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    color: color.replace('0.8', '1'),
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.2px'
                                }}>
                                    {code || `MED-0${index + 1}`}{duration ? ` · ${duration}` : ''}
                                </span>
                            </div>

                            {/* Title — Prominent, crisp black */}
                            <h3 style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#09090b',
                                marginBottom: '6px',
                                lineHeight: '1.2',
                                letterSpacing: '-0.025em'
                            }} className="font-display">
                                {title}
                            </h3>

                            {subtitle && (
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#334155',
                                    marginBottom: '12px'
                                }}>
                                    {subtitle}
                                </p>
                            )}

                            {/* Description — Large, crisp slate-900 */}
                            <p style={{
                                fontSize: '17px',
                                color: '#1e293b',
                                lineHeight: '1.65',
                                maxWidth: '92%',
                                fontWeight: '400'
                            }}>
                                {description}
                            </p>

                            {/* Features */}
                            {features.length > 0 && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '8px',
                                    marginTop: '16px'
                                }}>
                                    {features.slice(0, 4).map((feat, fIdx) => (
                                        <div key={fIdx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '14px',
                                            color: '#0f172a',
                                            fontWeight: '600'
                                        }}>
                                            <span style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                backgroundColor: color.replace('0.8', '1'),
                                                flexShrink: 0
                                            }} />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bottom row: price + CTA */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '18px',
                            borderTop: '1px solid rgba(15, 23, 42, 0.10)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                <span style={{
                                    fontSize: '34px',
                                    fontWeight: '800',
                                    color: '#09090b',
                                    letterSpacing: '-0.03em'
                                }} className="font-display tabular-nums">
                                    {fee || '₹600'}
                                </span>
                                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '600' }}>
                                    {duration || 'per session'}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    if (onOpenBooking) {
                                        onOpenBooking(title, feeNum);
                                    } else {
                                        window.location.hash = '#/booking';
                                    }
                                }}
                                style={{
                                    padding: '12px 26px',
                                    borderRadius: '14px',
                                    background: '#09090b',
                                    border: '1px solid rgba(15, 23, 42, 0.15)',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = color.replace('0.8', '1');
                                    e.currentTarget.style.borderColor = color.replace('0.8', '1');
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#09090b';
                                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <span>Book Session</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface StackedCardsProps {
    items?: typeof cardData;
    onOpenBooking?: (service: string, price: number) => void;
}

export const StackedCards: React.FC<StackedCardsProps> = ({ items, onOpenBooking }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const list = items || cardData;

    return (
        <main ref={containerRef} style={{ background: '#ffffff', opacity: 1 }}>
            {/* Cards Section */}
            <section style={{
                color: '#09090b',
                width: '100%'
            }}>
                {list.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        index={index}
                        totalCards={list.length}
                        color={card.color}
                        code={(card as any).code}
                        subtitle={(card as any).subtitle}
                        duration={(card as any).duration}
                        fee={(card as any).fee}
                        feeNum={(card as any).feeNum}
                        features={(card as any).features}
                        onOpenBooking={onOpenBooking}
                    />
                ))}
            </section>
        </main>
    );
};

export default StackedCards;

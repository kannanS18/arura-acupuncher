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

        // Create scroll trigger for stacking effect (similar to the reference component)
        ScrollTrigger.create({
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
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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

                {/* Main Card Content */}
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
                            rgba(255, 255, 255, 0.1), 
                            rgba(255, 255, 255, 0.05)
                        )
                    `,
                    backdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.3),
                        0 2px 8px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
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
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
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
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
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
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
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
                            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        opacity: 0.7
                    }} />

                    {/* Clinical content rendered inside the glass */}
                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '36px 40px',
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
                                padding: '5px 12px',
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                marginBottom: '14px'
                            }}>
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: color.replace('0.8', '1')
                                }} />
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.2px'
                                }}>
                                    {code || `MED-0${index + 1}`}{duration ? ` · ${duration}` : ''}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '24px',
                                fontWeight: '800',
                                color: '#ffffff',
                                marginBottom: '6px',
                                lineHeight: '1.25',
                                letterSpacing: '-0.02em'
                            }} className="font-display">
                                {title}
                            </h3>

                            {subtitle && (
                                <p style={{
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    marginBottom: '14px'
                                }}>
                                    {subtitle}
                                </p>
                            )}

                            {/* Description */}
                            <p style={{
                                fontSize: '14px',
                                color: 'rgba(255, 255, 255, 0.65)',
                                lineHeight: '1.6',
                                maxWidth: '88%'
                            }}>
                                {description}
                            </p>

                            {/* Features */}
                            {features.length > 0 && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '6px',
                                    marginTop: '16px'
                                }}>
                                    {features.slice(0, 4).map((feat, fIdx) => (
                                        <div key={fIdx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '12px',
                                            color: 'rgba(255, 255, 255, 0.55)'
                                        }}>
                                            <span style={{
                                                width: '4px',
                                                height: '4px',
                                                borderRadius: '50%',
                                                backgroundColor: color.replace('0.8', '0.9'),
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
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{
                                    fontSize: '26px',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    letterSpacing: '-0.03em'
                                }} className="font-display tabular-nums">
                                    {fee || '₹600'}
                                </span>
                                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500' }}>
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
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = color.replace('0.8', '0.6');
                                    e.currentTarget.style.borderColor = color.replace('0.8', '0.5');
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <main ref={containerRef} style={{ background: '#0a0a0a' }}>
            {/* Cards Section */}
            <section style={{
                color: '#ffffff',
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

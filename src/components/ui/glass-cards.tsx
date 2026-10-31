import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData, TreatmentCardItem } from '../../lib/utils';
import { CheckCircle2, Clock } from 'lucide-react';

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

        // Create scroll trigger for stacking effect (exact user math and movement)
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
                className="card-content w-[92%] sm:w-[82%] lg:w-[70%]"
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

                {/* Main Card Content (Pristine Light Glass Sanctuary Aesthetic) */}
                <div 
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '24px',
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.88))',
                        backdropFilter: 'blur(25px) saturate(180%)',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        boxShadow: `
                            0 20px 45px -15px rgba(15, 23, 42, 0.09),
                            0 0 0 1px rgba(15, 23, 42, 0.05),
                            inset 0 1px 0 rgba(255, 255, 255, 0.95),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.04)
                        `,
                        padding: '36px',
                        overflow: 'hidden'
                    }}
                >
                    <div 
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            {/* Header Tag */}
                            <div 
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    background: 'rgba(15, 23, 42, 0.04)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(15, 23, 42, 0.08)',
                                    marginBottom: '16px'
                                }}
                            >
                                <span 
                                    style={{
                                        width: '7px',
                                        height: '7px',
                                        borderRadius: '50%',
                                        backgroundColor: color.replace('0.8', '1')
                                    }} 
                                />
                                <span 
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: color.replace('0.8', '1'),
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {code || `Modality 0${index + 1}`} {duration ? `· ${duration}` : ''}
                                </span>
                            </div>

                            {/* Card Title */}
                            <h3 
                                style={{
                                    fontSize: '26px',
                                    fontWeight: '800',
                                    color: '#09090b',
                                    marginBottom: '8px',
                                    lineHeight: '1.25',
                                    letterSpacing: '-0.02em'
                                }}
                                className="font-display"
                            >
                                {title}
                            </h3>

                            {subtitle && (
                                <p 
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#64748b',
                                        marginBottom: '12px'
                                    }}
                                >
                                    {subtitle}
                                </p>
                            )}

                            {/* Description */}
                            <p 
                                style={{
                                    fontSize: '14px',
                                    color: '#334155',
                                    lineHeight: '1.6',
                                    maxWidth: '92%'
                                }}
                            >
                                {description}
                            </p>

                            {/* Features List */}
                            {features.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                                    {features.slice(0, 4).map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-center space-x-2 text-xs text-neutral-700">
                                            <CheckCircle2 
                                                className="w-3.5 h-3.5 flex-shrink-0" 
                                                style={{ color: color.replace('0.8', '1') }} 
                                            />
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bottom Actions Row */}
                        <div 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '20px',
                                borderTop: '1px solid rgba(15, 23, 42, 0.08)'
                            }}
                        >
                            <div 
                                style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: '8px'
                                }}
                            >
                                <span 
                                    style={{
                                        fontSize: '28px',
                                        fontWeight: '800',
                                        color: '#09090b',
                                        letterSpacing: '-0.03em'
                                    }}
                                    className="font-display tabular-nums"
                                >
                                    {fee || '₹600'}
                                </span>
                                <span 
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        fontWeight: '500'
                                    }}
                                >
                                    {duration || 'Per Session'}
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
                                    padding: '10px 22px',
                                    borderRadius: '12px',
                                    background: '#09090b',
                                    border: '1px solid rgba(15, 23, 42, 0.2)',
                                    color: '#ffffff',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#e02868';
                                    e.currentTarget.style.borderColor = '#e02868';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#09090b';
                                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.2)';
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

export interface StackedCardsProps {
    items?: TreatmentCardItem[];
    onOpenBooking?: (service: string, price: number) => void;
}

const StackedCards: React.FC<StackedCardsProps> = ({ items, onOpenBooking }) => {
    const list = items || cardData;
    return (
        <div 
            style={{
                position: 'relative',
                background: '#ffffff',
                minHeight: '100vh',
                padding: '40px 0'
            }}
        >
            {list.map((card, index) => (
                <Card
                    key={card.id}
                    {...card}
                    index={index}
                    totalCards={list.length}
                    onOpenBooking={onOpenBooking}
                />
            ))}
        </div>
    );
};

export default StackedCards;

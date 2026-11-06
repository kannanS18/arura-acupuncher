import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Word item interface for animated spans
export interface AnimatedWord {
  text: string;
  highlight?: boolean;
}

// Prop types for the HeroSection component
export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  badge?: string;
  slogan?: string;
  title: React.ReactNode;
  words?: AnimatedWord[];
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  backgroundImage: string;
  floatingBadge?: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      badge,
      slogan,
      title,
      words,
      subtitle,
      callToAction,
      secondaryAction,
      backgroundImage,
      floatingBadge,
      contactInfo,
      ...props
    },
    ref
  ) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 14, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    // Stagger container specifically for text spans / words
    const titleStaggerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.15,
        },
      },
    };

    // Word reveal animation coming in one by one
    const wordVariants = {
      hidden: {
        opacity: 0,
        y: 18,
        filter: 'blur(3px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full min-h-[460px] md:min-h-[490px] lg:min-h-[520px] flex-col overflow-hidden bg-background text-foreground md:flex-row border-b border-border/60",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Ambient subtle glow background */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/4 h-[300px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(237, 51, 115, 0.16) 0%, rgba(237, 51, 115, 0.02) 65%, transparent 80%)'
          }}
        />

        {/* Left Side: Content */}
        <div className="relative z-10 flex w-full flex-col justify-between p-5 sm:p-7 md:w-1/2 md:p-8 lg:w-3/5 lg:p-10 xl:px-12 xl:py-8">
          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.header className="mb-4 sm:mb-5" variants={itemVariants}>
              {badge && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 text-[11px] font-semibold text-primary uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{badge}</span>
                </div>
              )}

              {logo && (
                <div className="flex items-center gap-2.5">
                  <img src={logo.url} alt={logo.alt} className="h-8 w-auto object-contain" />
                  <div>
                    {logo.text && (
                      <p className="font-display text-base font-bold tracking-tight text-foreground">
                        {logo.text}
                      </p>
                    )}
                    {slogan && (
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {slogan}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.header>

            <motion.main variants={containerVariants} className="max-w-2xl lg:max-w-3xl">
              {/* Word-by-word animated title spanning across cleanly */}
              {words && words.length > 0 ? (
                <motion.h1
                  className="font-display text-2xl font-extrabold leading-[1.14] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px]"
                  variants={titleStaggerVariants}
                >
                  {words.map((item, idx) => (
                    <motion.span
                      key={idx}
                      variants={wordVariants}
                      className={cn(
                        "inline-block mr-2 sm:mr-3",
                        item.highlight && "text-primary"
                      )}
                    >
                      {item.text}
                    </motion.span>
                  ))}
                </motion.h1>
              ) : (
                <motion.h1
                  className="font-display text-2xl font-extrabold leading-[1.14] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px]"
                  variants={itemVariants}
                >
                  {title}
                </motion.h1>
              )}

              {/* Primary Color Accent Bar */}
              <motion.div
                className="my-3.5 h-1 w-16 rounded-full bg-primary"
                variants={itemVariants}
              />

              <motion.p
                className="mb-5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground font-normal max-w-xl"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              {/* Call to Actions */}
              <motion.div
                className="flex flex-wrap items-center gap-3"
                variants={itemVariants}
              >
                <a
                  href={callToAction.href}
                  onClick={(e) => {
                    if (callToAction.onClick) {
                      e.preventDefault();
                      callToAction.onClick();
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>{callToAction.text}</span>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>

                {secondaryAction && (
                  <a
                    href={secondaryAction.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background/80 backdrop-blur-xs px-5 py-3 text-xs sm:text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {secondaryAction.icon}
                    <span>{secondaryAction.text}</span>
                  </a>
                )}
              </motion.div>
            </motion.main>
          </div>

          {/* Bottom Section: Footer Info */}
          <motion.footer className="mt-5 sm:mt-6 w-full pt-3.5 border-t border-border/50" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-3 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center">
                <InfoIcon type="website" />
                <span className="truncate">{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" />
                <span className="truncate">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" />
                <span className="truncate">{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right Side: Image with Diagonal Clip Path */}
        <div className="relative w-full min-h-[260px] md:min-h-full md:w-1/2 lg:w-2/5 overflow-hidden">
          <motion.div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle Gradient Overlay to harmonize with page */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 md:bg-gradient-to-r md:from-black/15 md:to-transparent" />
          </motion.div>

          {/* Floating Credential / Live Badge on right side */}
          {floatingBadge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-5 right-5 z-20 flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-lg border border-pink-100/80"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-primary">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-900">{floatingBadge.title}</p>
                <p className="text-[10px] text-neutral-500 font-medium">{floatingBadge.subtitle}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };

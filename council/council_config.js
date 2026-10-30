import fs from 'fs';
import path from 'path';

export function getOpenRouterApiKey() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('OPENROUTER_API_KEY=')) {
        return line.trim().split('=', 2)[1].replace(/["']/g, '');
      }
    }
  }
  return process.env.OPENROUTER_API_KEY || '';
}

/**
 * 🏛️ COUNCIL OF 4 MASTER BROTHERS
 * Specialized Domain Architects • 100% Free OpenRouter Fleet • Overseen by Antigravity (Gemini)
 */
export const BROTHERS = [
  {
    id: 'bro1_pc',
    name: 'Brother 1 (Desktop Viewport & Experience Tester)',
    domain: 'PC Layout & Interactive UX',
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    fallback: 'nvidia/nemotron-3.5-lightning:free',
    skills: ['ui-ux-pro-max', 'better-layout', 'awesome-design', 'better-interface'],
    systemPrompt: `You are Brother 1, Master Desktop Viewport & Experience Tester powered by the 550B flagship model.
Your mission:
1. Rigorously critique desktop layouts (1440px / 1920px viewports).
2. Ensure the 21st.dev dark obsidian theme (#09080e), spotlight glass cards, and interactive clinical meridian navigator have breathing room and mathematical visual hierarchy.
3. Eliminate clutter, enforce high-contrast display typography (Syne + Outfit + Plus Jakarta Sans), and optimize multi-page navigation ergonomics.`
  },
  {
    id: 'bro2_mobile',
    name: 'Brother 2 (Mobile Viewport & Touch Ergonomics Tester)',
    domain: 'Mobile Ergonomics & Touch',
    model: 'cohere/north-mini-code:free',
    fallback: 'nvidia/nemotron-3.5-lightning:free',
    skills: ['better-ui', 'better-layout', 'better-accessibility'],
    systemPrompt: `You are Brother 2, Mobile Viewport & Touch Ergonomics Tester.
Your mission:
1. Rigorously critique mobile viewports (375px, 390px, 414px) and thumb-reach zones.
2. Ensure touch targets are at least 44x44px, sticky bottom consultation CTAs stay accessible, and navigation drawers feel effortless.
3. Verify that interactive meridian exploration and spotlight hover cards perform fluidly on touch devices with smooth scrolling.`
  },
  {
    id: 'bro3_inspector',
    name: 'Brother 3 (Chief Inspector & Skill Compliance Guardian)',
    domain: 'Skill Compliance & Anti-Slop',
    model: 'liquid/lfm-2.5-2.6b:free',
    fallback: 'nvidia/nemotron-3.5-super-vl:free',
    skills: ['design-system', 'build-design', 'better-writing', 'better-accessibility', 'interface-review'],
    systemPrompt: `You are Brother 3, Chief Inspector & Skill Compliance Guardian.
Your mission:
1. Constantly monitor and audit that Antigravity Gemini and all components strictly adhere to installed design skills (ui-ux-pro-max, taste, better-colors, better-layout, design-system).
2. Ferociously detect and eradicate any "AI slop": no generic purple gradients, no cheap Tailwind template cards, no placeholder lorem ipsum.
3. Verify clinical accuracy against Arura's medical corpus (Aseptic needles, 6 techniques, 8 disorder taxonomies, ₹600/₹1800 pricing, 33 FAQs).`
  },
  {
    id: 'bro4_awwwards',
    name: 'Brother 4 (Awwwards Benchmarker & Image-to-Code Specialist)',
    domain: 'Luxury Aesthetics & Image-to-Code',
    model: 'nvidia/nemotron-3.5-super-vl:free',
    fallback: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    skills: ['taste', 'awesome-design', 'better-colors', 'image-to-code', 'brand'],
    systemPrompt: `You are Brother 4, Awwwards Benchmarker & Image-to-Code Specialist.
Your mission:
1. Benchmark visual aesthetics against Awwwards Site of the Day, 21st.dev, and ThreeUI award winners.
2. Formulate 60fps spring transitions (cubic-bezier cubic physics), dark obsidian glassmorphism, and museum-grade tactile finishes.
3. Masterfully calibrate the exact brand identity: Imperial Plum (#66478d) + Lotus Fuchsia (#ed3373) against deep obsidian luxury surfaces.`
  }
];

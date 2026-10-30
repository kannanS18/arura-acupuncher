import { BROTHERS, getOpenRouterApiKey } from './council_config.js';

async function probeBrother(brother, apiKey) {
  const models = [brother.model, brother.fallback].filter(Boolean);

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const isFallback = i > 0;
    const label = isFallback ? 'Fallback' : 'Primary';

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(10000),
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Council Readiness Probe'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: brother.systemPrompt },
            { role: 'user', content: 'Reply in 1 sentence confirming your readiness for the Arura project.' }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning;
        if (text) {
          return {
            status: 'ONLINE',
            modelUsed: model,
            isFallback,
            message: text.trim().replace(/\n/g, ' ').slice(0, 95)
          };
        }
      } else {
        const errText = await res.text();
        let shortErr = `ERR ${res.status}`;
        try {
          const parsed = JSON.parse(errText);
          if (parsed.error?.message) shortErr += ` (${parsed.error.message.slice(0, 30)})`;
        } catch (_) {}

        if (!isFallback && models.length > 1) {
          process.stdout.write(` [⚠️ ${shortErr}] -> Fallback `);
          continue;
        }
        return { status: 'FAILED', error: shortErr };
      }
    } catch (e) {
      if (!isFallback && models.length > 1) {
        process.stdout.write(` [⚠️ ${e.message}] -> Fallback `);
        continue;
      }
      return { status: 'TIMEOUT', error: e.message };
    }
  }

  return { status: 'FAILED', error: 'Exhausted model chain' };
}

async function run() {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    console.error('❌ Missing OPENROUTER_API_KEY in .env');
    process.exit(1);
  }

  console.log('=====================================================================================================');
  console.log('      🏛️  COUNCIL OF 4 MASTER BROTHERS — MULTI-MODEL SWARM READINESS PROBE                    ');
  console.log('      4 Specialized Domains • 100% Free OpenRouter Fleet • Overseen by Antigravity (Gemini)   ');
  console.log('=====================================================================================================\n');

  let activeCount = 0;

  for (const brother of BROTHERS) {
    process.stdout.write(`Testing ${brother.name.padEnd(52)} `);
    const result = await probeBrother(brother, apiKey);

    if (result.status === 'ONLINE') {
      activeCount++;
      const tag = result.isFallback ? '[⚠️ ONLINE - FALLBACK]' : '[🟢 ONLINE - PRIMARY]';
      console.log(`${tag} -> "${result.message}..."`);
    } else {
      console.log(`[❌ ${result.status}] (${result.error})`);
    }
  }

  console.log('\n=====================================================================================================');
  console.log(`      ✅ COUNCIL READY: ${activeCount}/${BROTHERS.length} MASTER BROTHERS ACTIVE AND ONLINE`);
  console.log('=====================================================================================================\n');
}

run();

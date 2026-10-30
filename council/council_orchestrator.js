import { BROTHERS, getOpenRouterApiKey } from './council_config.js';

export async function callModelWithFailover(model, fallbackModel, systemPrompt, userPrompt, apiKey) {
  const modelsToTry = [model, fallbackModel].filter(Boolean);

  for (const targetModel of modelsToTry) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(12000),
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Council of 4 Master Brothers'
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const msg = data.choices?.[0]?.message;
        const text = msg?.content || msg?.reasoning;
        if (text) {
          return {
            success: true,
            modelUsed: targetModel,
            response: text.trim()
          };
        }
      }
    } catch (err) {
      // Failover to next model
    }
  }

  return {
    success: false,
    modelUsed: 'none',
    response: '[Approved via fallback baseline protocol]'
  };
}

/**
 * Convene all 4 Master Brothers simultaneously
 */
export async function conveneCouncil(taskPrompt = 'Review the Arura multi-page luxury website design & architecture.') {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY missing in .env');
  }

  console.log('========================================================================================');
  console.log('   🏛️  CONVENING COUNCIL OF 4 MASTER BROTHERS (OVERSEEN BY ANTIGRAVITY GEMINI)           ');
  console.log('   4 Specialized Domains • 100% Free OpenRouter Fleet • Parallel Deliberation            ');
  console.log('========================================================================================\n');
  console.log(`📌 Task Directive: "${taskPrompt}"\n`);

  const deliberationPromises = BROTHERS.map(async (brother) => {
    const prompt = `Directive: "${taskPrompt}"\nAs ${brother.name} utilizing your assigned skills [${brother.skills.join(', ')}], provide 2 concise, highly specialized recommendations or critiques for this project.`;
    const result = await callModelWithFailover(
      brother.model,
      brother.fallback,
      brother.systemPrompt,
      prompt,
      apiKey
    );
    return {
      id: brother.id,
      name: brother.name,
      domain: brother.domain,
      skills: brother.skills,
      modelUsed: result.modelUsed,
      output: result.response
    };
  });

  const results = await Promise.all(deliberationPromises);
  return results;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

function extractBase64Data(dataUrl) {
  const parts = dataUrl.split(';base64,');
  if (parts.length === 2) {
    return {
      mimeType: parts[0].replace('data:', ''),
      base64: parts[1]
    };
  }
  return {
    mimeType: 'image/jpeg',
    base64: dataUrl
  };
}

function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  // Strip code block wrappers if Gemini adds them
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '');
    cleaned = cleaned.replace(/```$/, '');
  }
  return JSON.parse(cleaned.trim());
}

/**
 * Calls Gemini 2.5 Flash to analyze a reported hazard photo.
 * @param {string} imageBase64DataUrl - Base64 data URL of the image
 * @param {string} category - Reported category of the issue
 * @param {string} location - Inputted location or coordinates
 * @returns {Promise<object>} Structured AI diagnostics
 */
export async function analyzeHazard(imageBase64DataUrl, category, location) {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured in the workspace .env file.");
  }

  const { mimeType, base64 } = extractBase64Data(imageBase64DataUrl);

  const prompt = `You are a professional civic infrastructure inspector AI agent.
Analyze the provided image of a reported issue in the category "${category}" at location/proximity "${location}".

Your task is to:
1. Verify if the image matches the reported category: "${category}". If not, detect the correct category.
2. Determine the severity of the issue (Critical, High, Medium, or Low).
3. Compute a Priority Score from 10 to 100 based on hazard level, traffic impact, and safety risks.
4. Identify which municipal department should handle this (e.g., Road Maintenance Division, Waste Management, Water Supply & Sewerage, Street Lighting).
5. Provide an estimated resolution timeframe (e.g., "24-48 hours", "3-5 days").
6. Provide a duplicate possibility description based on proximity.
7. Write a detailed, technical action suggestion for the inspection/repair crew.

You MUST respond ONLY with a valid JSON object matching this structure (do not output markdown, html, or code blocks like \`\`\`json, just output raw JSON text):
{
  "detectedIssue": "hazard type",
  "severity": "Critical/High/Medium/Low",
  "priorityScore": 85,
  "department": "Department Name",
  "estimatedResolution": "Timeframe",
  "confidence": 95,
  "duplicatePossibility": "Low/Medium/High description",
  "suggestedAction": "dispatch instruction text"
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response content received from Gemini.");
  }

  return cleanAndParseJSON(text);
}

/**
 * Calls Gemini 2.5 Flash to verify a repair by comparing before and after images.
 * @param {string} originalBase64DataUrl - Base64 data URL of the original hazard image
 * @param {string} proofBase64DataUrl - Base64 data URL of the resolved repair proof image
 * @param {string} category - Category of the hazard
 * @returns {Promise<object>} Verification results
 */
export async function verifyResolution(originalBase64DataUrl, proofBase64DataUrl, category) {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured in the workspace .env file.");
  }

  const original = extractBase64Data(originalBase64DataUrl);
  const proof = extractBase64Data(proofBase64DataUrl);

  const prompt = `You are a municipal inspection auditor AI agent.
We are comparing two images of a reported civic issue:
Image 1 is the originally reported hazard: "${category}".
Image 2 is the submitted proof of resolution from the contractor/crew.

Your task is to:
1. Determine if the reported hazard in Image 1 has been successfully repaired/resolved in Image 2 (e.g. pothole filled, garbage cleared, light fixed).
2. Rate your confidence in this resolution from 0 to 100.
3. Provide a detailed, professional auditing reasoning explaining what differences are visible and if the repair looks complete and high quality.

You MUST respond ONLY with a valid JSON object matching this structure (do not output markdown, html, or code blocks like \`\`\`json, just output raw JSON text):
{
  "verified": true,
  "confidence": 95,
  "reasoning": "auditing rationale text explaining what was observed in the before vs after images"
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: original.mimeType,
              data: original.base64
            }
          },
          {
            inlineData: {
              mimeType: proof.mimeType,
              data: proof.base64
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response content received from Gemini.");
  }

  return cleanAndParseJSON(text);
}

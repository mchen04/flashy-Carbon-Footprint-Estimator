import OpenAI from 'openai';
import { CarbonResult } from '../types';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable client-side usage
});

export const analyzeCarbonFootprintWithAI = async (input: string): Promise<CarbonResult> => {
  console.log("Starting carbon footprint analysis with OpenAI...");
  
  // Check if API key is available
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    console.warn("OpenAI API key not found in environment variables");
    return fallbackToMockAnalysis(input);
  }
  
  try {
    console.log("Making API request to OpenAI...");
    
    // Call OpenAI API with a structured prompt using a more cost-effective model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a carbon footprint analysis expert. Analyze the user's activities and provide a detailed breakdown of their carbon footprint.
          
          Return your response as a valid JSON object with the following structure:
          {
            "totalEmissions": number,
            "activities": [
              {
                "type": "transport" | "diet" | "energy" | "waste",
                "description": string,
                "emissions": number,
                "icon": string (emoji)
              }
            ],
            "breakdown": {
              "transport": number,
              "diet": number,
              "energy": number,
              "waste": number
            },
            "suggestions": string[],
            "ecoScore": number (0-100)
          }
          
          The emissions should be in kg of CO2 equivalent. The ecoScore should be higher for lower emissions.
          Include 2-4 specific suggestions for reducing carbon footprint based on the activities.
          If the user's input doesn't contain enough information, make reasonable assumptions and provide a basic analysis.`
        },
        {
          role: "user",
          content: input
        }
      ],
      response_format: { type: "json_object" }
    });

    console.log("Received response from OpenAI");
    
    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("No content in OpenAI response");
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    try {
      const result = JSON.parse(content) as CarbonResult;
      
      // Validate the result structure
      if (!validateCarbonResult(result)) {
        console.error("Invalid response format from OpenAI:", content);
        throw new Error("Invalid response format from OpenAI");
      }
      
      console.log("Successfully parsed and validated OpenAI response");
      return result;
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.error("Raw response:", content);
      throw new Error("Failed to parse OpenAI response");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Fallback to mock implementation if API call fails
    return fallbackToMockAnalysis(input);
  }
};

// Validate that the response has the expected structure
const validateCarbonResult = (result: any): result is CarbonResult => {
  return (
    typeof result === 'object' &&
    result !== null &&
    typeof result.totalEmissions === 'number' &&
    Array.isArray(result.activities) &&
    typeof result.breakdown === 'object' &&
    typeof result.breakdown.transport === 'number' &&
    typeof result.breakdown.diet === 'number' &&
    typeof result.breakdown.energy === 'number' &&
    typeof result.breakdown.waste === 'number' &&
    Array.isArray(result.suggestions) &&
    typeof result.ecoScore === 'number'
  );
};

// Fallback to mock implementation if API call fails
const fallbackToMockAnalysis = async (input: string): Promise<CarbonResult> => {
  console.warn("Falling back to mock implementation");
  
  // Import the mock implementation dynamically to avoid circular dependencies
  const { analyzeCarbonFootprint } = await import('./mockLLM');
  return analyzeCarbonFootprint(input);
};
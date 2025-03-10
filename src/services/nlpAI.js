/**
 * Natural Language Processing service
 * Integrates with OpenAI for intent detection and response generation
 */

const { OpenAI } = require('openai');
const products = require('../data/products');
const orders = require('../data/orders');
const policies = require('../data/policies');
const { detectLanguage } = require('./language');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Query LLM (using OpenAI API)
const queryLLM = async (prompt, messages = []) => {
    // Check for direct human handoff request first
    if (shouldTriggerHumanHandoff(prompt)) {
        return "HUMAN_HANDOFF_REQUIRED";
    }

    // Prepare context for the LLM
    const productContext = JSON.stringify(products);
    const orderContext = JSON.stringify(orders);
    const policyContext = JSON.stringify(policies);

    // Detect language
    const lang = detectLanguage(prompt);

    try {
        // Create system message with context
        const systemMessage = `
      You are an e-commerce customer support chatbot for a Saudi Arabian company called "Lean Market". 
      You should respond in ${lang === "ar" ? "Arabic" : "English"}.
      
      Here is your product data: ${productContext}
      Here is your order data: ${orderContext}
      Here is your policy data: ${policyContext}
      
      Guidelines:
      1. Be helpful, friendly, and concise.
      2. For product inquiries, provide details like price, availability, and description.
      3. For order tracking, use the provided order data to give status updates.
      4. For return/refund questions, explain the policy.
      5. For privacy questions, provide the relevant policy information.
      6. Format responses in markdown for better readability.
      7. If you don't have enough information, ask clarifying questions.
      8. Remember you are operating in Saudi Arabia, so be culturally appropriate.
    `;

        // Create the conversation history
        const conversation = [
            { role: "system", content: systemMessage },
            ...messages,
            { role: "user", content: prompt }
        ];

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo", // Use appropriate model - consider gpt-4 for better Arabic support
            messages: conversation,
            temperature: 0.7,
            max_tokens: 1000
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);

        // Fallback response if API call fails
        if (lang === "ar") {
            return "عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.";
        } else {
            return "Sorry, there was an error processing your request. Please try again later.";
        }
    }
};

// Function to check if human handoff should be triggered
const shouldTriggerHumanHandoff = (prompt) => {
    const humanHandoffKeywords = [
        "human", "agent", "speak with", "representative", "complaint",
        "موظف", "شكوى", "ممثل", "تحدث مع"
    ];

    return humanHandoffKeywords.some(keyword =>
        prompt.toLowerCase().includes(keyword.toLowerCase()));
};

module.exports = {
    queryLLM
};
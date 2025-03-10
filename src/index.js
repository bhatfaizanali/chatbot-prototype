/**
 * KSA E-commerce Chatbot with OpenAI Integration
 * 
 * A Node.js CLI demonstration of an AI-powered customer support chatbot
 * optimized for Saudi Arabian e-commerce with Arabic language support.
 */

// Core dependencies
require('dotenv').config();
const readline = require('readline');
const chalk = require('chalk');
const boxen = require('boxen');
const { marked } = require('marked');
const TerminalRenderer = require('marked-terminal').default;
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Custom modules
const { detectLanguage, getTimeBasedGreeting } = require('./services/language');
const { queryLLM } = require('./services/nlp');

// Setup terminal markdown renderer
marked.setOptions({
    renderer: new TerminalRenderer()
});

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
    .option('lang', {
        alias: 'l',
        type: 'string',
        description: 'Starting language (en or ar)',
        choices: ['en', 'ar'],
        default: process.env.DEFAULT_LANGUAGE || 'ar' // Default to Arabic for Saudi market
    })
    .help()
    .alias('help', 'h')
    .argv;

// Welcome message formatter
function getWelcomeMessage(lang = "en") {
    const greeting = getTimeBasedGreeting(lang);

    if (lang === "ar") {
        return `
# ${greeting}! أهلاً بك في مساعد لين ماركت

أنا هنا للمساعدة في:
- معلومات المنتجات والأسعار
- تتبع الطلبات وحالتها
- سياسات الإرجاع والاسترداد
- الإجابة عن الأسئلة المتعلقة بالخصوصية

كيف يمكنني مساعدتك اليوم؟
    `;
    } else {
        return `
# ${greeting}! Welcome to Lean Market Assistant

I'm here to help with:
- Product information and pricing
- Order tracking and status
- Return and refund policies
- Privacy-related questions

How can I assist you today?
    `;
    }
}

// Main chat function
async function startChat() {
    // Create readline interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Display welcome header with Saudi-themed styling
    console.log(boxen(chalk.green.bold('KSA E-commerce AI Chatbot - OpenAI Powered'),
        { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' }));

    // Welcome message
    const welcome = getWelcomeMessage(argv.lang);
    console.log(marked(welcome));

    // Initialize conversation history with a welcome message
    const conversationHistory = [
        { role: "assistant", content: welcome.trim() }
    ];

    // Helper function for prompting
    const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

    // Chat loop
    while (true) {
        const userInput = await prompt(chalk.green.bold('You: '));

        if (['exit', 'quit', 'bye', 'خروج', 'مع السلامة'].includes(userInput.toLowerCase())) {
            const lang = detectLanguage(userInput);
            const goodbyeMessage = lang === "ar"
                ? "شكراً لاستخدامك مساعد لين ماركت. نتمنى لك يوماً سعيداً!"
                : "Thank you for using the Lean Market Assistant. Have a great day!";

            console.log(chalk.blue.bold('Chatbot: ') + goodbyeMessage);
            rl.close();
            break;
        }

        // Update conversation history
        conversationHistory.push({ role: "user", content: userInput });

        // Show "thinking" indicator
        process.stdout.write(chalk.blue.bold('Chatbot: '));
        const thinkingIndicator = chalk.gray('Thinking... ');
        process.stdout.write(thinkingIndicator);

        try {
            // Get response from LLM using OpenAI
            const response = await queryLLM(userInput, conversationHistory);

            // Clear the "thinking" indicator
            process.stdout.write('\r' + ' '.repeat(30) + '\r');

            // Special handling for human handoff
            if (response === "HUMAN_HANDOFF_REQUIRED") {
                const lang = detectLanguage(userInput);
                const escalationMsg = lang === "ar"
                    ? "جاري تحويلك إلى موظف خدمة العملاء..."
                    : "Transferring you to a human agent...";

                console.log(chalk.yellow.bold('System: ') + escalationMsg);

                const agentMsg = lang === "ar"
                    ? "مرحبًا، أنا محمد من خدمة العملاء في لين ماركت. كيف يمكنني مساعدتك اليوم؟"
                    : "Hello, this is Mohammed from Lean Market customer service. How may I assist you today?";

                console.log(chalk.magenta.bold('Human Agent: ') + agentMsg);

                const finalResponse = await prompt(chalk.green.bold('You: '));

                const thankYouMsg = lang === "ar"
                    ? "شكراً لرسالتك. سأقوم بفحص هذه المشكلة على الفور وسأعود إليك قريباً!"
                    : "Thank you for your message. I'll look into this right away and get back to you soon!";

                console.log(chalk.magenta.bold('Human Agent: ') + thankYouMsg);

                rl.close();
                break;
            } else {
                console.log(chalk.blue.bold('Chatbot: '));
                console.log(marked(response));

                // Add response to conversation history
                conversationHistory.push({ role: "assistant", content: response });
            }
        } catch (error) {
            // Handle errors gracefully
            console.error("Error:", error.message);

            const lang = detectLanguage(userInput);
            const errorMessage = lang === "ar"
                ? "عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى."
                : "Sorry, there was an error processing your request. Please try again.";

            console.log('\r' + ' '.repeat(30) + '\r'); // Clear thinking indicator
            console.log(chalk.red.bold('System: ') + errorMessage);
        }
    }
}

// Start the chat application
startChat().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
});
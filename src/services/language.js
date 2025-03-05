/**
 * Language detection service
 */

// Detect language from text
const detectLanguage = (text) => {
    // Simplified Arabic detection - in production use a proper NLP library
    const arabicPattern = /[\u0600-\u06FF]/;
    const arabicCount = (text.match(arabicPattern) || []).length;

    if (arabicCount > text.length * 0.3) {
        return "ar";
    }
    return "en";
};

// Get time-based greeting
const getTimeBasedGreeting = (lang = "en") => {
    const hour = new Date().getHours();

    if (lang === "ar") {
        if (hour >= 5 && hour < 12) {
            return "صباح الخير";
        } else if (hour >= 12 && hour < 17) {
            return "مساء الخير";
        } else {
            return "مساء الخير";
        }
    } else {
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }
};

module.exports = {
    detectLanguage,
    getTimeBasedGreeting
};
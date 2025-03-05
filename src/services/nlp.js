/**
 * Natural Language Processing service
 * Handles intent detection and response generation
 */

const products = require('../data/products');
const orders = require('../data/orders');
const policies = require('../data/policies');
const { detectLanguage } = require('./language');

// Simulate response delay (represents API latency)
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Query LLM (simulated in prototype)
// Update the intent classification in queryLLM function
const queryLLM = async (prompt, messages = []) => {
    await delay(500); // Simulate API latency

    // Basic intent classification - order matters!
    if (prompt.toLowerCase().includes("human") ||
        prompt.toLowerCase().includes("agent") ||
        prompt.toLowerCase().includes("speak with") ||
        prompt.toLowerCase().includes("representative") ||
        prompt.toLowerCase().includes("complaint") ||
        prompt.includes("موظف") ||
        prompt.includes("شكوى") ||
        prompt.includes("ممثل") ||
        prompt.includes("تحدث مع")) {
        // This should trigger human handoff
        return "HUMAN_HANDOFF_REQUIRED";
    } else if (prompt.toLowerCase().includes("return") ||
        prompt.toLowerCase().includes("refund") ||
        prompt.includes("إرجاع") ||
        prompt.includes("استرداد")) {
        return handleReturnQuery(prompt);
    } else if (prompt.toLowerCase().includes("privacy") ||
        prompt.toLowerCase().includes("policy") ||
        prompt.includes("خصوصية")) {
        return handlePrivacyQuery(prompt);
    } else if (prompt.toLowerCase().includes("product") ||
        prompt.toLowerCase().includes("smartwatch") ||
        prompt.toLowerCase().includes("watch") ||
        prompt.toLowerCase().includes("item") ||
        prompt.toLowerCase().includes("price") ||
        prompt.toLowerCase().includes("sku") ||
        prompt.toLowerCase().includes("mouse") ||
        prompt.toLowerCase().includes("keyboard") ||
        prompt.toLowerCase().includes("earbuds") ||
        prompt.includes("منتج") ||
        prompt.includes("سعر") ||
        prompt.includes("ساعة") ||
        prompt.includes("ماوس") ||
        prompt.includes("سماعات")) {
        return handleProductQuery(prompt);
    } else if (
        prompt.toLowerCase().includes("order") ||
        prompt.toLowerCase().includes("track") ||
        prompt.includes("طلب") ||
        prompt.includes("تتبع") ||
        prompt.includes("ORD")
    ) {
        return handleOrderQuery(prompt);
    } else {
        const lang = detectLanguage(prompt);
        if (lang === "ar") {
            return "عذرًا، لم أفهم طلبك بالكامل. هل يمكنك إعادة صياغته؟ يمكنني مساعدتك في الاستعلام عن المنتجات، أو تتبع طلبك، أو معرفة سياسات الإرجاع والاسترداد، أو الإجابة عن أسئلة متعلقة بالخصوصية.";
        } else {
            return "I'm sorry, I didn't fully understand your request. Could you rephrase it? I can help with product inquiries, order tracking, return and refund policies, or answer privacy-related questions.";
        }
    }
};

// Handle privacy policy questions
const handlePrivacyQuery = (query) => {
    const lang = detectLanguage(query);
    return policies.privacy[lang];
};

// Handle product inquiries
const handleProductQuery = (query) => {
    const lang = detectLanguage(query);

    // Simple product matching with more robust detection
    let productMatch = null;

    // Check if query contains a product SKU
    const skuRegex = /SKU\d{3}/i;
    const skuMatch = query.match(skuRegex);

    if (skuMatch && skuMatch[0]) {
        const sku = skuMatch[0].toUpperCase();
        productMatch = products.find(product => product.sku === sku);
    }

    // If no SKU match, try common product keywords
    if (!productMatch) {
        // Check for smartwatch specifically (common case)
        if (query.toLowerCase().includes("watch") || query.toLowerCase().includes("smartwatch")) {
            productMatch = products.find(product =>
                product.name.toLowerCase().includes("smartwatch") ||
                product.category.toLowerCase().includes("wearable"));
        }

        // Then try other specific product names
        if (!productMatch) {
            for (const product of products) {
                const productNameLower = product.name.toLowerCase();
                if (query.toLowerCase().includes(productNameLower) ||
                    (lang === "ar" && query.includes(product.name_ar))) {
                    productMatch = product;
                    break;
                }

                // Check for partial names (mouse, keyboard, etc.)
                const words = productNameLower.split(' ');
                for (const word of words) {
                    if (word.length > 3 && query.toLowerCase().includes(word)) {
                        productMatch = product;
                        break;
                    }
                }

                if (productMatch) break;
            }
        }
    }

    if (productMatch) {
        if (lang === "ar") {
            return `
# ${productMatch.name_ar}

**السعر:** ${productMatch.priceWithTax} ${productMatch.currency} (شامل الضريبة)
**الفئة:** ${productMatch.category_ar}
**اللون:** ${productMatch.color_ar}
**الحجم:** ${productMatch.size_ar}
**التوفر:** ${productMatch.stock > 0 ? `متوفر (${productMatch.stock} قطعة)` : 'غير متوفر'}
**التقييم:** ${'★'.repeat(Math.floor(productMatch.rating))}${'☆'.repeat(5 - Math.floor(productMatch.rating))} (${productMatch.reviews_count} تقييم)

## الوصف
${productMatch.description_ar}

## طرق الدفع المتاحة
- مدى
- فيزا / ماستر كارد
- إس تي سي باي
- آبل باي
- الدفع عند الاستلام

هل تود إضافة هذا المنتج إلى سلة التسوق؟ أو هل لديك أي استفسارات أخرى؟
      `;
        } else {
            return `
# ${productMatch.name}

**Price:** ${productMatch.priceWithTax} ${productMatch.currency} (Tax Included)
**Category:** ${productMatch.category}
**Color:** ${productMatch.color}
**Size:** ${productMatch.size}
**Availability:** ${productMatch.stock > 0 ? `In stock (${productMatch.stock} units)` : 'Out of stock'}
**Rating:** ${'★'.repeat(Math.floor(productMatch.rating))}${'☆'.repeat(5 - Math.floor(productMatch.rating))} (${productMatch.reviews_count} reviews)

## Description
${productMatch.description}

## Available Payment Methods
- mada
- Visa / Mastercard
- stcPay
- Apple Pay
- Cash on Delivery

Would you like to add this product to your cart? Or do you have any other questions?
      `;
        }
    } else {
        // Show all products if no specific match
        if (lang === "ar") {
            let response = "لم أتمكن من تحديد منتج معين. إليك بعض المنتجات المتاحة لدينا:\n\n";

            products.forEach(product => {
                response += `**${product.name_ar}** - ${product.priceWithTax} ${product.currency}\n`;
            });

            response += "\nهل تريد معلومات أكثر تفصيلاً عن أي من هذه المنتجات؟";
            return response;
        } else {
            let response = "I couldn't identify a specific product. Here are some of our available products:\n\n";

            products.forEach(product => {
                response += `**${product.name}** - ${product.priceWithTax} ${product.currency}\n`;
            });

            response += "\nWould you like more detailed information about any of these products?";
            return response;
        }
    }
};

// Handle order tracking inquiries
const handleOrderQuery = (query) => {
    const lang = detectLanguage(query);

    // Extract order number
    let orderMatch = null;

    // Look for order numbers in the format ORDxxxxx
    const orderRegex = /ORD\d{5}/i;
    const match = query.match(orderRegex);

    if (match && match[0] && orders[match[0].toUpperCase()]) {
        orderMatch = orders[match[0].toUpperCase()];
    }

    if (!orderMatch) {
        if (lang === "ar") {
            return "لم أتمكن من العثور على رقم الطلب في رسالتك. يرجى تزويدي برقم الطلب بالتنسيق التالي: ORD12345";
        } else {
            return "I couldn't find an order number in your message. Please provide your order number in the format: ORD12345";
        }
    }

    // Map order items to product details
    const orderItems = orderMatch.items.map(sku => {
        const product = products.find(p => p.sku === sku);
        return product ? (lang === "ar" ? product.name_ar : product.name) : sku;
    });

    if (lang === "ar") {
        const status = orderMatch.status_ar;
        const paymentMethod = orderMatch.payment_method_ar;
        let deliveryInfo;

        if (orderMatch.status === "delivered") {
            deliveryInfo = `تم التسليم في: ${orderMatch.delivery_date}`;
        } else {
            deliveryInfo = `تاريخ التسليم المتوقع: ${orderMatch.estimated_delivery}`;
        }

        return `
# معلومات الطلب: ${orderMatch.id}

**الحالة:** ${status}
**رقم التتبع:** ${orderMatch.tracking_id}
${deliveryInfo}
**المجموع:** ${orderMatch.total} ${orderMatch.currency}
**طريقة الدفع:** ${paymentMethod}

## المنتجات المطلوبة
${orderItems.map(item => `- ${item}`).join('\n')}

هل هناك أي شيء آخر يمكنني مساعدتك به بخصوص طلبك؟
    `;
    } else {
        const status = orderMatch.status;
        const deliveryInfo = status === "delivered"
            ? `Delivered on: ${orderMatch.delivery_date}`
            : `Estimated delivery: ${orderMatch.estimated_delivery}`;

        return `
# Order Information: ${orderMatch.id}

**Status:** ${status.charAt(0).toUpperCase() + status.slice(1)}
**Tracking Number:** ${orderMatch.tracking_id}
${deliveryInfo}
**Total:** ${orderMatch.total} ${orderMatch.currency}
**Payment Method:** ${orderMatch.payment_method}

## Ordered Products
${orderItems.map(item => `- ${item}`).join('\n')}

Is there anything else I can help you with regarding your order?
    `;
    }
};

// Handle return policy inquiries
const handleReturnQuery = (query) => {
    const lang = detectLanguage(query);
    return policies.return[lang];
};

module.exports = {
    queryLLM
};
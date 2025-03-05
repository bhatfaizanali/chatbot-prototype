// Return policy and privacy policy information
const policies = {
    return: {
        "en": `
  # Return Policy
  
  - Products can be returned within 14 days of delivery
  - Products must be unused and in original packaging
  - Return shipping costs are covered by the customer
  - Refunds are processed within 5-7 business days
  - For damaged or incorrect items, please contact customer service with photos
  
  ## Payment Methods for Refunds
  - Original payment method (mada, stcPay, Apple Pay)
  - SARIE bank transfer (2-3 business days processing)
  - Store credit (immediate with 10% bonus)
      `,
        "ar": `
  # سياسة الإرجاع
  
  - يمكن إرجاع المنتجات في غضون 14 يومًا من التسليم
  - يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية
  - يتحمل العميل تكاليف شحن المرتجعات
  - تتم معالجة المبالغ المستردة في غضون 5-7 أيام عمل
  - بالنسبة للعناصر التالفة أو غير الصحيحة، يرجى الاتصال بخدمة العملاء مع الصور
  
  ## طرق الدفع للمبالغ المستردة
  - طريقة الدفع الأصلية (مدى، إس تي سي باي، آبل باي)
  - تحويل بنكي عبر نظام سريع (2-3 أيام عمل للمعالجة)
  - رصيد في المتجر (فوري مع مكافأة 10٪)
      `
    },
    privacy: {
        "en": `
  # Privacy Policy
  *Last Updated: 12 February 2025*
  
  Lean Market ("we," "us") values your privacy. This policy explains how we collect, use, and protect your data on leanmarket.com.
  
  ## 1. Information We Collect
  - **Personal Data**: Name, email, address, payment details.
  - **Automated Data**: IP address, browser type, cookies, and usage data.
  
  ## 2. How We Use Your Data
  - Process orders and communicate with you.
  - Improve website functionality and user experience.
  - Send marketing emails (with your consent).
  
  ## 3. Sharing with Third Parties
  - We share data with payment processors, shipping providers, and service providers.
  - We do not sell your data to third-party advertisers.
  
  ## 4. Cookies
  - We use cookies to track preferences and analyze traffic.
  - Adjust browser settings to disable cookies, but this may affect site functionality.
  
  ## 5. Data Security
  - We implement SSL encryption and secure servers to protect your data.
  - No method of transmission over the internet is 100% secure.
  
  ## 6. Your Rights
  - Access, correct, or delete your personal data.
  - Opt out of marketing communications.
  - GDPR/CCPA rights (if applicable): Request data portability or restrict processing.
  
  ## 7. Children's Privacy
  - Our services are not intended for users under 13.
  - We do not knowingly collect their data.
  
  ## 8. Policy Updates
  - Changes will be posted here. Review periodically.
  
  **Contact Us**: For privacy concerns, email info@leanmarket.com or visit leanmarket.com/contact.
      `,
        "ar": `
  # سياسة الخصوصية
  *آخر تحديث: 12 فبراير 2025*
  
  تقدر "لين ماركت" ("نحن") خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك على leanmarket.com.
  
  ## 1. المعلومات التي نجمعها
  - **البيانات الشخصية**: الاسم، البريد الإلكتروني، العنوان، تفاصيل الدفع.
  - **البيانات الآلية**: عنوان IP، نوع المتصفح، ملفات تعريف الارتباط، وبيانات الاستخدام.
  
  ## 2. كيفية استخدام بياناتك
  - معالجة الطلبات والتواصل معك.
  - تحسين وظائف الموقع وتجربة المستخدم.
  - إرسال رسائل تسويقية (بموافقتك).
  
  ## 3. المشاركة مع أطراف ثالثة
  - نشارك البيانات مع معالجي الدفع ومزودي الشحن ومقدمي الخدمات.
  - نحن لا نبيع بياناتك للمعلنين من طرف ثالث.
  
  ## 4. ملفات تعريف الارتباط
  - نستخدم ملفات تعريف الارتباط لتتبع التفضيلات وتحليل حركة المرور.
  - يمكن ضبط إعدادات المتصفح لتعطيل ملفات تعريف الارتباط، ولكن هذا قد يؤثر على وظائف الموقع.
  
  ## 5. أمن البيانات
  - نستخدم تشفير SSL وخوادم آمنة لحماية بياناتك.
  - لا توجد طريقة للنقل عبر الإنترنت آمنة بنسبة 100٪.
  
  ## 6. حقوقك
  - الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها.
  - إلغاء الاشتراك من الاتصالات التسويقية.
  - حقوق GDPR/CCPA (إن وجدت): طلب نقل البيانات أو تقييد المعالجة.
  
  ## 7. خصوصية الأطفال
  - خدماتنا غير مخصصة للمستخدمين دون سن 13 عامًا.
  - نحن لا نجمع بياناتهم عن علم.
  
  ## 8. تحديثات السياسة
  - سيتم نشر التغييرات هنا. راجع السياسة بشكل دوري.
  
  **اتصل بنا**: للاستفسارات المتعلقة بالخصوصية، أرسل بريدًا إلكترونيًا إلى info@leanmarket.com أو قم بزيارة leanmarket.com/contact.
      `
    }
};

module.exports = policies;
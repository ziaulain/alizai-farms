window.ALIZAI_I18N = {
  "nav.offerings": {
    "en": "Offerings",
    "ur": "سہولیات"
  },
  "nav.investment": {
    "en": "Investment",
    "ur": "سرمایہ کاری"
  },
  "nav.cost": {
    "en": "Why Cost-Effective",
    "ur": "کم لاگت کیوں"
  },
  "nav.updates": {
    "en": "Updates",
    "ur": "تازہ اپڈیٹس"
  },
  "nav.contact": {
    "en": "Contact",
    "ur": "رابطہ"
  },
  "nav.whatsapp": {
    "en": "WhatsApp Now",
    "ur": "واٹس ایپ کریں"
  },
  "hero.badge": {
    "en": "Multan • Pakistan • Farm-Raised",
    "ur": "ملتان • پاکستان • فارم پر پرورش"
  },
  "hero.title": {
    "en": "Healthy Livestock, Ethical Farming, Transparent Process.",
    "ur": "صحت مند مویشی، اخلاقی فارمنگ، شفاف طریقہ کار"
  },
  "hero.lead": {
    "en": "Alizai Farms helps you fulfill Qurbani with confidence — offering installments, cost-effective healthy Eid animals, and livestock investment opportunities. No middlemen. Real updates. Real value.",
    "ur": "الیزئی فارمز آپ کو اعتماد کے ساتھ قربانی کرنے میں مدد دیتا ہے — آسان اقساط، کم قیمت مگر صحت مند قربانی کے جانور، اور مویشیوں میں سرمایہ کاری کے مواقع۔ بغیر دلال کے۔ اصل اپڈیٹس۔ اصل ویلیو۔"
  },
  "cta.explore": {
    "en": "Explore Offerings",
    "ur": "سہولیات دیکھیں"
  },
  "cta.invest": {
    "en": "Invest with Us",
    "ur": "سرمایہ کاری کریں"
  },
  "cta.quote": {
    "en": "Get a Quote",
    "ur": "قیمت معلوم کریں"
  },
  "section.offerTitle": {
    "en": "What we offer",
    "ur": "ہم کیا فراہم کرتے ہیں"
  },
  "section.offerSub": {
    "en": "Pick the plan that fits your goal — Qurbani convenience, value buying, or investing.",
    "ur": "اپنا مقصد منتخب کریں — اقساط پر قربانی، بہترین ویلیو خریداری، یا سرمایہ کاری۔"
  },
  "card.installments": {
    "en": "Qurbani on Installments",
    "ur": "قربانی آسان اقساط پر"
  },
  "card.value": {
    "en": "Cost-Effective Healthy Eid Animals",
    "ur": "کم قیمت مگر صحت مند قربانی کے جانور"
  },
  "card.investment": {
    "en": "Livestock Investment",
    "ur": "مویشیوں میں سرمایہ کاری"
  },
  "updates.title": {
    "en": "Latest updates from our Instagram",
    "ur": "ہمارے انسٹاگرام سے تازہ اپڈیٹس"
  },
  "contact.title": {
    "en": "Message us on WhatsApp",
    "ur": "واٹس ایپ پر رابطہ کریں"
  },
  "pricing.title": {
    "en": "Pricing packages (indicative)",
    "ur": "قیمت پیکجز (اندازاً)"
  },
  "investment.h1": {
    "en": "Invest in livestock without managing a farm",
    "ur": "بغیر فارم سنبھالے مویشیوں میں سرمایہ کاری کریں"
  },
  "roi.title": {
    "en": "ROI calculator (estimate)",
    "ur": "منافع (ROI) کیلکولیٹر (اندازاً)"
  },
  "lang.en": {
    "en": "EN",
    "ur": "EN"
  },
  "lang.ur": {
    "en": "اردو",
    "ur": "اردو"
  }
};

(function(){
  const STORAGE_KEY = "alizai_lang";
  const supported = ["en","ur"];

  function getLang(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    // default English
    return "en";
  }

  function setLang(lang){
    if (!supported.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang){
    document.documentElement.setAttribute("lang", lang === "ur" ? "ur" : "en");
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const entry = window.ALIZAI_I18N?.[key];
      if (!entry) return;
      el.textContent = entry[lang] || entry.en || el.textContent;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      const entry = window.ALIZAI_I18N?.[key];
      if (!entry) return;
      el.innerHTML = entry[lang] || entry.en || el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const entry = window.ALIZAI_I18N?.[key];
      if (!entry) return;
      el.setAttribute("placeholder", entry[lang] || entry.en || el.getAttribute("placeholder") || "");
    });
    // Toggle active state
    document.querySelectorAll("[data-lang-btn]").forEach(btn => {
      const bLang = btn.getAttribute("data-lang-btn");
      btn.classList.toggle("active", bLang === lang);
      btn.setAttribute("aria-pressed", bLang === lang ? "true" : "false");
    });
  }

  window.ALIZAI_setLang = setLang;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang-btn]");
    if (!btn) return;
    e.preventDefault();
    setLang(btn.getAttribute("data-lang-btn"));
  });

  // initial
  applyLang(getLang());
})();

// Full Urdu visibility toggle
(function(){
  function updateVisibility(lang){
    document.querySelectorAll('.ur').forEach(el=>{
      el.style.display = (lang === 'ur') ? 'block' : 'none';
    });
  }
  const oldSet = window.ALIZAI_setLang;
  window.ALIZAI_setLang = function(lang){
    oldSet(lang);
    updateVisibility(lang);
  }
  updateVisibility(localStorage.getItem('alizai_lang') || 'en');
})();

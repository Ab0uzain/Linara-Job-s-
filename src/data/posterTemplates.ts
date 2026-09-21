import { AspectRatio, PosterThemeId } from "../types";

export type TemplateStyle =
  | "editorial"       // تصميم إخباري/مجلة فاخر بأرقام وعناوين ضخمة
  | "bold-impact"     // تصميم جريء عالي التباين يلفت الانتباه من أول ثانية
  | "creative-flow"   // تصميم إبداعي وعصري متدرج مستهدف للبنات
  | "corporate-trust" // تصميم مؤسسي رصين يركز على العراقة من 2012 والأمان
  | "minimal-chic"    // تصميم مينيملست نظيف بمساحات تنفس عالية
  | "hiring-badge";   // تصميم ببطاقة وشارة توظيف بارزة مركزة

export interface PosterTemplate {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  badge: string;
  style: TemplateStyle;
  defaultAspectRatio: AspectRatio;
  defaultThemeId: PosterThemeId;
  previewColor: string;
  customization: {
    heroTagline: string;
    subTagline: string;
    emphasisBadge: string;
    showLocations: boolean;
    showTrustYear: boolean;
    showPerksGrid: boolean;
    showRequirementsPills: boolean;
    showSalaryHighlight: boolean;
    highlightSalaryText: string;
    showCtaPill: boolean;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    accentFontFamily?: string;
  };
}

export const posterTemplatesLibrary: PosterTemplate[] = [
  {
    id: "tpl-bold-impact",
    name: "التأثير الجريء (Bold Impact)",
    nameEn: "Bold Impact",
    description: "عنوان ضخم بارز مع شارة 'مطلوب فوراً' وتركيز سريع على الراتب والعمولات.",
    badge: "الأكثر تفاعلاً 🔥",
    style: "bold-impact",
    defaultAspectRatio: "1:1",
    defaultThemeId: "royal-gold",
    previewColor: "from-amber-500 to-orange-600",
    customization: {
      heroTagline: "لو شاطرة في التسويق وبتعرفي تقنعي العميل.. مكانك معانا! 🎯",
      subTagline: "فرصة توظيف أونلاين فورية لبنات الإسكندرية وكفر الدوار براتب ثابت وعمولات مجزية",
      emphasisBadge: "مطلوب بنوّتة شاطرة فوراً 💻✨",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: true,
      showSalaryHighlight: true,
      highlightSalaryText: "راتب ثابت + عمولات مجزية + بدلات انتقالات",
      showCtaPill: true,
      ctaPrimaryText: "طريقة التقديم: سيبي كومنت تسويقي يثبت مهارتك في الإقناع!",
      ctaSecondaryText: "✨ صاحبات أفضل كومنتات ليهم إنترفيو فوري عبر Google Meet",
    },
  },
  {
    id: "tpl-creative-flow",
    name: "الإبداع العصري (Creative Chic)",
    nameEn: "Creative Chic",
    description: "ألوان وردية وبنفسجية جذابة جداً وموجهة للبنات والسيدات الطموحات للعمل عن بعد.",
    badge: "مخصص للبنات 🌸",
    style: "creative-flow",
    defaultAspectRatio: "9:16",
    defaultThemeId: "amethyst-rose",
    previewColor: "from-pink-500 to-purple-600",
    customization: {
      heroTagline: "حبي شغلك من البيت واكسبي ثقة أصحاب الأعمال والمتاجر 🌸",
      subTagline: "انضمي لفريق التسويق والمبيعات الرقمية في وكالة متخصصة منذ 2012",
      emphasisBadge: "عمل أونلاين من المنزل 🏠",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: true,
      showSalaryHighlight: true,
      highlightSalaryText: "راتب ثابت + عمولات تصاعدية + دورات تدريبية معتمدة",
      showCtaPill: true,
      ctaPrimaryText: "اختبار القبول: كومنت تسويقي مميز يثبت لبقاقتك وقدرتك على الإقناع 💬",
      ctaSecondaryText: "مقابلات حصرية أونلاين عبر Google Meet للمرشحات المتميزات",
    },
  },
  {
    id: "tpl-corporate-trust",
    name: "المؤسسي الموثوق (Corporate Trust)",
    nameEn: "Corporate Trust",
    description: "تركيز فائق على عراقة وتاريخ الوكالة من عام 2012، مع تثبيت وتأمين اجتماعي كامل.",
    badge: "رسمي وموثوق 🛡️",
    style: "corporate-trust",
    defaultAspectRatio: "16:9",
    defaultThemeId: "emerald-tech",
    previewColor: "from-teal-500 to-emerald-700",
    customization: {
      heroTagline: "وكالة خدمات الويب والتسويق الرقمي تعلن عن فتح باب التوظيف",
      subTagline: "شركة مصرية مسجلة رسمياً منذ 2012 تطلب مسوّقات رقميات (الإسكندرية & كفر الدوار)",
      emphasisBadge: "وظيفة آمنة ومستقرة ⚖️",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: true,
      showSalaryHighlight: true,
      highlightSalaryText: "تثبيت وتأمين اجتماعي وصحي كامل بعد 3 أشهر",
      showCtaPill: true,
      ctaPrimaryText: "التقديم باختبار عملي: شاركينا أسلوبك التسويقي في تعليق",
      ctaSecondaryText: "المقابلات الرسمية مجدولة عبر منصة Google Meet",
    },
  },
  {
    id: "tpl-editorial",
    name: "المجلة التسويقية (Editorial Spotlight)",
    nameEn: "Editorial Spotlight",
    description: "تنسيق أنيق بمظهر بطاقات إخبارية، يبرز معايير القبول وشروط السن والمؤهل بوضوح.",
    badge: "تنسيق تحليلي 📑",
    style: "editorial",
    defaultAspectRatio: "1:1",
    defaultThemeId: "executive-dark",
    previewColor: "from-cyan-500 to-blue-700",
    customization: {
      heroTagline: "هل لديكِ شغف بالمبيعات والتعامل مع أصحاب الأنشطة التجارية؟",
      subTagline: "نبحث عن صاحبات التفكير البيعي الاستراتيجي للعمل أونلاين بمكافآت مجزية",
      emphasisBadge: "فرصة مميزة للموهوبات 🚀",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: true,
      showSalaryHighlight: true,
      highlightSalaryText: "زيادات تصاعدية في الراتب حسب الإنتاجية والإغلاق البيعي",
      showCtaPill: true,
      ctaPrimaryText: "أظهري كفاءتك في تعليق احترافي واحصلي على موعد المقابلة مباشرة",
      ctaSecondaryText: "اختيار المرشحات يتم أسبوعياً بناءً على جودة العرض التسويقي",
    },
  },
  {
    id: "tpl-minimal-chic",
    name: "المينيملست العصري (Minimal Clean)",
    nameEn: "Minimal Clean",
    description: "تصميم هادئ ومريح للعين مع مساحات واسعة وأيقونات خفيفة للتركيز على النص الصافي.",
    badge: "مظهر راقي ✨",
    style: "minimal-chic",
    defaultAspectRatio: "1:1",
    defaultThemeId: "royal-gold",
    previewColor: "from-amber-400 to-amber-600",
    customization: {
      heroTagline: "مكانك المفضل للعمل والنمو في عالم التسويق الرقمي",
      subTagline: "انضمي إلينا للعمل أونلاين (عن بعد) بمزايا استثنائية وبيئة داعمة",
      emphasisBadge: "وظيفة رقمية متكاملة 🌐",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: false,
      showSalaryHighlight: true,
      highlightSalaryText: "راتب ثابت + عمولات فورية + بدل انتقالات",
      showCtaPill: true,
      ctaPrimaryText: "كومنت بسيط يختصر أسلوبك التسويقي يضمن لكِ المقابلة!",
      ctaSecondaryText: "Google Meet Online Interview",
    },
  },
  {
    id: "tpl-hiring-badge",
    name: "شارة التوظيف الفوري (We Are Hiring)",
    nameEn: "We Are Hiring",
    description: "ختم وشارة توظيف ضخمة واضحة فوراً في خلاصة الأخبار (Feed Stopper) تمنع التمرير.",
    badge: "ملفت للانتباه 🛑",
    style: "hiring-badge",
    defaultAspectRatio: "9:16",
    defaultThemeId: "royal-gold",
    previewColor: "from-amber-500 to-red-600",
    customization: {
      heroTagline: "WE ARE HIRING! وكالة تسويق رقمي تطلب بنات للعمل أونلاين",
      subTagline: "الإسكندرية وكفر الدوار — وظائف فورية للمتميزات في الإقناع والمبيعات",
      emphasisBadge: "وظيفة شاغرة فوراً ⚡",
      showLocations: true,
      showTrustYear: true,
      showPerksGrid: true,
      showRequirementsPills: true,
      showSalaryHighlight: true,
      highlightSalaryText: "رواتب ومكافآت مجزية + فرص تثبيت سريعة",
      showCtaPill: true,
      ctaPrimaryText: "طريقة التقديم: سيبي كومنت تسويقي شاطر يثبت مهارتك الآن!",
      ctaSecondaryText: "المقابلات تبدأ خلال 24 ساعة عبر Google Meet",
    },
  },
];

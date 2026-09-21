import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Share2,
  ThumbsUp,
  MessageCircle,
  Send,
  Linkedin,
  Facebook,
  Instagram,
  Video,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { JobDetails, GeneratedCopy } from "../types";

interface Props {
  jobData: JobDetails;
}

export const AIAdCopyGenerator: React.FC<Props> = ({ jobData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    "facebook" | "instagram" | "tiktok" | "linkedin" | "whatsapp"
  >("facebook");

  const [selectedTone, setSelectedTone] = useState<string>("حماس مصري راقي ومحفز");
  const [customNote, setCustomNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Cached or generated copies for each platform
  const [copies, setCopies] = useState<Record<string, GeneratedCopy>>({
    facebook: {
      platform: "facebook",
      headline: "🚀 مطلوب بنوّتة شاطرة من الإسكندرية وأخرى من كفر الدوار للعمل أونلاين فوراً! 💻✨",
      formattedPost: `🚀 مطلوب بنوّتة شاطرة من الإسكندرية وأخرى من كفر الدوار للعمل أونلاين فوراً! 💻✨

لو شاطرة في التسويق وبتعرفي تقنعي العميل بكلمتين صح، مكانك محفوظ معانا في وكالة متخصصة في خدمات الويب والتسويق الرقمي الشامل (شركة مصرية مسجلة رسمياً منذ 2012) 🎯

💼 تفاصيل الوظيفة:
▫️ العمل أونلاين براتب ثابت + عمولات مجزية + بدلات انتقالات.
▫️ زيادات تصاعدية حسب الإنتاجية والتطور.
▫️ فرصة تعيين وتأمين اجتماعي كامل بعد 3 أشهر عمل.
▫️ دعم بالحصول على شهادات ودورات تدريبية معتمدة دولياً.

📌 الشروط المطلوبة:
1️⃣ السن لا يزيد عن 30 سنة | حسنة المظهر والأسلوب.
2️⃣ مؤهل عالي أو متوسط.
3️⃣ إجادة الإنجليزية ولديكِ لباقة وقدرة إقناعية عالية.
4️⃣ فهم وخلفية بالسوشيال ميديا وطبيعة خدمات الويب.
5️⃣ القدرة على عمل مقابلات للعملاء وإنهاء التعاقدات بنجاح (مع توفير بدل الانتقالات).
6️⃣ الرغبة الحقيقية في التعلم والارتقاء بمهاراتك.

💡 طريقة التقديم الذكية:
لأننا نبحث عن "مسوّقة حقيقية".. التقديم هنا هيكون اختبار عملي لموهبتك:
سيبيلنا كومنت بصيغة تسويقية ذكية تعرضي فيها نفسك وقدرتك على الإقناع! 💬

✨ صاحبات أفضل كومنتات سيتم التواصل معهن وتحديد ميعاد فوري لإنترفيو أونلاين عبر Google Meet.

#وظائف_مصر #شغل_اونلاين #الاسكندرية #كفر_الدوار #تسويق_الكتروني #وظائف_بنات #مبيعات #remotejobs`,
      callToAction: "سيبيلنا كومنتك التسويقي الذكي دلوقتي وماتنسيش تعملي منشن لصحبتك الشاطرة! 💬👇",
      keyTips: [
        "انشر المنشور يوم الأحد أو الثلاثاء بين الساعة 7 مساءً و10 مساءً لأعلى تفاعل",
        "قم بتثبيت (Pin) أفضل 3 تعليقات للمتقدمات في أول ساعة لتحفيز البقية",
      ],
    },
    instagram: {
      platform: "instagram",
      headline: "فرصة توظيف حقيقية أونلاين لمسوّقات الإسكندرية وكفر الدوار 🌊✨",
      formattedPost: `عندك موهبة إقناع حقيقية؟ بتعرفي تفهمي العميل وتوصليله قيمة الخدمة ببساطة؟ 💡

مكانك مستنيكي معانا في وكالة مصرية متخصصة في خدمات الويب والتسويق الرقمي (تأسست عام 2012) 🚀

المميزات:
✨ راتب شهري ثابت + عمولات مبيعات ممتازة
✨ بدل انتقالات لمقابلة العملاء
✨ زيادات مستمرة حسب إنجازك
✨ فرصة تأمين اجتماعي وتثبيت بعد 3 شهور
✨ دورات تدريبية وشهادات معتمدة لتطوير مهاراتك

📌 بنبحث عن:
بنوّتة من الإسكندرية وأخرى من كفر الدوار، سنها حتى 30 سنة، لبقة ومحترفة في التواصل وفاهمة سوشيال ميديا.

طريقة التقديم:
عشان إحنا بندور على شطارة حقيقية، اختبارك هيبدأ من هنا:
اكتبي كومنت تسويقي بيعبر عن شطارتك وقدرتك على الإقناع! 💬
صاحبات الكومنتات الأقوى هيتبعتلهم لينك إنترفيو Google Meet فوري.

.
.
#تسويق_رقمي #شغل_عن_بعد #بنات_اسكندرية #كفر_الدوار #وظائف_شاغرة #digitalmarketing #salesegypt`,
      callToAction: "سيبي كومنتك الذكي، وابعتي البوست في الـ DM لصحبتك اللي بتدور على شغل!",
      keyTips: [
        "صمم كاورسيل (Carousel) من 4 شرائح: الشريحة الأولى الهوك، الثانية المميزات، الثالثة الشروط، الرابعة طريقة التقديم بالكومنت",
      ],
    },
    tiktok: {
      platform: "tiktok",
      headline: "اسكريبت فيديو ريلز / تيك توك 30 ثانية (معد للظهور بالفيديو) 🎬",
      formattedPost: `[المشهد الأول - أول 3 ثواني]:
المتحدثة تبتسم وتنظر للكاميرا: "لو أنتي من إسكندرية أو كفر الدوار، وشاطرة في الكلام والإقناع، الفيديو ده ليكي تحديداً!" 🎯

[المشهد الثاني - ثانية 4 إلى 15]:
"وكالتنا لخدمات الويب والتسويق الرقمي - شركة مصرية شغالة من 2012 - بتعين فوراً مسوّقتين للعمل أونلاين!
المميزات:
- مرتب ثابت + عمولة على كل تعاقد + بدل انتقالات لمقابلة العملاء.
- تأمين اجتماعي بعد 3 شهور، وتدريبات معتمدة دولياً!"

[المشهد الثالث - ثانية 16 إلى 25]:
"الشروط بسيطة: سنك مش أكتر من 30 سنة، أسلوبك لبق، وفاهمة شوية في السوشيال ميديا والويب.
وطريقة التقديم مبتكرة ومختلفة: مش عايزين CV تقليدي!"

[المشهد الرابع - ثانية 26 إلى 30]:
"سيبيلنا في الكومنتات صيغة تسويقية تقنعينا بيها بنفسك وبشطارتك! الكومنتات الذكية هتاخد إنترفيو فوري على Google Meet. مستنيينك!"`,
      callToAction: "سجلي كومنتك تحت الفيديو واثبتي مهارتك في الإقناع! 🚀",
      keyTips: [
        "استخدم نغمة موسيقية تريند هادئة ذات إيقاع إيجابي",
        "ضع الكلمات المفتاحية بالخط الكبير على الشاشة (مرتب ثابت - عمولات - شغل أونلاين)",
      ],
    },
    linkedin: {
      platform: "linkedin",
      headline: "فرصة انضمام لفريق تطوير الأعمال والمبيعات الرقمية (Alexandria & Kafr El-Dawar)",
      formattedPost: `نعلن في وكالتنا المتخصصة في حلول الويب والتسويق الرقمي المتكامل (شركة مصرية مرخصة وتعمل بنجاح منذ عام 2012) عن فتح باب التعيين الفوري لكفاءات نسائية واعدة في مجال المبيعات والتسويق الرقمي:

📍 النطاق الجغرافي: الإسكندرية & كفر الدوار.
💼 طبيعة العمل: Remote / Online مع مرونة حضور الاجتماعات الميدانية مع العملاء.

ما نقدمه:
1. حزمة مالية تنافسية: راتب أساسي ثابت + نسبة عمولات مجزية + بدل انتقالات.
2. مسار وظيفي واضح وزيادات دورية مبنية على مؤشرات الأداء (KPIs).
3. تثبيت رسمي وتأمين اجتماعي كامل بعد انقضاء فترة التجربة (3 أشهر).
4. برامج تدريب وتطوير مهني للحصول على شهادات دولية معتمدة.

المؤهلات المطلوبة:
• السن حتى 30 عاماً، مع إجادة مهارات التواصل والعرض التقديمي.
• إتقان اللغة الإنجليزية، وفهم عملي لطبيعة مشاريع الويب والتسويق.
• القدرة على قيادة المفاوضات وإغلاق الصفقات (Deal Closing).

آلية التقديم المبتكرة:
إيماناً منا بأن مهارة المسوّق تتجلى في قدرته على البيع الفعلي، ندعو الراغبات لكتابة تعليق مهني موجز ومقنع يبرز القيمة المضافة التي ستصنعها معنا.
سيتم ترشيح صاحبات الطرح الأكثر إقناعاً لمقابلة فيديو فورية عبر Google Meet.

#Hiring #DigitalMarketing #SalesExecutive #Alexandria #RemoteWork #EgyptJobs`,
      callToAction: "شارك تعليقك المهني أو أعد النشر (Repost) لدعم الكفاءات الشابة في الإسكندرية والبحيرة.",
      keyTips: [
        "شجع أعضاء الفريق الحالي على التفاعل وإعادة النشر لمنح المنشور مصداقية إضافية",
      ],
    },
    whatsapp: {
      platform: "whatsapp",
      headline: "رسالة واتساب مخصصة لجروبات ومجموعات الوظائف والبث (Broadcast) 💬",
      formattedPost: `السلام عليكم ورحمة الله وبركاته 🌸

فرصة عمل ممتازة للبنات من الإسكندرية وكفر الدوار:
مطلوب بنوّتة شاطرة في التسويق والمبيعات للعمل أونلاين فوراً في وكالة تسويق وخدمات ويب (شركة مسجلة منذ 2012) 🎯

المميزات:
🔹 راتب ثابت + عمولات مجزية + بدلات انتقالات
🔹 زيادات تصاعدية + تأمين اجتماعي بعد 3 شهور
🔹 دورات تدريبية معتمدة

الشروط:
▪️ السن حتى 30 سنة | لباقة وأسلوب راقي
▪️ مؤهل عالي أو متوسط | إجادة الإنجليزية
▪️ فهم بالسوشيال ميديا والويب والقدرة على إقناع العملاء

طريقة التقديم الذكية:
سيبيلنا رسالة أو كومنت بصيغة تسويقية ذكية تعرضي فيها نفسك وقدرتك على الإقناع!
صاحبات أفضل عروض هيتم تحديد إنترفيو فوري ليهم أونلاين عبر Google Meet 💻

للتفاصيل والتواصل السريع:
ردي على الرسالة دي بعرضك التسويقي فوراً! ✨`,
      callToAction: "أرسلي عرضك التسويقي المباشر هنا وسيتم الرد خلال دقائق.",
      keyTips: [
        "أرسلها في جروبات خريجات الجامعات وجروبات التوظيف النسائية بالإسكندرية والبحيرة",
      ],
    },
  });

  const handleGenerateWithAI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          tone: selectedTone,
          customNote: customNote,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setCopies((prev) => ({
          ...prev,
          [selectedPlatform]: resData.data,
        }));
      }
    } catch (err) {
      console.error("Failed to generate with AI:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCopy = copies[selectedPlatform] || copies.facebook;

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div id="ai-ad-copy-generator" className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>محرك كتابة الإعلانات الذكي بالذكاء الاصطناعي (Gemini)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            صياغة نصوص إعلانات احترافية مخصصة لكل منصة تواصل
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            صيغ جاهزة ومحكمة تسويقياً للفيسبوك، إنستغرام، تيك توك، لينكد إن والواتساب مع مراعاة السيكولوجيا البيعية المصرية.
          </p>
        </div>

        <button
          onClick={handleGenerateWithAI}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "جاري التوليد بذكاء Gemini..." : "إعادة توليد النص بالذكاء الاصطناعي"}</span>
        </button>
      </div>

      {/* Platform Switcher & Generator Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Platform tabs */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-sm font-bold text-slate-200">اختر المنصة المستهدفة:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlatform("facebook")}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition ${
                  selectedPlatform === "facebook"
                    ? "bg-blue-600/20 border-blue-500 text-blue-300"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>فيسبوك (بوست تفاعلي)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform("instagram")}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition ${
                  selectedPlatform === "instagram"
                    ? "bg-pink-600/20 border-pink-500 text-pink-300"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>إنستغرام (كابشن وهاشتاج)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform("tiktok")}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition ${
                  selectedPlatform === "tiktok"
                    ? "bg-cyan-600/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Video className="w-4 h-4 text-cyan-400" />
                <span>تيك توك وريلز (اسكريبت)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform("linkedin")}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition ${
                  selectedPlatform === "linkedin"
                    ? "bg-sky-600/20 border-sky-500 text-sky-300"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>لينكد إن (مهني مؤسسي)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform("whatsapp")}
                className={`col-span-2 flex items-center justify-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition ${
                  selectedPlatform === "whatsapp"
                    ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>رسالة واتساب وبث مباشر (Groups & Broadcast)</span>
              </button>
            </div>
          </div>

          {/* Tone & Notes */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">نبرة الصوت التسويقية (Tone):</label>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="حماس مصري راقي ومحفز للعمل">حماس مصري راقي ومحفز للعمل</option>
                <option value="مؤسسي احترافي وتركيز على التطوير المهني">مؤسسي احترافي وتركيز على التطوير المهني</option>
                <option value="مباشر وموجه لمهارات الإقناع وكسب الثقة">مباشر وموجه لمهارات الإقناع وكسب الثقة</option>
                <option value="ودي ولطيف موجه للبنات وحديثات التخرج">ودي ولطيف موجه للبنات وحديثات التخرج</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">توجيه إضافي للذكاء الاصطناعي (اختياري):</label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="مثال: ركز على أن الوكالة تعمل من 2012 ومقرها رسمي، والراتب فيه بدلات مقابلات..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={handleGenerateWithAI}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-amber-300 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>تخصيص الصياغة مع Gemini ←</span>
            </button>
          </div>

          {/* Social publishing tips */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>نصائح النشر لتحقيق أعلى انتشار:</span>
            </div>
            <ul className="space-y-1.5 text-slate-400">
              {currentCopy.keyTips?.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Generated Copy Display & Simulated Social Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Simulated Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* Platform Top Bar */}
            <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  W
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">
                      وكالة خدمات الويب والتسويق الرقمي
                    </h3>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-blue-500/30">
                      شركة مسجلة 2012
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>منذ دقيقة واحدة</span>
                    <span>•</span>
                    <span className="capitalize">{selectedPlatform}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopyText(currentCopy.formattedPost, "main-post")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition"
              >
                {copiedKey === "main-post" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ النص كاملاً</span>
                  </>
                )}
              </button>
            </div>

            {/* Post Content */}
            <div className="p-6 space-y-4">
              <div className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-line font-['Cairo',sans-serif]">
                {currentCopy.formattedPost}
              </div>

              {/* Call to Action Box */}
              {currentCopy.callToAction && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{currentCopy.callToAction}</span>
                </div>
              )}
            </div>

            {/* Social Engagement Fake Reactions Bar */}
            <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1 text-slate-300">
                <span className="flex -space-x-1 rtl:space-x-reverse">
                  <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">
                    👍
                  </span>
                  <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
                    ❤️
                  </span>
                </span>
                <span className="mr-2">84 تفاعل وتأييد</span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span>28 تعليق تسويقي ذكي 💬</span>
                <span>14 مشاركة 🚀</span>
              </div>
            </div>

            {/* Interactive Bottom Bar */}
            <div className="px-6 py-2.5 bg-slate-900 border-t border-slate-800/60 flex items-center justify-around text-xs text-slate-400 font-medium">
              <button className="flex items-center gap-1.5 hover:text-slate-200 transition py-1">
                <ThumbsUp className="w-4 h-4" />
                <span>إعجاب</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-amber-400 transition py-1 font-bold text-amber-300">
                <MessageCircle className="w-4 h-4" />
                <span>سيبيلنا كومنتك التسويقي!</span>
              </button>
              <button
                onClick={() => handleCopyText(currentCopy.formattedPost, "bottom-share")}
                className="flex items-center gap-1.5 hover:text-slate-200 transition py-1"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedKey === "bottom-share" ? "تم النسخ!" : "مشاركة الإعلان"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

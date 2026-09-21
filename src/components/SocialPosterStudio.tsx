import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Download,
  Copy,
  Check,
  Sparkles,
  MapPin,
  Laptop,
  Briefcase,
  DollarSign,
  Award,
  ShieldCheck,
  Share2,
  Calendar,
  MessageSquareText,
  Sliders,
  Maximize2,
  Eye,
  LayoutTemplate,
  CheckCircle,
  Clock,
  Sparkle,
  Zap,
} from "lucide-react";
import { JobDetails, AspectRatio, PosterThemeId } from "../types";
import { posterThemes } from "../data/jobDefaults";
import { PosterTemplate, posterTemplatesLibrary } from "../data/posterTemplates";
import { TemplateLibraryModal } from "./TemplateLibraryModal";

interface Props {
  jobData: JobDetails;
  onUpdateJobData: (newData: Partial<JobDetails>) => void;
  onOpenPitchEvaluator: () => void;
}

export const SocialPosterStudio: React.FC<Props> = ({
  jobData,
  onUpdateJobData,
  onOpenPitchEvaluator,
}) => {
  // Active template state
  const [activeTemplate, setActiveTemplate] = useState<PosterTemplate>(
    posterTemplatesLibrary[0]
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [selectedThemeId, setSelectedThemeId] = useState<PosterThemeId>("royal-gold");
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);

  const currentTheme =
    posterThemes.find((t) => t.id === selectedThemeId) || posterThemes[0];

  const handleSelectTemplate = (tpl: PosterTemplate) => {
    setActiveTemplate(tpl);
  };

  const handleUpdateCustomization = (
    fields: Partial<PosterTemplate["customization"]>
  ) => {
    setActiveTemplate((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        ...fields,
      },
    }));
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2.5, // Ultra crisp output
      });
      const link = document.createElement("a");
      link.download = `job-ad-${activeTemplate.id}-${aspectRatio}-${selectedThemeId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export poster image:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyFormattedPost = () => {
    const fullText = `🚀 ${activeTemplate.customization.emphasisBadge}

${activeTemplate.customization.heroTagline}
${activeTemplate.customization.subTagline}

📍 الوكالة: ${jobData.companyName} (شركة مصرية مسجلة رسمياً منذ ${jobData.establishedYear}) 🎯
🏙️ المحافظات المستهدفة: ${jobData.locations.join(" & ")}

💼 مميزات الوظيفة:
▫️ ${activeTemplate.customization.highlightSalaryText}
▫️ زيادات تصاعدية حسب الإنتاجية والتطور والإغلاق البيعي.
▫️ فرصة تثبيت وتأمين اجتماعي وصحي كامل بعد 3 أشهر عمل.
▫️ دعم بالحصول على شهادات ودورات تدريبية معتمدة دولياً.

📌 الشروط المطلوبة:
1️⃣ السن لا يزيد عن 30 سنة | حسنة المظهر والأسلوب واللباقة.
2️⃣ مؤهل عالي أو متوسط مع طموح حقيقي في النجاح.
3️⃣ إجادة الإنجليزية ولديكِ أسلوب إقناعي مؤثر وحضور متميز.
4️⃣ فهم وخلفية بالسوشيال ميديا وطبيعة خدمات الويب.
5️⃣ القدرة على عمل مقابلات للعملاء وإنهاء التعاقدات بنجاح (مع توفير بدل الانتقالات).
6️⃣ الرغبة الحقيقية في التعلم وتطوير المهارات.

💡 طريقة التقديم الذكية (اختبار عملي):
${activeTemplate.customization.ctaPrimaryText}
${activeTemplate.customization.ctaSecondaryText}

${jobData.hashtags.join(" ")}`;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Dimensions classes depending on Aspect Ratio
  const getPosterContainerClass = () => {
    switch (aspectRatio) {
      case "9:16":
        return "w-full max-w-[390px] min-h-[690px]";
      case "16:9":
        return "w-full max-w-[700px] min-h-[390px]";
      case "1:1":
      default:
        return "w-full max-w-[540px] min-h-[540px]";
    }
  };

  return (
    <div id="social-poster-studio" className="space-y-8">
      {/* Studio Header & Actions Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>استوديو تصاميم البوستر مع مكتبة القوالب الاحترافية</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            تصميم إعلان السوشيال ميديا مع قوالب مخصصة وتصدير فوري
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            اختاري من مكتبة القوالب الجاهزة (تأثير جريء، مخصص للبنات، مؤسسي، مينيملست) وخصصي المحتوى بدقة قبل التصدير.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch lg:self-auto">
          <button
            id="btn-copy-post-text"
            onClick={handleCopyFormattedPost}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم نسخ النص كاملاً!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>نسخ نص الإعلان والهاشتاجات</span>
              </>
            )}
          </button>

          <button
            id="btn-download-poster"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "جاري التصدير..." : "تحميل البوستر (PNG HD)"}</span>
          </button>
        </div>
      </div>

      {/* Templates Library Section (New feature) */}
      <TemplateLibraryModal
        activeTemplate={activeTemplate}
        onSelectTemplate={handleSelectTemplate}
        onUpdateCustomization={handleUpdateCustomization}
        aspectRatio={aspectRatio}
        onSelectAspectRatio={setAspectRatio}
        selectedThemeId={selectedThemeId}
        onSelectThemeId={setSelectedThemeId}
      />

      {/* Main Studio Grid: Controls on Left / Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Format / Aspect Ratio Selector */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>أبعاد المنصة (Aspect Ratio)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="format-ratio-1-1"
                type="button"
                onClick={() => setAspectRatio("1:1")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                  aspectRatio === "1:1"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 font-semibold"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="w-6 h-6 border-2 border-current rounded-md mb-1.5" />
                <span className="text-xs font-bold">1:1 مربع</span>
                <span className="text-[11px] opacity-75">فيسبوك / إنستغرام</span>
              </button>

              <button
                id="format-ratio-9-16"
                type="button"
                onClick={() => setAspectRatio("9:16")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                  aspectRatio === "9:16"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 font-semibold"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="w-4 h-7 border-2 border-current rounded-md mb-1.5" />
                <span className="text-xs font-bold">9:16 طولي</span>
                <span className="text-[11px] opacity-75">ستوري / ريلز / تيك توك</span>
              </button>

              <button
                id="format-ratio-16-9"
                type="button"
                onClick={() => setAspectRatio("16:9")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                  aspectRatio === "16:9"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 font-semibold"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="w-7 h-4 border-2 border-current rounded-md mb-1.5" />
                <span className="text-xs font-bold">16:9 عريض</span>
                <span className="text-[11px] opacity-75">لينكد إن / تويتر</span>
              </button>
            </div>
          </div>

          {/* Color Palette / Theme Selector */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>هوية الألوان والتدرج البصري</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {posterThemes.map((theme) => (
                <button
                  key={theme.id}
                  id={`theme-${theme.id}`}
                  type="button"
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-right transition ${
                    selectedThemeId === theme.id
                      ? "bg-slate-800 border-amber-400/80 ring-1 ring-amber-400/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.accentColor} shrink-0 shadow-sm`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-200 truncate">
                      {theme.name.split("(")[0]}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {theme.id}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Pitch Lab Hook */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-slate-200">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1.5">
              <MessageSquareText className="w-4 h-4" />
              <span>فكرة التقديم بالكومنت الذكي</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              الإعلان مصمم لفلترة المتقدمات عملياً: المتقدمة تكتب كومنت تسويقي يثبت قدرتها على الإقناع. يمكنك تجربة تقييم الكومنتات فوراً عبر نموذج الذكاء الاصطناعي!
            </p>
            <button
              onClick={onOpenPitchEvaluator}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 underline decoration-amber-400/50"
            >
              <span>فتح مختبر تقييم الكومنتات الذكية الآن ←</span>
            </button>
          </div>
        </div>

        {/* Live Graphic Poster Display Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>معاينة حية للقالب المختار: <strong className="text-white">{activeTemplate.name}</strong></span>
            </span>
            <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 font-mono text-[11px]">
              {aspectRatio === "1:1"
                ? "1080 x 1080 px"
                : aspectRatio === "9:16"
                ? "1080 x 1920 px"
                : "1200 x 675 px"}
            </span>
          </div>

          {/* The Actual Rendered Poster DOM Element */}
          <div
            id="rendered-poster-canvas"
            ref={posterRef}
            className={`${getPosterContainerClass()} relative rounded-3xl p-6 md:p-8 bg-gradient-to-b ${
              currentTheme.bgGradient
            } border-2 ${currentTheme.borderColor} shadow-2xl overflow-hidden text-right flex flex-col justify-between select-none transition-all duration-300`}
            style={{
              boxShadow: `0 25px 50px -12px ${currentTheme.glowColor}`,
            }}
          >
            {/* Background Decorative Lighting */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            {/* Poster Header */}
            <div className="relative z-10 space-y-4">
              {/* Trust Badge & Location Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                {activeTemplate.customization.showTrustYear && (
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-semibold text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>شركة مصرية مسجلة رسمياً منذ 2012</span>
                  </div>
                )}

                {activeTemplate.customization.showLocations && (
                  <div className="flex items-center gap-1">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>الإسكندرية</span>
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>كفر الدوار</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Main Catchy Headline */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>{activeTemplate.customization.emphasisBadge}</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight font-['Alexandria',sans-serif]">
                  {activeTemplate.customization.heroTagline}
                </h1>

                <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                  {activeTemplate.customization.subTagline}
                </p>
              </div>

              {/* Salary & Perks Highlight Card */}
              {activeTemplate.customization.showPerksGrid && (
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>تفاصيل ومميزات الوظيفة:</span>
                    </div>
                    {activeTemplate.customization.showSalaryHighlight && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">
                        {activeTemplate.customization.highlightSalaryText}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-200">
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▫️</span>
                      <span>راتب ثابت + عمولات مجزية + بدلات انتقالات</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▫️</span>
                      <span>زيادات تصاعدية حسب الإنتاجية والتطور</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▫️</span>
                      <span>تثبيت وتأمين اجتماعي كامل بعد 3 أشهر</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▫️</span>
                      <span>دعم شهادات ودورات تدريبية معتمدة دولياً</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditions / Requirements */}
              {activeTemplate.customization.showRequirementsPills &&
                aspectRatio !== "16:9" && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <span>📌 أهم الشروط المطلوبة:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                        السن حتى 30 سنة | لباقة وحسن مظهر
                      </span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                        مؤهل عالي أو متوسط
                      </span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                        إجادة الإنجليزية وقدرة إقناعية عالية
                      </span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                        فهم بالسوشيال ميديا وخدمات الويب
                      </span>
                    </div>
                  </div>
                )}
            </div>

            {/* Smart Application Call-To-Action (Footer) */}
            {activeTemplate.customization.showCtaPill && (
              <div className="relative z-10 mt-4 pt-3 border-t border-white/10">
                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 rounded-xl p-3.5 border border-amber-500/40 flex items-center justify-between gap-3">
                  <div className="space-y-1 text-right">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                      <span>طريقة التقديم الذكية (اختبار عملي):</span>
                    </div>
                    <p className="text-[11px] text-white font-medium leading-relaxed">
                      {activeTemplate.customization.ctaPrimaryText}
                    </p>
                    <p className="text-[10px] text-amber-200/80">
                      {activeTemplate.customization.ctaSecondaryText}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] shadow-md text-center leading-tight">
                    <span>كومنت</span>
                    <span>=</span>
                    <span>إنترفيو</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

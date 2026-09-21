import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Laptop,
  Calculator,
  CheckCircle2,
  Calendar,
  Send,
  HelpCircle,
  Clock,
  TrendingUp,
  Award,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { JobDetails, ApplicantSubmission } from "../types";

interface Props {
  jobData: JobDetails;
  onNewSubmission: (applicant: ApplicantSubmission) => void;
  onEvaluatePitchDirectly: (pitch: string, name: string, city: string) => void;
}

export const InteractiveCareerLanding: React.FC<Props> = ({
  jobData,
  onNewSubmission,
  onEvaluatePitchDirectly,
}) => {
  // Financial Calculator State
  const [estimatedDeals, setEstimatedDeals] = useState<number>(3);
  const baseSalary = 5000;
  const commissionPerDeal = 1800;
  const transportAllowance = 1200;
  const totalEstimatedIncome =
    baseSalary + estimatedDeals * commissionPerDeal + transportAllowance;

  // Applicant Submission Form State
  const [candidateName, setCandidateName] = useState("");
  const [city, setCity] = useState<"الإسكندرية" | "كفر الدوار" | "أخرى">("الإسكندرية");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pitchText, setPitchText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  // FAQs open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleReq = (index: number) => {
    setCheckedRequirements((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchText.trim() || !candidateName.trim()) return;

    const newApp: ApplicantSubmission = {
      id: `app-${Date.now()}`,
      candidateName: candidateName.trim(),
      city: city,
      phone: phone.trim() || "01000000000",
      email: email.trim() || "candidate@example.com",
      pitchText: pitchText.trim(),
      status: "new",
      submittedAt: "الآن",
      score: Math.floor(Math.random() * 15) + 82, // Initial algorithmic score estimate
      verdict: "تم استلام العرض بنجاح وبانتظار مراجعة الإدارة لتحديد موعد Google Meet",
    };

    onNewSubmission(newApp);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  const faqs = [
    {
      q: "هل الشغل أونلاين بالكامل ولا فيه نزول للمقر؟",
      a: "الشغل بنظام العمل عن بُعد (Online) من بيتك بالكامل لتنظيم وتنسيق المبيعات والمتابعات، مع توفير بدلات انتقالات مادية عند تنسيق مقابلات وجهاً لوجه مع أصحاب الأعمال والشركات لإنهاء التعاقدات الكبرى.",
    },
    {
      q: "ما هي طبيعة خدمات الويب والتسويق التي سنقوم بعرضها؟",
      a: "وكالتنا تقدم باقات متكاملة تشمل: تصميم وتطوير المواقع والمتاجر الإلكترونية، إدارة الحملات الإعلانية الممولة (Facebook, Google, TikTok)، وتهيئة محركات البحث (SEO). ستحصلين على تدريب كامل ومواد بيعية جاهزة تشرح كل ميزة بدقة وسهولة.",
    },
    {
      q: "كيف يتم تحديد موعد إنترفيو Google Meet؟",
      a: "بمجرد تقديمك لكومنت تسويقي ذكي ومقنع، يقوم فريق الموارد البشرية بالاطلاع عليه فوراً والتواصل معك عبر الواتساب لإرسال رابط المقابلة الأونلاين عبر Google Meet خلال أقل من 24 ساعة.",
    },
    {
      q: "ماذا بعد فترة الثلاثة أشهر الأولى؟",
      a: "يتم التثبيت الرسمي في الشركة مع تسجيل التأمين الاجتماعي الكامل، وتحديث سلم الرواتب والعمولات وفقاً لإنتاجيتك وعدد الصفقات المنجزة.",
    },
  ];

  return (
    <div id="interactive-career-landing" className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 md:p-12 text-center space-y-6 shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>وكالة مصرية مرخصة رسمياً تعمل بنجاح منذ عام 2012 🎯</span>
        </div>

        <h1 className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-extrabold text-white font-['Alexandria',sans-serif] leading-tight max-w-4xl mx-auto">
          انضمي لفريق التسويق والمبيعات الرقمية الأكثر طموحاً في الإسكندرية وكفر الدوار
        </h1>

        <p className="relative z-10 text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          فرصة عمل حقيقية أونلاين تجمع بين الاستقرار المالي (راتب ثابت)، والحرية في تحقيق عمولات غير محدودة مع بيئة تدريب ودعم معتمد دولياً.
        </p>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>الإسكندرية + كفر الدوار</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <span>عمل أونلاين فوراً</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200">
            <Video className="w-4 h-4 text-blue-400" />
            <span>إنترفيو سريع عبر Google Meet</span>
          </span>
        </div>
      </div>

      {/* Perks & Benefits Section (4 Cards) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">مميزات الوظيفة وحزمة المكافآت</h2>
          <p className="text-xs md:text-sm text-slate-400">
            نحن نكافئ الجهد والشطارة بمنظومة حوافز عادلة ومرنة تضمن لك أعلى عائد
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              💰
            </div>
            <h3 className="font-bold text-sm text-white">راتب ثابت + عمولات مجزية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              استقرار براتب شهري أساسي مع نسب عمولة تصاعدية ومجزية على كل عميل يتم التعاقد معه، بالإضافة لبدل انتقالات كامل.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              📈
            </div>
            <h3 className="font-bold text-sm text-white">زيادات تصاعدية سريعة</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              كلما زادت إنتاجيتك وتطور أسلوبك البيعي، يرتفع الراتب والعمولات بصورة دورية بدون سقف للأرباح.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              🛡️
            </div>
            <h3 className="font-bold text-sm text-white">تثبيت وتأمين اجتماعي</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              فرصة تثبيت رسمي في الشركة وتسجيل تأميني كامل بعد مرور 3 أشهر من العمل والالتزام بنجاح.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
              🎓
            </div>
            <h3 className="font-bold text-sm text-white">شهادات وتدريب دولي</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              دعم كامل بالحصول على دورات تدريبية متقدمة وشهادات معتمدة دولياً في المبيعات والتسويق الرقمي وتطوير الأعمال.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Financial Calculator */}
      <div className="bg-slate-900/90 rounded-2xl border border-amber-500/30 p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Calculator className="w-4 h-4" />
              <span>حاسبة الدخل التقديري الشهري (تقدير واقعي)</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              كم يمكنكِ أن تحققي شهرياً مع وكالتنا؟
            </h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            الراتب الأساسي + العمولات + البدلات
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider controls */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>عدد التعاقدات / العملاء المنجزة شهرياً:</span>
                <span className="text-amber-400 font-bold text-sm font-mono">
                  {estimatedDeals} تعاقدات
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={estimatedDeals}
                onChange={(e) => setEstimatedDeals(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 تعاقد</span>
                <span>5 تعاقدات</span>
                <span>10 تعاقدات فما فوق</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 text-[11px] block">الراتب الثابت</span>
                <span className="font-bold text-slate-200 mt-1 block">5,000 ج.م</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 text-[11px] block">عمولة الصفقات</span>
                <span className="font-bold text-emerald-400 mt-1 block">
                  {(estimatedDeals * commissionPerDeal).toLocaleString()} ج.م
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 text-[11px] block">بدلات الانتقالات</span>
                <span className="font-bold text-blue-400 mt-1 block">1,200 ج.م</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/15 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-amber-500/40 text-center space-y-2 shadow-inner">
            <span className="text-xs font-semibold text-amber-300">إجمالي الدخل الشهري المتوقع</span>
            <div className="text-3xl md:text-4xl font-extrabold text-white font-['Alexandria',sans-serif] tracking-tight">
              {totalEstimatedIncome.toLocaleString()} <span className="text-sm font-normal text-slate-300">جنيه مصري</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              قابل للزيادة بدون حد أقصى حسب تميزك وسرعة إتمام العقود مع العملاء الجدد.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements Checklist (6 Requirements) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">الشروط والمواصفات المطلوبة</h2>
          <p className="text-xs md:text-sm text-slate-400">
            اضغطي على كل شرط للتأكد من توافقه مع مهاراتك وشخصيتك الطموحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobData.requirements.map((req, idx) => {
            const isChecked = !!checkedRequirements[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleReq(idx)}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none transition ${
                  isChecked
                    ? "bg-slate-900/90 border-amber-500/50 text-slate-100"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked
                      ? "bg-amber-500 border-amber-400 text-slate-950 font-bold"
                      : "border-slate-700 bg-slate-800 text-transparent"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs md:text-sm font-semibold">{req}</span>
                  <p className="text-[11px] text-slate-400">
                    {isChecked ? "متوافق مع مؤهلاتي ومهاراتي" : "اضغطي للتأكيد"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Smart Application Form (طريقة التقديم الذكية) */}
      <div
        id="smart-application-form-section"
        className="rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-6 md:p-10 space-y-6 shadow-2xl relative"
      >
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 animate-bounce" />
            <span>بوابة التقديم الذكية والاختبار العملي</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-['Alexandria',sans-serif]">
            سيبيلنا كومنتك التسويقي المقنع، واحصلي على إنترفيو فوري! 💬
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            بدلاً من السيرة الذاتية الروتينية، نؤمن بأن موهبة المسوّقة تتحدث عن نفسها. اكتبي صيغة تسويقية ذكية تلفت الانتباه وتبرز مهارتك وقدرتك على إقناع العميل.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white font-['Alexandria',sans-serif]">
              تم استلام تقديمك وعرضك التسويقي بنجاح يا {candidateName}! 🎉
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              فريق الموارد البشرية سيقوم بمراجعة الكومنت والتواصل معك فوراً عبر الواتساب لتحديد موعد مقابلة Google Meet خلال الساعات القليلة القادمة.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
              >
                تقديم طلب آخر أو تعديل العرض
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">الاسم ثلاثي:</label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="مثال: ياسمين محمد علي"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">المدينة ومحل الإقامة:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="الإسكندرية">الإسكندرية (عروس البحر الأبيض)</option>
                  <option value="كفر الدوار">كفر الدوار (البحيرة)</option>
                  <option value="أخرى">أخرى (مستعدة لمقابلات الإسكندرية وكفر الدوار)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">رقم الهاتف / الواتساب:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 01012345678"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-left font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-200 flex items-center gap-1.5">
                  <span>الكومنت التسويقي الذكي (اختبارك العملي في الإقناع):</span>
                  <span className="text-amber-400 font-normal">
                    *اكتبي عرضك كما ستكتبينه على بوست السوشيال ميديا
                  </span>
                </label>
                <span className="text-slate-400 font-mono text-[11px]">
                  {pitchText.length} حرف
                </span>
              </div>
              <textarea
                required
                rows={4}
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
                placeholder="مثال: لو بتدوروا على مسوّقة مش بس بتعرض الخدمات، لأ دي بتخلي العميل يشوف المكسب والأرباح في أول شهر، يبقى مكانكم الصح معايا! عندي خبرة سنة في إقناع أصحاب الأنشطة التجارية بأهمية الموقع الإلكتروني، ومستعدة للإنترفيو فوراً لإثبات ده بالأرقام! 🎯"
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (pitchText.trim()) {
                    onEvaluatePitchDirectly(pitchText, candidateName || "المتقدمة", city);
                  } else {
                    alert("يرجى كتابة نص الكومنت التسويقي أولاً لتجربة تقييمه!");
                  }
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>تقييم الكومنت بالذكاء الاصطناعي ومراجعته أولاً</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs md:text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب التقديم لتحديد موعد الإنترفيو 🚀</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">الأسئلة الشائعة حول الوظيفة</h2>
          <p className="text-xs md:text-sm text-slate-400">إجابات واضحة ومباشرة لكل ما يدور في ذهنك</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 text-xs md:text-sm font-bold text-slate-200 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

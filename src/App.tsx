import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  FileText,
  Globe,
  Brain,
  Users,
  Copy,
  Check,
  ShieldCheck,
  MapPin,
  Laptop,
  Briefcase,
  Share2,
} from "lucide-react";
import { JobDetails, ApplicantSubmission } from "./types";
import { defaultJobDetails, initialMockApplicants } from "./data/jobDefaults";
import { SocialPosterStudio } from "./components/SocialPosterStudio";
import { AIAdCopyGenerator } from "./components/AIAdCopyGenerator";
import { InteractiveCareerLanding } from "./components/InteractiveCareerLanding";
import { AIPitchEvaluator } from "./components/AIPitchEvaluator";
import { RecruiterDashboard } from "./components/RecruiterDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "poster" | "copywriter" | "landing" | "evaluator" | "recruiter"
  >("poster");

  const [jobData, setJobData] = useState<JobDetails>(defaultJobDetails);
  const [applicants, setApplicants] = useState<ApplicantSubmission[]>(initialMockApplicants);
  const [evaluatorInitialData, setEvaluatorInitialData] = useState<{
    pitch?: string;
    name?: string;
    city?: string;
  }>({});

  const [copiedQuick, setCopiedQuick] = useState(false);

  const handleUpdateJobData = (newData: Partial<JobDetails>) => {
    setJobData((prev) => ({ ...prev, ...newData }));
  };

  const handleNewSubmission = (applicant: ApplicantSubmission) => {
    setApplicants((prev) => [applicant, ...prev]);
  };

  const handleUpdateApplicantStatus = (
    id: string,
    status: ApplicantSubmission["status"]
  ) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleOpenPitchEvaluatorWithCandidate = (
    pitch: string,
    name: string,
    city: string
  ) => {
    setEvaluatorInitialData({ pitch, name, city });
    setActiveTab("evaluator");
  };

  const handleQuickCopyPost = () => {
    const fullText = `🚀 مطلوب بنوّتة شاطرة من الإسكندرية وأخرى من كفر الدوار للعمل أونلاين فوراً! 💻✨

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

#وظائف_مصر #شغل_اونلاين #الاسكندرية #كفر_الدوار #تسويق_الكتروني #وظائف_بنات #مبيعات #remotejobs`;

    navigator.clipboard.writeText(fullText);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Agency Brand identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/20">
                W
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-sm sm:text-base text-white tracking-tight">
                    حملة توظيف مسوّقات رقميات
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>مسجلة 2012</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>الإسكندرية & كفر الدوار</span>
                  <span>•</span>
                  <span>عمل أونلاين</span>
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex items-center gap-2">
              <button
                id="header-quick-copy"
                onClick={handleQuickCopyPost}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
              >
                {copiedQuick ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden md:inline">نسخ نص الإعلان</span>
                    <span className="md:hidden">نسخ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <nav className="flex space-x-1 rtl:space-x-reverse overflow-x-auto pb-2 scrollbar-none border-t border-slate-900 pt-1 text-xs">
            <button
              id="tab-poster-studio"
              onClick={() => setActiveTab("poster")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === "poster"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>استوديو تصاميم البوستر</span>
            </button>

            <button
              id="tab-copywriter"
              onClick={() => setActiveTab("copywriter")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === "copywriter"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>نصوص الإعلانات والمنصات (Gemini)</span>
            </button>

            <button
              id="tab-landing-page"
              onClick={() => setActiveTab("landing")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === "landing"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>صفحة التقديم التفاعلية والحاسبة</span>
            </button>

            <button
              id="tab-ai-evaluator"
              onClick={() => setActiveTab("evaluator")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === "evaluator"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>مختبر تقييم الكومنتات والإنترفيو</span>
            </button>

            <button
              id="tab-recruiter-board"
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === "recruiter"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>لوحة المتقدمات ({applicants.length})</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main App Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "poster" && (
          <SocialPosterStudio
            jobData={jobData}
            onUpdateJobData={handleUpdateJobData}
            onOpenPitchEvaluator={() => setActiveTab("evaluator")}
          />
        )}

        {activeTab === "copywriter" && <AIAdCopyGenerator jobData={jobData} />}

        {activeTab === "landing" && (
          <InteractiveCareerLanding
            jobData={jobData}
            onNewSubmission={handleNewSubmission}
            onEvaluatePitchDirectly={(pitch, name, city) =>
              handleOpenPitchEvaluatorWithCandidate(pitch, name, city)
            }
          />
        )}

        {activeTab === "evaluator" && (
          <AIPitchEvaluator
            initialPitch={evaluatorInitialData.pitch}
            candidateName={evaluatorInitialData.name}
            city={evaluatorInitialData.city}
          />
        )}

        {activeTab === "recruiter" && (
          <RecruiterDashboard
            applicants={applicants}
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
            onOpenPitchEvaluatorWithCandidate={
              handleOpenPitchEvaluatorWithCandidate
            }
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            وكالة خدمات الويب والتسويق الرقمي الشامل — شركة مصرية مسجلة رسمياً منذ عام 2012
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>الإسكندرية</span>
            <span>•</span>
            <span>كفر الدوار</span>
            <span>•</span>
            <span>عمل أونلاين فوراً</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

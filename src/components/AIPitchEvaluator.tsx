import React, { useState } from "react";
import {
  Sparkles,
  Award,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Target,
  RefreshCw,
  MessageSquareText,
  Volume2,
  TrendingUp,
  Brain,
  Video,
} from "lucide-react";
import { PitchEvaluationResult } from "../types";

interface Props {
  initialPitch?: string;
  candidateName?: string;
  city?: string;
}

export const AIPitchEvaluator: React.FC<Props> = ({
  initialPitch = "",
  candidateName = "المتقدمة",
  city = "الإسكندرية",
}) => {
  const [pitchInput, setPitchInput] = useState<string>(
    initialPitch ||
      "لو بتدوروا على مسوّقة مش بس بتعرض الخدمات، لأ دي بتخلي العميل يشوف المكسب والأرباح في أول شهر، يبقى مكانكم الصح معايا! عندي خبرة في إقناع أصحاب الأنشطة التجارية بأهمية الموقع الإلكتروني، ومستعدة للإنترفيو فوراً لإثبات ده بالأرقام! 🎯"
  );
  const [candidateNameInput, setCandidateNameInput] = useState<string>(candidateName);
  const [cityInput, setCityInput] = useState<string>(city);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<PitchEvaluationResult | null>(null);

  // Sales Objection Simulator State
  const [selectedObjection, setSelectedObjection] = useState<string>(
    "أسعاركم غالية، فيه شركة تانية بتعمل السايت بـ 1000 جنيه"
  );
  const [objectionResponse, setObjectionResponse] = useState<string>(
    "أنا فاهمة حضرتك، بس الفرق بين موقع بـ 1000 جنيه وموقع بيجيب عملاء حقيقيين هو اللي بيحدد مكسبك. السايت بتاعنا معمول عشان يرجع استثمارك في أول شهرين!"
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [objectionFeedback, setObjectionFeedback] = useState<{
    rating: string;
    score: number;
    feedback: string;
    bestAlternativeScript: string;
    salesPsychologyTip: string;
  } | null>(null);

  const handleEvaluate = async () => {
    if (!pitchInput.trim()) return;
    setIsEvaluating(true);
    try {
      const response = await fetch("/api/evaluate-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pitchText: pitchInput,
          candidateName: candidateNameInput,
          city: cityInput,
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setEvaluationResult(data.data);
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSimulateObjection = async () => {
    setIsSimulating(true);
    try {
      const response = await fetch("/api/simulate-objection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objectionType: selectedObjection,
          applicantResponse: objectionResponse,
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setObjectionFeedback(data.data);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div id="ai-pitch-evaluator" className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>مختبر الذكاء الاصطناعي لتقييم الكومنتات ومحاكي الإنترفيو</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            تحليل وتقييم العروض التسويقية للمتقدمات واختبار مهارات التفاوض
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            يقوم نموذج Gemini بتحليل الكومنت التسويقي وتحديد مدى أهليته لإنترفيو Google Meet، مع محاكي لاعتراضات العملاء الحقيقية.
          </p>
        </div>
      </div>

      {/* Main Pitch Evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-amber-400" />
              <span>أدخلي نص الكومنت التسويقي للاختبار:</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400">اسم المتقدمة:</label>
                <input
                  type="text"
                  value={candidateNameInput}
                  onChange={(e) => setCandidateNameInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400">المدينة:</label>
                <select
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="كفر الدوار">كفر الدوار</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">نص الكومنت / العرض:</label>
              <textarea
                rows={5}
                value={pitchInput}
                onChange={(e) => setPitchInput(e.target.value)}
                placeholder="اكتبي الكومنت التسويقي الذي يبرز أسلوب الإقناع..."
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !pitchInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isEvaluating ? "animate-spin" : ""}`} />
              <span>{isEvaluating ? "جاري التحليل والتقييم الذكي..." : "تحليل الكومنت واستخراج النتيجة الآن"}</span>
            </button>

            {/* Quick preset examples */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">أو جربي نموذج كومنت جاهز:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPitchInput(
                      "لو كل العملاء بيقولوا 'هفكر وأرد عليك'، أنا مش بسيبهم يفكروا، بخليهم يدفعوا ويشكرونا كمان! خريجة إعلام من إسكندرية، شاطرة جداً في كسر الجليد وفهم احتياج العميل. جاهزة للإنترفيو فوراً!"
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300"
                >
                  نموذج 1: أسلوب إقناع حاسم
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPitchInput(
                      "بنات كفر الدوار شاطرين وبيعرفوا يكسبوا ثقة العميل من أول كلمة! مش ببيع خدمة وخلاص، ببيع للعميل حل يزود أرباحه بالأرقام وخدماتكم من 2012 هي أفضل برهان على النجاح. مستنية لينك الميتنج!"
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300"
                >
                  نموذج 2: بناء الثقة والعائد
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-4">
          {evaluationResult ? (
            <div className="bg-slate-900 rounded-2xl border border-amber-500/40 p-6 space-y-5 shadow-2xl animate-fade-in">
              {/* Overall Score */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-amber-400 font-bold block">
                    النتيجة الإجمالية لكومنت {candidateNameInput}:
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {evaluationResult.verdict}
                  </h4>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex flex-col items-center justify-center text-slate-950 font-black shadow-lg">
                  <span className="text-2xl font-mono leading-none">{evaluationResult.overallScore}</span>
                  <span className="text-[10px] font-bold opacity-80">/ 100</span>
                </div>
              </div>

              {/* Criteria Progress */}
              <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300 block">معايير التقييم التسويقي:</span>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>قوة الإقناع وكسب الانتباه (Persuasiveness):</span>
                      <span className="font-mono text-amber-400 font-bold">
                        {evaluationResult.criteria.persuasiveness}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${evaluationResult.criteria.persuasiveness}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>العقلية التسويقية (Marketing Sense):</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {evaluationResult.criteria.marketingSense}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${evaluationResult.criteria.marketingSense}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>اللباقة والاحترافية (Professionalism):</span>
                      <span className="font-mono text-blue-400 font-bold">
                        {evaluationResult.criteria.professionalism}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${evaluationResult.criteria.professionalism}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>وضوح القيمة المضافة (Clarity of Value):</span>
                      <span className="font-mono text-purple-400 font-bold">
                        {evaluationResult.criteria.clarity}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${evaluationResult.criteria.clarity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>أبرز نقاط القوة:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {evaluationResult.strengths?.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>فرص التحسين والتطوير:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {evaluationResult.improvementTips?.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Question for Google Meet Interview */}
              {evaluationResult.recommendedInterviewQuestion && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <Video className="w-4 h-4" />
                    <span>سؤال مقترح لمقابلتها في Google Meet:</span>
                  </div>
                  <p className="text-white font-medium italic leading-relaxed">
                    "{evaluationResult.recommendedInterviewQuestion}"
                  </p>
                </div>
              )}

              {/* Encouragement message */}
              {evaluationResult.encouragementMessage && (
                <div className="text-center text-xs text-amber-300/90 font-medium">
                  ✨ {evaluationResult.encouragementMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-800 text-center space-y-3 bg-slate-900/40">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-300">جاهز للتحليل الفوري</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                اضغطي على زر "تحليل الكومنت" لمعرفة تقييم الذكاء الاصطناعي لنص العرض التسويقي ونقاط القوة وسؤال المقابلة المخصص.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bonus Module: Sales Objection Simulator (محاكي اعتراضات العميل المصري) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Volume2 className="w-4 h-4" />
            <span>محاكي إقناع العميل المصري وإغلاق الصفقات (Deal Closing Simulator)</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">
            اختبري قدرتك على التعامل مع أشهر اعتراضات عملاء خدمات الويب والتسويق
          </h3>
          <p className="text-xs text-slate-400">
            أداة تفاعلية لتدريب المتقدمات على الرد الذكي على اعتراضات السعر والضمانات وتحويل الشك إلى تعاقد رسمي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">اختاري نوع الاعتراض الأكثر شيوعاً:</label>
              <select
                value={selectedObjection}
                onChange={(e) => setSelectedObjection(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="أسعاركم غالية، فيه شركة تانية بتعمل السايت بـ 1000 جنيه">
                  "أسعاركم غالية، فيه شركة تانية بتعمل السايت بـ 1000 جنيه" (اعتراض السعر)
                </option>
                <option value="أنا مجربتش إعلانات ممولة وشايف إن التسويق على النت مبيجبش نتيجة">
                  "مجربتش إعلانات ممولة وشايف إن التسويق مبيجبش نتيجة" (اعتراض المفهوم)
                </option>
                <option value="طب إيه اللي يضمنلي إن بعد ما ادفع هيجيلي مبيعات فعلاً؟">
                  "إيه اللي يضمنلي إن بعد ما ادفع هيجيلي مبيعات فعلاً؟" (اعتراض الضمان)
                </option>
                <option value="أنا شغال بالمعارف والعملاء الحاليين ومش محتاج موقع دلوقتي">
                  "أنا شغال بالمعارف والعملاء الحاليين ومش محتاج موقع دلوقتي" (اعتراض التأجيل)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">صيغة ردكِ المقترحة على العميل:</label>
              <textarea
                rows={3}
                value={objectionResponse}
                onChange={(e) => setObjectionResponse(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <button
              onClick={handleSimulateObjection}
              disabled={isSimulating}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-amber-300 flex items-center justify-center gap-2 transition"
            >
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>{isSimulating ? "جاري تقييم الرد..." : "تقييم الرد والحصول على صياغة الإغلاق الذهبية"}</span>
            </button>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-800 space-y-4">
            {objectionFeedback ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-bold text-slate-200">
                    تقييم ردك: <span className="text-amber-400">{objectionFeedback.rating}</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {objectionFeedback.score} / 100
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {objectionFeedback.feedback}
                </p>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <span className="font-bold text-amber-400 block">
                    الصيغة الذهبية المقترحة لإغلاق الصفقة (Deal Closer):
                  </span>
                  <p className="text-white font-medium leading-relaxed">
                    "{objectionFeedback.bestAlternativeScript}"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-0.5 text-slate-300">
                  <span className="font-bold text-blue-400 block">قاعدة نفسية للمبيعات:</span>
                  <p className="text-slate-300">{objectionFeedback.salesPsychologyTip}</p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">
                  اضغطي على زر التقييم لمعرفة كيف يرى مدير المبيعات أسلوب ردك على اعتراض العميل!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

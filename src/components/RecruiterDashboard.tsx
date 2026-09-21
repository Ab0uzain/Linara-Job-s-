import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Video,
  MessageCircle,
  Star,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  Copy,
  Check,
  Award,
} from "lucide-react";
import { ApplicantSubmission } from "../types";

interface Props {
  applicants: ApplicantSubmission[];
  onUpdateApplicantStatus: (id: string, status: ApplicantSubmission["status"]) => void;
  onOpenPitchEvaluatorWithCandidate: (pitch: string, name: string, city: string) => void;
}

export const RecruiterDashboard: React.FC<Props> = ({
  applicants,
  onUpdateApplicantStatus,
  onOpenPitchEvaluatorWithCandidate,
}) => {
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);

  const filteredApplicants = applicants.filter((app) => {
    const matchesCity = cityFilter === "all" || app.city === cityFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.pitchText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery);
    return matchesCity && matchesStatus && matchesSearch;
  });

  const handleCopyWhatsAppInvite = (app: ApplicantSubmission) => {
    const meetLink = app.meetLink || "https://meet.google.com/new";
    const msg = `أهلاً يا ${app.candidateName}، أسعد الله أوقاتك 🌸
معاكِ إدارة الموارد البشرية في وكالة خدمات الويب والتسويق الرقمي (تأسست 2012).
قرأنا الكومنت والعرض التسويقي اللي قدمتيه على إعلان الوظيفة، ومستواكِ وطريقتك في الإقناع لفتت نظرنا جداً! 🎯

يسعدنا تحديد موعد لمقابلة أونلاين (Online Interview) عبر Google Meet لمناقشة تفاصيل العمل والراتب والعمولات:
رابط المقابلة: ${meetLink}

ياريت تأكدي معانا الميعاد الأنسب ليكي غداً بين 2 إلى 6 مساءً. بالتوفيق! ✨`;

    navigator.clipboard.writeText(msg);
    setCopiedInviteId(app.id);
    setTimeout(() => setCopiedInviteId(null), 2500);

    // If on mobile/desktop with whatsapp
    const cleanPhone = app.phone.replace(/[^0-9]/g, "");
    const waPhone = cleanPhone.startsWith("0") ? "2" + cleanPhone : cleanPhone;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div id="recruiter-dashboard" className="space-y-6">
      {/* Header & Stats */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
            <Users className="w-4 h-4" />
            <span>لوحة تحكم مسؤولي التوظيف والمقابلات</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            متابعة عروض المتقدمات وفرز الكومنتات وتحديد مقابلات Google Meet
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            إجمالي المتقدمات المسجلات: {applicants.length} مرشحة من الإسكندرية وكفر الدوار
          </p>
        </div>

        {/* Quick stat chips */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-500/15 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold">
            {applicants.filter((a) => a.status === "shortlisted").length} مرشحة للمقابلة ⭐
          </span>
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold">
            {applicants.filter((a) => a.city === "الإسكندرية").length} الإسكندرية 🌊
          </span>
          <span className="bg-blue-500/15 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-xl text-xs font-bold">
            {applicants.filter((a) => a.city === "كفر الدوار").length} كفر الدوار 🌾
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الهاتف أو نص الكومنت..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">كل المدن</option>
            <option value="الإسكندرية">الإسكندرية فقط</option>
            <option value="كفر الدوار">كفر الدوار فقط</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">كل الحالات</option>
            <option value="new">طلبات جديدة</option>
            <option value="shortlisted">مرشحات للمقابلة (Shortlisted)</option>
            <option value="interviewed">تمت المقابلة</option>
            <option value="hired">تم التعيين</option>
          </select>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredApplicants.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 text-sm">
            لا توجد طلبات متوافقة مع معايير البحث الحالية.
          </div>
        ) : (
          filteredApplicants.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-4"
            >
              {/* Top Row: Candidate info & badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 text-sm">
                    {app.candidateName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{app.candidateName}</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] text-slate-300 border border-slate-700 flex items-center gap-1 font-normal">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{app.city}</span>
                      </span>
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5 font-mono">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{app.phone}</span>
                      </span>
                      <span>•</span>
                      <span>{app.submittedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Score & Status */}
                <div className="flex items-center gap-2">
                  {app.score && (
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{app.score}/100</span>
                    </div>
                  )}

                  <select
                    value={app.status}
                    onChange={(e) =>
                      onUpdateApplicantStatus(app.id, e.target.value as any)
                    }
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                      app.status === "shortlisted"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : app.status === "hired"
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : app.status === "interviewed"
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                        : "bg-slate-800 border-slate-700 text-slate-300"
                    }`}
                  >
                    <option value="new">طلب جديد</option>
                    <option value="shortlisted">مرشحة لـ Google Meet ⭐</option>
                    <option value="interviewed">تمت المقابلة</option>
                    <option value="hired">تم التعيين 🎉</option>
                  </select>
                </div>
              </div>

              {/* The Smart Pitch Text */}
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <span>الكومنت التسويقي للمتقدمة (الاختبار العملي):</span>
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-['Cairo',sans-serif]">
                  "{app.pitchText}"
                </p>
                {app.aiNotes && (
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/40 italic">
                    ملاحظة المراجعة: {app.aiNotes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onOpenPitchEvaluatorWithCandidate(
                      app.pitchText,
                      app.candidateName,
                      app.city
                    )
                  }
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  <span>فتح في مختبر الذكاء الاصطناعي لفحص مهارات الإقناع ←</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyWhatsAppInvite(app)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
                  >
                    {copiedInviteId === app.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم تجهيز الدعوة وفتح واتساب!</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>دعوة للمقابلة عبر واتساب</span>
                      </>
                    )}
                  </button>

                  <a
                    href={app.meetLink || "https://meet.google.com/new"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>رابط Google Meet</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

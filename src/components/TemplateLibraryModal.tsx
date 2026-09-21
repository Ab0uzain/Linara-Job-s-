import React, { useState } from "react";
import {
  LayoutTemplate,
  Check,
  Sparkles,
  Sliders,
  Type,
  Eye,
  RotateCcw,
  Palette,
  Maximize2,
  DollarSign,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PosterTemplate, posterTemplatesLibrary } from "../data/posterTemplates";
import { AspectRatio, PosterThemeId } from "../types";

interface Props {
  activeTemplate: PosterTemplate;
  onSelectTemplate: (template: PosterTemplate) => void;
  onUpdateCustomization: (fields: Partial<PosterTemplate["customization"]>) => void;
  aspectRatio: AspectRatio;
  onSelectAspectRatio: (ratio: AspectRatio) => void;
  selectedThemeId: PosterThemeId;
  onSelectThemeId: (themeId: PosterThemeId) => void;
}

export const TemplateLibraryModal: React.FC<Props> = ({
  activeTemplate,
  onSelectTemplate,
  onUpdateCustomization,
  aspectRatio,
  onSelectAspectRatio,
  selectedThemeId,
  onSelectThemeId,
}) => {
  const [activeTab, setActiveTab] = useState<"library" | "editor">("library");
  const [isEditorExpanded, setIsEditorExpanded] = useState<boolean>(true);

  return (
    <div id="template-library-container" className="space-y-4">
      {/* Top Header & Tab Switcher */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <LayoutTemplate className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>مكتبة القوالب الجاهزة (Templates)</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                {posterTemplatesLibrary.length} قوالب قابلة للتخصيص
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              اختاري قالباً جاهزاً ثم خصصي العناوين والمزايا والشارات قبل التحميل
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60">
          <button
            type="button"
            id="tab-templates-grid"
            onClick={() => setActiveTab("library")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "library"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>معرض القوالب</span>
          </button>
          <button
            type="button"
            id="tab-customize-active"
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "editor"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>تخصيص القالب الحالي</span>
          </button>
        </div>
      </div>

      {/* View 1: Templates Library Grid */}
      {activeTab === "library" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {posterTemplatesLibrary.map((template) => {
              const isSelected = activeTemplate.id === template.id;
              return (
                <div
                  key={template.id}
                  id={`template-card-${template.id}`}
                  onClick={() => {
                    onSelectTemplate(template);
                    // auto adapt default aspect ratio and theme for instant cohesion
                    onSelectAspectRatio(template.defaultAspectRatio);
                    onSelectThemeId(template.defaultThemeId);
                  }}
                  className={`relative cursor-pointer rounded-2xl p-4 border text-right transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? "bg-slate-800/90 border-amber-400 ring-2 ring-amber-400/30 shadow-xl"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                      {template.badge}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {template.defaultAspectRatio}
                    </span>
                  </div>

                  {/* Visual Style Preview Card */}
                  <div
                    className={`h-20 rounded-xl mb-3 p-3 flex flex-col justify-center bg-gradient-to-r ${template.previewColor} opacity-90 group-hover:opacity-100 transition shadow-inner relative overflow-hidden`}
                  >
                    <div className="absolute top-1 left-2 text-[9px] font-bold text-white/70 uppercase">
                      {template.style}
                    </div>
                    <p className="text-white text-xs font-bold leading-tight line-clamp-2">
                      {template.customization.heroTagline}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[9px] text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="truncate">{template.customization.emphasisBadge}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition">
                        {template.name}
                      </h4>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Action / Apply */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">الستايل: {template.nameEn}</span>
                    <span
                      className={`font-bold ${
                        isSelected ? "text-amber-400" : "text-slate-400 group-hover:text-amber-300"
                      }`}
                    >
                      {isSelected ? "القالب المفعّل حالياً ✓" : "تطبيق هذا القالب ←"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Live Customizer Panel for Active Template */}
      {activeTab === "editor" && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-amber-400 font-bold block">
                تخصيص القالب الحالي:
              </span>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>{activeTemplate.name}</span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700">
                  {activeTemplate.badge}
                </span>
              </h4>
            </div>

            <button
              type="button"
              onClick={() => {
                // reset template to its default definition
                const original = posterTemplatesLibrary.find((t) => t.id === activeTemplate.id);
                if (original) {
                  onSelectTemplate(JSON.parse(JSON.stringify(original)));
                }
              }}
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة النصوص الافتراضية للقالب</span>
            </button>
          </div>

          {/* Form Controls for Active Template Customization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Tagline & Headlines */}
            <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>العناوين والنصوص البارزة:</span>
              </span>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">شارة التميز العلوية (Badge):</label>
                <input
                  type="text"
                  value={activeTemplate.customization.emphasisBadge}
                  onChange={(e) =>
                    onUpdateCustomization({ emphasisBadge: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">العنوان الرئيسي الجذاب (Hero Tagline):</label>
                <textarea
                  rows={2}
                  value={activeTemplate.customization.heroTagline}
                  onChange={(e) =>
                    onUpdateCustomization({ heroTagline: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">العنوان الفرعي التوضيحي (Sub Tagline):</label>
                <textarea
                  rows={2}
                  value={activeTemplate.customization.subTagline}
                  onChange={(e) =>
                    onUpdateCustomization({ subTagline: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>
            </div>

            {/* Salary Highlight & CTA Customization */}
            <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>الراتب وصندوق طريقة التقديم بالكومنت:</span>
              </span>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">صيغة إبراز الراتب والمزايا:</label>
                <input
                  type="text"
                  value={activeTemplate.customization.highlightSalaryText}
                  onChange={(e) =>
                    onUpdateCustomization({ highlightSalaryText: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">نص دعوة التقديم الرئيسية (CTA Primary):</label>
                <input
                  type="text"
                  value={activeTemplate.customization.ctaPrimaryText}
                  onChange={(e) =>
                    onUpdateCustomization({ ctaPrimaryText: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-medium">ملاحظة المقابلة (Google Meet Notice):</label>
                <input
                  type="text"
                  value={activeTemplate.customization.ctaSecondaryText}
                  onChange={(e) =>
                    onUpdateCustomization({ ctaSecondaryText: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Visibility Toggles for Template Elements */}
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2.5">
            <span className="font-bold text-slate-300 text-xs block mb-1">
              التحكم في ظهور عناصر القالب في التصميم:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={activeTemplate.customization.showLocations}
                  onChange={(e) =>
                    onUpdateCustomization({ showLocations: e.target.checked })
                  }
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>شارات المدن</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={activeTemplate.customization.showTrustYear}
                  onChange={(e) =>
                    onUpdateCustomization({ showTrustYear: e.target.checked })
                  }
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>موثوقية 2012</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={activeTemplate.customization.showPerksGrid}
                  onChange={(e) =>
                    onUpdateCustomization({ showPerksGrid: e.target.checked })
                  }
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>شبكة المزايا</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={activeTemplate.customization.showRequirementsPills}
                  onChange={(e) =>
                    onUpdateCustomization({ showRequirementsPills: e.target.checked })
                  }
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>أهم الشروط</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useApp } from "../context/AppContext";

interface FlowStep {
  number: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

export default function FlowDiagram({ steps }: FlowDiagramProps) {
  const { t } = useApp();

  return (
    <div className="relative">
      <div className="hidden md:flex items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className="w-full max-w-[180px] mx-auto">
                <div className="relative bg-white border-2 border-indigo-100 rounded-2xl p-5 text-center hover:border-indigo-400 hover:shadow-lg transition-all duration-200 group">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto mb-3"
                    style={{ background: "var(--primary)" }}
                  >
                    {step.number}
                  </div>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{t(step.titleHi, step.title)}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t(step.descriptionHi, step.description)}</div>
                </div>
              </div>
            </div>

            {i < steps.length - 1 && (
              <div className="flex items-start pt-12 px-1 flex-shrink-0">
                <div className="flex items-center gap-0">
                  <div className="w-6 h-0.5 bg-indigo-300"></div>
                  <div
                    className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent"
                    style={{ borderLeftColor: "#a5b4fc" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "var(--primary)" }}
              >
                {step.number}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-indigo-200 my-2 min-h-[32px]" />}
            </div>

            <div className={`flex-1 bg-white border border-gray-100 rounded-xl p-4 ${i < steps.length - 1 ? "mb-3" : ""} hover:border-indigo-200 transition-colors`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{step.icon}</span>
                <span className="font-bold text-gray-900 text-sm">{t(step.titleHi, step.title)}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{t(step.descriptionHi, step.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

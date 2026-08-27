import { useApp } from "../context/AppContext";

export interface TimelineEvent {
  stage: string;
  stageHi: string;
  date: string;
  details: string;
  detailsHi: string;
  status: "completed" | "in_progress" | "pending";
  emoji: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const statusConfig = {
  completed: { dot: "bg-indigo-600 border-indigo-600", text: "text-indigo-700", bg: "bg-indigo-50", label: "✓" },
  in_progress: { dot: "bg-amber-500 border-amber-500 animate-pulse", text: "text-amber-700", bg: "bg-amber-50", label: "⟳" },
  pending: { dot: "bg-gray-300 border-gray-300", text: "text-gray-400", bg: "bg-gray-50", label: "○" },
};

export default function Timeline({ events }: TimelineProps) {
  const { t } = useApp();

  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const cfg = statusConfig[event.status];
        const isLast = i === events.length - 1;

        return (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg flex-shrink-0 ${cfg.dot}`}
                style={event.status === "completed" ? { background: "#4F46E5" } : event.status === "in_progress" ? { background: "#F59E0B" } : { background: "#F3F4F6" }}
              >
                <span className="text-base">{event.emoji}</span>
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 my-1 min-h-[24px] ${event.status === "completed" ? "bg-indigo-300" : "bg-gray-200"}`} />
              )}
            </div>

            <div className={`flex-1 pb-6 ${isLast ? "pb-2" : ""}`}>
              <div className={`rounded-xl p-4 ${cfg.bg} border ${event.status === "completed" ? "border-indigo-100" : event.status === "in_progress" ? "border-amber-200" : "border-gray-100"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className={`font-semibold text-sm ${event.status === "pending" ? "text-gray-500" : "text-gray-900"}`}>
                      {t(event.stageHi, event.stage)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {event.date === "NOW" ? t("अभी", "Current") : event.date}
                    </div>
                  </div>
                  {event.status === "in_progress" && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      {t("जारी है", "Active")}
                    </span>
                  )}
                  {event.status === "completed" && (
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      {t("पूर्ण", "Done")}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-2 leading-relaxed ${event.status === "pending" ? "text-gray-400" : "text-gray-600"}`}>
                  {t(event.detailsHi, event.details)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

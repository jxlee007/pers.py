import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { officers } from "../data/mockData";

type ViewMode = "grid" | "list";

export default function Directory() {
  const { t } = useApp();
  const [search, setSearch] = useState("");
  const [filterMinistry, setFilterMinistry] = useState("all");
  const [view, setView] = useState<ViewMode>("grid");

  const ministries = ["all", ...Array.from(new Set(officers.map((o) => o.ministry)))];

  const filtered = useMemo(() => {
    return officers.filter((o) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q || o.name.toLowerCase().includes(q) || o.ministry.toLowerCase().includes(q) || o.department.toLowerCase().includes(q) || o.designation.toLowerCase().includes(q);
      const matchesMinistry = filterMinistry === "all" || o.ministry === filterMinistry;
      return matchesSearch && matchesMinistry;
    });
  }, [search, filterMinistry]);

  const avatarColors = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-blue-500"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("अधिकारी निर्देशिका", "Officer Directory")}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {t("सरकारी अधिकारियों की संपर्क जानकारी", "Contact information for government officials")}{" "}
            <span className="text-indigo-600 font-medium">({filtered.length} {t("अधिकारी", "officers")})</span>
          </p>
        </div>

        {/* Search + filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("नाम, मंत्रालय या विभाग से खोजें...", "Search by name, ministry or department...")}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 transition-colors"
                style={{ fontSize: "16px" }}
              />
            </div>

            {/* Ministry filter */}
            <select
              value={filterMinistry}
              onChange={(e) => setFilterMinistry(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 bg-white"
            >
              {ministries.map((m) => (
                <option key={m} value={m}>{m === "all" ? t("सभी मंत्रालय", "All Ministries") : m}</option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${view === "grid" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                ⊞ {t("ग्रिड", "Grid")}
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${view === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                ☰ {t("सूची", "List")}
              </button>
            </div>
          </div>
        </div>

        {/* Officers */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <div className="font-medium">{t("कोई परिणाम नहीं", "No results found")}</div>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((officer, i) => (
              <div key={officer.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                    {officer.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{officer.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{officer.designation}</div>
                  </div>
                </div>

                {/* Ministry badge */}
                <div className="mb-3">
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100">
                    {officer.ministry}
                  </span>
                </div>

                {/* Department */}
                <div className="text-sm text-gray-600 mb-3 leading-relaxed">{officer.department}</div>

                {/* Address */}
                <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
                  <span className="mt-0.5 flex-shrink-0">📍</span>
                  <span className="leading-relaxed">{officer.address}</span>
                </div>

                {/* Contact */}
                <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                  <a href={`tel:${officer.phone}`} className="flex items-center gap-2 text-sm text-emerald-700 font-medium hover:text-emerald-800">
                    📞 {officer.phone}
                  </a>
                  <a href={`mailto:${officer.email}`} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800 break-all">
                    ✉️ {officer.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {filtered.map((officer, i) => (
              <div key={officer.id} className={`flex items-start gap-4 p-4 sm:p-5 hover:bg-gray-50 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {officer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{officer.name}</div>
                      <div className="text-xs text-gray-500">{officer.designation} · {officer.ministry}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{officer.department}</div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <a href={`tel:${officer.phone}`} className="text-xs text-emerald-700 font-medium hover:text-emerald-800">📞 {officer.phone}</a>
                    <a href={`mailto:${officer.email}`} className="text-xs text-indigo-600 font-medium hover:text-indigo-800">✉️ {officer.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

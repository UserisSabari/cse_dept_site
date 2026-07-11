"use client";

import React, { useState, useMemo } from "react";

const PROGRAMMES = ["BTech", "MTech", "PhD"];
const SEMESTERS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

/**
 * SyllabusBrowserClient
 *
 * Props:
 *   syllabusMap: {
 *     BTech: { "2015": { S1: url, S2: url, ... }, "2019": { ... } },
 *     MTech: { ... },
 *     PhD:   { ... },
 *   }
 */
const SyllabusBrowserClient = ({ syllabusMap }) => {
  const [activeProgramme, setActiveProgramme] = useState("BTech");

  // Sorted years available for the active programme
  const availableYears = useMemo(() => {
    const years = Object.keys(syllabusMap[activeProgramme] || {});
    return years.sort((a, b) => Number(a) - Number(b));
  }, [activeProgramme, syllabusMap]);

  const [activeYear, setActiveYear] = useState(() => availableYears[0] ?? null);

  // Reset year when programme changes
  const handleProgrammeChange = (prog) => {
    setActiveProgramme(prog);
    const years = Object.keys(syllabusMap[prog] || {}).sort(
      (a, b) => Number(a) - Number(b)
    );
    setActiveYear(years[0] ?? null);
  };

  // Map of sem => pdfUrl for the current selection
  const semesterMap = useMemo(() => {
    if (!activeYear) return {};
    return syllabusMap[activeProgramme]?.[activeYear] ?? {};
  }, [activeProgramme, activeYear, syllabusMap]);

  const hasAnyData = PROGRAMMES.some(
    (p) => Object.keys(syllabusMap[p] || {}).length > 0
  );

  return (
    <div className="mt-8 w-full max-w-[390px] lg:pl-16">
      {/* Section heading */}
      <h3 className="font-montserrat text-[13px] font-semibold uppercase tracking-widest text-white/50 mb-4">
        Syllabus
      </h3>

      {!hasAnyData ? (
        <p className="font-montserrat text-sm text-white/40 italic">
          No syllabi uploaded yet.
        </p>
      ) : (
        <>
          {/* Programme segmented control */}
          <div
            className="flex gap-1 bg-white/10 rounded-full p-1 mb-5"
            role="tablist"
            aria-label="Select programme"
          >
            {PROGRAMMES.map((prog) => {
              const hasData = Object.keys(syllabusMap[prog] || {}).length > 0;
              const isActive = prog === activeProgramme;
              return (
                <button
                  key={prog}
                  role="tab"
                  aria-selected={isActive}
                  disabled={!hasData}
                  onClick={() => handleProgrammeChange(prog)}
                  className={[
                    "flex-1 text-center text-[12px] font-semibold font-montserrat py-1.5 px-2 rounded-full transition-all duration-200",
                    isActive
                      ? "bg-white text-black shadow"
                      : "text-white/70 hover:text-white",
                    !hasData && "opacity-30 cursor-not-allowed",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {prog}
                </button>
              );
            })}
          </div>

          {/* Year pills */}
          {availableYears.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Select year">
              {availableYears.map((year) => {
                const isActive = year === activeYear;
                return (
                  <button
                    key={year}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveYear(year)}
                    className={[
                      "px-3 py-1 text-[11px] font-semibold font-montserrat rounded border transition-all duration-200",
                      isActive
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white/60 border-white/30 hover:border-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    {year} Scheme
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="font-montserrat text-sm text-white/40 italic mb-6">
              No syllabus uploaded for {activeProgramme} yet.
            </p>
          )}

          {/* Semester grid 2x4 */}
          {activeYear && (
            <div
              className="grid grid-cols-4 gap-2"
              role="group"
              aria-label={`${activeProgramme} ${activeYear} semester downloads`}
            >
              {SEMESTERS.map((sem) => {
                const pdfUrl = semesterMap[sem];
                const hasFile = Boolean(pdfUrl);
                return hasFile ? (
                  <a
                    key={sem}
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Download ${activeProgramme} ${activeYear} ${sem} syllabus`}
                    className="group relative flex flex-col items-center justify-center gap-1 bg-white/10 hover:bg-white text-white hover:text-black rounded py-3 text-[13px] font-bold font-montserrat transition-all duration-200 cursor-pointer"
                  >
                    <span>{sem}</span>
                    <svg
                      className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                  </a>
                ) : (
                  <div
                    key={sem}
                    title="Syllabus not uploaded yet"
                    aria-disabled="true"
                    className="flex flex-col items-center justify-center gap-1 bg-white/5 rounded py-3 text-[13px] font-bold font-montserrat text-white/25 cursor-not-allowed select-none"
                  >
                    <span>{sem}</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SyllabusBrowserClient;

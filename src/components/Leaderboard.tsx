import React, { useEffect, useState } from "react";

interface GangData {
  [key: string]: string | number;
}

export default function Leaderboard() {
  const [gangs, setGangs] = useState<GangData[]>([]);
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xiYNiWQcKMZoFWNIegC2z1B04UjqRLNVE2Tlyxh43ew9a_UkDegQEPu2Qph_8q1cnd61QeMDnHK5/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const [headerLine, ...lines] = csvText.trim().split("\n");
        const headers = headerLine.split(",").map((h) => h.trim());
        const data = lines.map((line) => {
          const values = line.split(",");
          const item: GangData = {};
          headers.forEach((h, idx) => {
            const raw = values[idx];
            item[h] = isNaN(+raw) ? raw : +raw;
          });
          return item;
        });

        const sorted = data.sort((a, b) => (b["Points"] as number) - (a["Points"] as number));
        setGangs(sorted);
      });
  }, []);

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-5xl font-extrabold text-center text-white mb-10">Gang Wars Leaderboard</h1>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="flex justify-between bg-gray-800 py-4 px-6 font-bold text-gray-300 uppercase tracking-wide text-lg">
          <span>Gang Name</span>
          <span>Points</span>
        </div>
        {gangs.map((gang, index) => (
          <div
            key={index}
            className={`flex justify-between py-4 px-6 ${
              index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
            } text-white text-lg`}
          >
            <span className="font-medium">{gang["Gang Name"]}</span>
            <span className="font-semibold">{gang["Points"]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
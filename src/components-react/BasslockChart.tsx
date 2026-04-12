import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface BasslockChartProps {
  lang: "es" | "en";
}

const chartData = [
  { freq: "63",    convencional: 13.8, basslockA: 6.6,  basslockB: 9.4 },
  { freq: "80",    convencional: 16.4, basslockA: 26.7, basslockB: 16.2 },
  { freq: "100",   convencional: 17.4, basslockA: 28.4, basslockB: 19.9 },
  { freq: "125",   convencional: 15,   basslockA: 26.9, basslockB: 20.6 },
  { freq: "160",   convencional: 14.8, basslockA: 33.3, basslockB: 27.9 },
  { freq: "200",   convencional: 17,   basslockA: 31.4, basslockB: 30.3 },
  { freq: "250",   convencional: 22.5, basslockA: 32.5, basslockB: 32 },
  { freq: "315",   convencional: 26.4, basslockA: 34.9, basslockB: 30.1 },
  { freq: "400",   convencional: 31.1, basslockA: 31.1, basslockB: 24.1 },
  { freq: "500",   convencional: 34.7, basslockA: 30.6, basslockB: 23.6 },
  { freq: "630",   convencional: 37.1, basslockA: 27.6, basslockB: 19.3 },
  { freq: "800",   convencional: 40,   basslockA: 24.6, basslockB: 17.2 },
  { freq: "1k",    convencional: 43.3, basslockA: 22.7, basslockB: 17.9 },
  { freq: "1.25k", convencional: 43.7, basslockA: 26.8, basslockB: 20.4 },
  { freq: "1.6k",  convencional: 47,   basslockA: 24.9, basslockB: 20.3 },
  { freq: "2k",    convencional: 50.1, basslockA: 22.9, basslockB: 19 },
  { freq: "2.5k",  convencional: 51.2, basslockA: 24.3, basslockB: 17.8 },
  { freq: "3.15k", convencional: 50.4, basslockA: 24.8, basslockB: 19.6 },
  { freq: "4k",    convencional: 48.5, basslockA: 26.8, basslockB: 21.3 },
  { freq: "5k",    convencional: 46.5, basslockA: 27.6, basslockB: 22 },
];

const texts = {
  es: {
    chartTitle: "Comparativa de aislamiento acústico",
    chartSubtitle: "Atenuación (dB) por banda de frecuencia — panel convencional vs. modelos Basslock®",
    chartNote: "Datos orientativos basados en ensayos en cámara acústica. Los valores reales pueden variar según configuración.",
    tooltipLabels: { convencional: "Panel convencional", basslockA: "Basslock® Modelo A", basslockB: "Basslock® Modelo B" },
    xAxisLabel: "Frecuencia (Hz)",
  },
  en: {
    chartTitle: "Acoustic insulation comparison",
    chartSubtitle: "Attenuation (dB) by frequency band — conventional panel vs. Basslock® models",
    chartNote: "Indicative data based on acoustic chamber tests. Actual values may vary depending on configuration.",
    tooltipLabels: { convencional: "Conventional panel", basslockA: "Basslock® Model A", basslockB: "Basslock® Model B" },
    xAxisLabel: "Frequency (Hz)",
  },
};

export default function BasslockChart({ lang }: BasslockChartProps) {
  const t = texts[lang];

  return (
    <div className="mt-12 border border-bl-blue/10 bg-white p-6 lg:p-8">
      <h3 className="font-mono text-xs tracking-wider text-bl-blue/70 uppercase mb-1">
        {t.chartTitle}
      </h3>
      <p className="text-sm text-bl-blue/75 mb-6">{t.chartSubtitle}</p>
      <div className="w-full h-[340px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 40% 30% / 0.08)" />
            <XAxis
              dataKey="freq"
              tick={{ fontSize: 11, fill: "hsl(215 40% 30% / 0.5)", fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={{ stroke: "hsl(215 40% 30% / 0.15)" }}
              tickLine={false}
              label={{
                value: t.xAxisLabel,
                position: "insideBottom",
                offset: -2,
                style: { fontSize: 11, fill: "hsl(215 40% 30% / 0.4)", fontFamily: "'JetBrains Mono', monospace" },
              }}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tick={{ fontSize: 11, fill: "hsl(215 40% 30% / 0.5)", fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={{ stroke: "hsl(215 40% 30% / 0.15)" }}
              tickLine={false}
              label={{
                value: "dB",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fontSize: 11, fill: "hsl(215 40% 30% / 0.4)", fontFamily: "'JetBrains Mono', monospace" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(215 40% 18%)",
                border: "1px solid hsl(215 40% 30% / 0.3)",
                borderRadius: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#fff",
              }}
              labelStyle={{ color: "hsl(75 85% 60%)", fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: "#fff", padding: "2px 0" }}
              formatter={(value: number, name: string) => [
                `${value} dB`,
                t.tooltipLabels[name as keyof typeof t.tooltipLabels] || name,
              ]}
              labelFormatter={(label) => `${label} Hz`}
            />
            <Legend
              formatter={(value: string) => {
                const text = t.tooltipLabels[value as keyof typeof t.tooltipLabels] || value;
                return (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "hsl(215 40% 30% / 0.7)" }}>
                    {text}
                  </span>
                );
              }}
              iconType="plainline"
              wrapperStyle={{ paddingTop: 12 }}
            />
            <Line
              type="monotone"
              dataKey="convencional"
              stroke="hsl(75 85% 60%)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "hsl(75 85% 60%)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "hsl(75 85% 60%)", strokeWidth: 2, stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="basslockA"
              stroke="hsl(215 40% 30%)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "hsl(215 40% 30%)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "hsl(215 40% 30%)", strokeWidth: 2, stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="basslockB"
              stroke="hsl(178 100% 67%)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "hsl(178 100% 67%)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "hsl(178 100% 67%)", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs text-bl-blue/70 font-mono">{t.chartNote}</p>
    </div>
  );
}

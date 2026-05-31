import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Calculator,
  Boxes,
  Weight,
  Clock,
  Wrench,
  Sparkles,
  Percent,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

/**
 * Material presets with a typical price per kilogram (EUR).
 * Prices are editable in the UI — these are just sensible starting points.
 */
const MATERIAL_PRESETS = [
  { id: 'pla', name: 'PLA', pricePerKg: 22 },
  { id: 'petg', name: 'PETG', pricePerKg: 26 },
  { id: 'abs', name: 'ABS', pricePerKg: 25 },
  { id: 'tpu', name: 'TPU (Flexible)', pricePerKg: 38 },
  { id: 'nylon', name: 'Nylon', pricePerKg: 55 },
  { id: 'resin', name: 'Resin', pricePerKg: 45 },
  { id: 'custom', name: 'Custom', pricePerKg: 30 },
] as const;

const eur = (value: number) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

/** A labelled numeric input styled to match the dark/cyan theme. */
const NumberField = ({
  label,
  value,
  onChange,
  icon,
  min = 0,
  step = 1,
  suffix,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
  min?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
}) => (
  <label className="block">
    <span className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
      {icon}
      {label}
    </span>
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-white/40 text-sm pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => {
          const next = parseFloat(e.target.value);
          onChange(Number.isNaN(next) ? 0 : Math.max(min, next));
        }}
        className={`w-full bg-white/5 border border-white/10 rounded-xl py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-cyan/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)] ${
          prefix ? 'pl-8' : 'pl-3'
        } ${suffix ? 'pr-12' : 'pr-3'}`}
      />
      {suffix && (
        <span className="absolute right-3 text-white/40 text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

const PriceCalculator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // --- Inputs -------------------------------------------------------------
  const [materialId, setMaterialId] = useState<string>('pla');
  const [pricePerKg, setPricePerKg] = useState<number>(22);
  const [weight, setWeight] = useState<number>(50); // grams
  const [wastePct, setWastePct] = useState<number>(5); // % material waste

  const [printHours, setPrintHours] = useState<number>(3);
  const [printMinutes, setPrintMinutes] = useState<number>(30);
  const [machineRate, setMachineRate] = useState<number>(1.5); // €/hour (energy + wear)

  const [labourMinutes, setLabourMinutes] = useState<number>(20); // setup + post-processing
  const [labourRate, setLabourRate] = useState<number>(20); // €/hour

  const [finishing, setFinishing] = useState<number>(0); // flat add-on cost
  const [markupPct, setMarkupPct] = useState<number>(50); // profit margin %
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMaterialChange = (id: string) => {
    setMaterialId(id);
    const preset = MATERIAL_PRESETS.find((m) => m.id === id);
    if (preset && id !== 'custom') setPricePerKg(preset.pricePerKg);
  };

  // --- Calculation --------------------------------------------------------
  const result = useMemo(() => {
    const printTimeHours = printHours + printMinutes / 60;
    const effectiveWeight = weight * (1 + wastePct / 100);
    const materialCost = (effectiveWeight / 1000) * pricePerKg;
    const machineCost = printTimeHours * machineRate;
    const labourCost = (labourMinutes / 60) * labourRate;

    const unitCost = materialCost + machineCost + labourCost + finishing;
    const markupAmount = unitCost * (markupPct / 100);
    const unitPrice = unitCost + markupAmount;

    const qty = Math.max(1, Math.round(quantity));
    const totalPrice = unitPrice * qty;
    const totalCost = unitCost * qty;

    return {
      materialCost,
      machineCost,
      labourCost,
      finishing,
      unitCost,
      markupAmount,
      unitPrice,
      qty,
      totalCost,
      totalPrice,
      totalProfit: totalPrice - totalCost,
    };
  }, [
    pricePerKg,
    weight,
    wastePct,
    printHours,
    printMinutes,
    machineRate,
    labourMinutes,
    labourRate,
    finishing,
    markupPct,
    quantity,
  ]);

  const breakdown = [
    { label: 'Material', value: result.materialCost, color: 'text-cyan' },
    { label: 'Machine & energy', value: result.machineCost, color: 'text-cyan' },
    { label: 'Labour', value: result.labourCost, color: 'text-cyan' },
    { label: 'Finishing', value: result.finishing, color: 'text-cyan' },
  ];

  const handleCopy = async () => {
    const material =
      MATERIAL_PRESETS.find((m) => m.id === materialId)?.name ?? 'Custom';
    const summary = [
      '3DPrint Galway — Price Estimate',
      '--------------------------------',
      `Material:        ${material} (${eur(pricePerKg)}/kg)`,
      `Weight:          ${weight} g (+${wastePct}% waste)`,
      `Print time:      ${printHours}h ${printMinutes}m`,
      '',
      `Material cost:   ${eur(result.materialCost)}`,
      `Machine cost:    ${eur(result.machineCost)}`,
      `Labour cost:     ${eur(result.labourCost)}`,
      `Finishing:       ${eur(result.finishing)}`,
      `Unit cost:       ${eur(result.unitCost)}`,
      `Markup (${markupPct}%):    ${eur(result.markupAmount)}`,
      `Price per unit:  ${eur(result.unitPrice)}`,
      '',
      `Quantity:        ${result.qty}`,
      `TOTAL:           ${eur(result.totalPrice)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const handleReset = () => {
    setMaterialId('pla');
    setPricePerKg(22);
    setWeight(50);
    setWastePct(5);
    setPrintHours(3);
    setPrintMinutes(30);
    setMachineRate(1.5);
    setLabourMinutes(20);
    setLabourRate(20);
    setFinishing(0);
    setMarkupPct(50);
    setQuantity(1);
  };

  return (
    <section
      id="calculator"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Instant Pricing
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            Price <span className="text-gradient">Calculator</span>
          </h2>
          <p
            className={`text-white/50 text-lg max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '160ms' }}
          >
            Estimate the cost of any 3D print. Adjust material, time, labour and
            margin to get an instant quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* ---- Inputs ---- */}
          <div
            className={`lg:col-span-3 glass-card p-6 lg:p-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Material */}
            <div className="mb-8">
              <span className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
                <Boxes className="w-4 h-4 text-cyan" />
                Material
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {MATERIAL_PRESETS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMaterialChange(m.id)}
                    className={`filter-btn ${
                      materialId === m.id
                        ? 'filter-btn-active'
                        : 'filter-btn-inactive'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberField
                  label="Price per kg"
                  value={pricePerKg}
                  onChange={(v) => {
                    setPricePerKg(v);
                    setMaterialId('custom');
                  }}
                  prefix="€"
                  step={0.5}
                  icon={<Weight className="w-4 h-4 text-cyan" />}
                />
                <NumberField
                  label="Material waste"
                  value={wastePct}
                  onChange={setWastePct}
                  suffix="%"
                  step={1}
                  icon={<Percent className="w-4 h-4 text-cyan" />}
                />
              </div>
            </div>

            {/* Weight & print time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <NumberField
                label="Print weight"
                value={weight}
                onChange={setWeight}
                suffix="g"
                step={1}
                icon={<Weight className="w-4 h-4 text-cyan" />}
              />
              <NumberField
                label="Print time (hrs)"
                value={printHours}
                onChange={setPrintHours}
                suffix="h"
                step={1}
                icon={<Clock className="w-4 h-4 text-cyan" />}
              />
              <NumberField
                label="Print time (min)"
                value={printMinutes}
                onChange={setPrintMinutes}
                suffix="m"
                step={5}
                min={0}
                icon={<Clock className="w-4 h-4 text-cyan" />}
              />
            </div>

            {/* Machine & labour */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <NumberField
                label="Machine rate (energy + wear)"
                value={machineRate}
                onChange={setMachineRate}
                prefix="€"
                suffix="/h"
                step={0.25}
                icon={<Sparkles className="w-4 h-4 text-cyan" />}
              />
              <NumberField
                label="Labour rate"
                value={labourRate}
                onChange={setLabourRate}
                prefix="€"
                suffix="/h"
                step={1}
                icon={<Wrench className="w-4 h-4 text-cyan" />}
              />
              <NumberField
                label="Labour time (setup + finishing)"
                value={labourMinutes}
                onChange={setLabourMinutes}
                suffix="m"
                step={5}
                icon={<Wrench className="w-4 h-4 text-cyan" />}
              />
              <NumberField
                label="Extra finishing / consumables"
                value={finishing}
                onChange={setFinishing}
                prefix="€"
                step={0.5}
                icon={<Sparkles className="w-4 h-4 text-cyan" />}
              />
            </div>

            {/* Markup & quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="flex items-center justify-between text-sm font-medium text-white/70 mb-2">
                  <span className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-cyan" />
                    Markup / margin
                  </span>
                  <span className="text-cyan font-semibold">{markupPct}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={5}
                  value={markupPct}
                  onChange={(e) => setMarkupPct(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-cyan mt-3"
                />
              </div>
              <NumberField
                label="Quantity"
                value={quantity}
                onChange={setQuantity}
                min={1}
                step={1}
                suffix="pcs"
                icon={<Boxes className="w-4 h-4 text-cyan" />}
              />
            </div>
          </div>

          {/* ---- Result ---- */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            <div className="glass-card p-6 lg:p-8 lg:sticky lg:top-24 border-cyan/20 shadow-glow">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan" />
                Estimate
              </h3>

              {/* Cost breakdown */}
              <div className="space-y-3 mb-6">
                {breakdown.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/60">{row.label}</span>
                    <span className="text-white font-medium">
                      {eur(row.value)}
                    </span>
                  </div>
                ))}

                <div className="h-px bg-white/10 my-2" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Unit cost</span>
                  <span className="text-white font-medium">
                    {eur(result.unitCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Markup ({markupPct}%)</span>
                  <span className="text-cyan font-medium">
                    +{eur(result.markupAmount)}
                  </span>
                </div>
              </div>

              {/* Headline price per unit */}
              <div className="rounded-2xl bg-cyan/10 border border-cyan/20 p-5 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-white/70 text-sm">Price per unit</span>
                  <span className="text-2xl font-bold text-white">
                    {eur(result.unitPrice)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-2xl bg-gradient-to-r from-cyan to-cyan-dark p-5 mb-6 text-dark">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-dark/70 text-sm block">
                      Total ({result.qty} {result.qty === 1 ? 'piece' : 'pieces'})
                    </span>
                    <span className="text-dark/60 text-xs">
                      Profit {eur(result.totalProfit)}
                    </span>
                  </div>
                  <span className="text-3xl font-extrabold">
                    {eur(result.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy quote
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm px-4"
                  aria-label="Reset calculator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-white/30 text-xs mt-4 text-center">
                Estimate only — final quotes may vary with design complexity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;

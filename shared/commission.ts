/**
 * HAMZURY Commission Structure v1.0
 *
 * Total Revenue splits into:
 * - Staff Commission Pool: 40%
 * - Institutional Allocation: 60%
 *
 * Staff Pool (40%) — 5-tier breakdown:
 *   Tier 1: Dept Lead                 10% of pool = 4% of revenue
 *   Tier 2: Support Layer             20% of pool = 8% of revenue
 *     └─ CEO                          10% of pool = 4% of revenue
 *     └─ Finance                       5% of pool = 2% of revenue
 *     └─ HR                            5% of pool = 2% of revenue
 *   Tier 3: Execution Team            40% of pool = 16% of revenue (split by effort %)
 *   Tier 4: Facilities                 5% of pool = 2% of revenue
 *   Tier 5: Lead Gen + Conversion     25% of pool = 10% of revenue
 *     └─ Lead Generator (BizDev)     12.5% of pool = 5% of revenue
 *     └─ Converter (CSO)             12.5% of pool = 5% of revenue
 *
 * Institutional (60%):
 *   Reinvestment (Dept)               25% of revenue
 *   Savings                           10% of revenue
 *   Founder                            5% of revenue
 *   Emergency Fund                     2% of revenue
 *   RIDI Charity                       3% of revenue
 *   Shareholders                       5% of revenue
 */

export interface CommissionBreakdown {
  quotedPrice: number;
  staffPool: number;          // 40% of revenue
  institutionalAmount: number; // 60% of revenue (kept for DB field compat — now represents institutional)
  commissionPool: number;     // alias for staffPool (kept for backwards compat)
  tiers: {
    // Tier 1
    deptLead: number;         // 10% of pool = 4% of revenue
    // Tier 2
    ceo: number;              // 10% of pool = 4% of revenue
    finance: number;          // 5% of pool = 2% of revenue
    hr: number;               // 5% of pool = 2% of revenue
    // Tier 3
    execution: number;        // 40% of pool = 16% of revenue
    // Tier 4
    facilities: number;       // 5% of pool = 2% of revenue
    // Tier 5
    leadGenerator: number;    // 12.5% of pool = 5% of revenue
    converter: number;        // 12.5% of pool = 5% of revenue
  };
  institutional: {
    reinvestment: number;     // 25% of revenue
    savings: number;          // 10% of revenue
    founder: number;          // 5% of revenue
    emergency: number;        // 2% of revenue
    ridi: number;             // 3% of revenue
    shareholders: number;     // 5% of revenue
  };
  validation: {
    staffPoolTotal: number;
    institutionalTotal: number;
    grandTotal: number;
    isValid: boolean;
  };
}

export function calculateCommission(quotedPrice: number): CommissionBreakdown {
  const pool = round2(quotedPrice * 0.40);   // Staff Pool = 40%
  const institutional = round2(quotedPrice * 0.60); // Institutional = 60%

  return {
    quotedPrice,
    staffPool: pool,
    institutionalAmount: institutional,
    commissionPool: pool, // backwards compat alias

    tiers: {
      deptLead:      round2(pool * 0.10),   // 4% of revenue
      ceo:           round2(pool * 0.10),   // 4% of revenue
      finance:       round2(pool * 0.05),   // 2% of revenue
      hr:            round2(pool * 0.05),   // 2% of revenue
      execution:     round2(pool * 0.40),   // 16% of revenue
      facilities:    round2(pool * 0.05),   // 2% of revenue
      leadGenerator: round2(pool * 0.125),  // 5% of revenue
      converter:     round2(pool * 0.125),  // 5% of revenue
    },

    institutional: {
      reinvestment: round2(quotedPrice * 0.25),
      savings:      round2(quotedPrice * 0.10),
      founder:      round2(quotedPrice * 0.05),
      emergency:    round2(quotedPrice * 0.02),
      ridi:         round2(quotedPrice * 0.03),
      shareholders: round2(quotedPrice * 0.05),
    },

    validation: {
      staffPoolTotal: pool,
      institutionalTotal: institutional,
      grandTotal: round2(pool + institutional),
      isValid: Math.abs((pool + institutional) - quotedPrice) < 1,
    },
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Format a number as Nigerian Naira.
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Split the execution pool by effort percentages.
 * efforts: array of { name, effortPct } where sum of effortPct must equal 100
 */
export function splitExecution(executionTotal: number, efforts: { name: string; effortPct: number }[]) {
  return efforts.map(e => ({
    name: e.name,
    effortPct: e.effortPct,
    amount: round2(executionTotal * (e.effortPct / 100)),
  }));
}

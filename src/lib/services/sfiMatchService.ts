export interface SfiSchemeRecord {
  id: string;
  scheme_code: string;
  name: string;
  description: string;
  category: string;
  payment_rate: string;
  scheme_year: number;
  land_use_types: string[];
}

export interface SfiActionMatch {
  scheme: SfiSchemeRecord;
  matchingFields: {
    fieldId: string;
    fieldName: string;
    landUse: string;
    areaHectares: number;
  }[];
  totalEligibleHectares: number;
  estimatedAnnualValue: string;
  advisoryNote: string;
}

/**
 * Cross-references a farm's field parcels against official SFI schemes reference data.
 * Outputs strictly advisory eligibility notices ("may be relevant to your land, confirm on GOV.UK").
 */
export function matchSfiActionsForFields(
  fields: { id: string; name: string; current_use?: string | null; area_hectares: number }[],
  schemes: SfiSchemeRecord[]
): SfiActionMatch[] {
  const matches: SfiActionMatch[] = [];

  for (const scheme of schemes) {
    const matchingFields = fields.filter((f) => {
      const fieldUse = (f.current_use || "").toLowerCase();
      return scheme.land_use_types.some((allowed) =>
        fieldUse.includes(allowed.toLowerCase())
      );
    });

    if (matchingFields.length > 0) {
      const totalHa = matchingFields.reduce((sum, f) => sum + (f.area_hectares || 0), 0);
      
      let estValue = "Variable payment";
      if (scheme.payment_rate.includes("£382")) {
        estValue = `£${Math.round(totalHa * 382).toLocaleString()}/yr`;
      } else if (scheme.payment_rate.includes("£853")) {
        estValue = `£${Math.round(totalHa * 853).toLocaleString()}/yr`;
      } else if (scheme.payment_rate.includes("£989")) {
        estValue = "£989/yr (Holding Base)";
      } else if (scheme.payment_rate.includes("£652")) {
        estValue = "£652/yr (Holding Base)";
      }

      matches.push({
        scheme,
        matchingFields: matchingFields.map((f) => ({
          fieldId: f.id,
          fieldName: f.name,
          landUse: f.current_use || "General",
          areaHectares: f.area_hectares,
        })),
        totalEligibleHectares: totalHa,
        estimatedAnnualValue: estValue,
        advisoryNote: `Advisory indication only: ${scheme.name} (${scheme.scheme_code}) aligns with your ${matchingFields.length} registered parcel(s). Please verify full Defra eligibility criteria on GOV.UK before applying.`,
      });
    }
  }

  return matches;
}

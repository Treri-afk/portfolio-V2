/**
 * Plain values shared by schemas and UI. No Zod here: client code imports this module
 * (`@portfolio/contracts/constants`) without pulling the validation library into the bundle.
 */
export const projectPhases = ['market', 'brand', 'product', 'code', 'production', 'operations'] as const;

export const technologyCategories = ['frontend', 'backend', 'data', 'devops', 'design'] as const;

export const sectionKinds = ['context', 'problem', 'role', 'approach', 'architecture', 'results', 'learnings'] as const;

export const contactLimits = {
  name: { max: 120 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

/** Lengths of the challenge and decision lines (featured blocks and case studies). */
export const decisionLimits = { challenge: 140, decision: 220 } as const;

/** Focal point of a cropped image, in percent of its width and height. */
export const focalPoint = { min: 0, max: 100, center: 50 } as const;

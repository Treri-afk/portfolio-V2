/** Keeps projects using every selected technology (AND), so a recruiter can ask "React and PostgreSQL". */
export function filterProjects<T extends { technologies: readonly { slug: string }[] }>(projects: readonly T[], selected: readonly string[]): T[] {
  return projects.filter((project) => selected.every((slug) => project.technologies.some((technology) => technology.slug === slug)));
}

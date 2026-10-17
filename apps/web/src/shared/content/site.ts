const email = 'paulabraham.froitier@gmail.com';
const githubUrl = 'https://github.com/Treri-afk';
const repoUrl = 'https://github.com/Treri-afk/portfolio-V2';
const emailLink = { to: `mailto:${email}`, label: email, icon: 'mail' } as const;

export const site = {
  name: 'Paul-Abraham Froitier',
  role: 'Développeur full stack',
  email,
  githubUrl,
  repoUrl,
  /** Fixed at build time: a runtime clock would differ between the prerendered HTML and hydration. */
  copyrightYear: 2026,
  emailLink,
  directLinks: [
    emailLink,
    { to: githubUrl, label: 'GitHub', icon: 'github' },
  ],
  sourceLink: { to: repoUrl, label: 'Code source du site', icon: 'arrow-up-right' },
} as const;

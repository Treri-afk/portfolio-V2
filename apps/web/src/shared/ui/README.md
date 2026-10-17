# shared/ui — inventaire

Une ligne par composant. Avant d'en créer un : chercher ici, puis ajouter une variante typée si l'existant couvre 80 % du besoin.

| Composant | Responsabilité | Variantes |
|---|---|---|
| Container | largeur max et gouttières | `size` : text · content · wide |
| Stack | empilement ou ligne à espacement tokenisé (aussi en `ul`) | `direction`, `gap`, `align` : start · center, `wrap` |
| Grid | grille responsive | `variant` : cards · split · pillars |
| Slice | seule découpe inclinée de la page (`clip-path` + `tan()`) | `tone` : base · sunken · inverse ; `angleTop`, `angleBottom`, `elevated` |
| Text | tout texte : famille, taille, graisse, largeur, interlignage, approche | `variant` (display-xl → eyebrow), `tone` |
| Heading | titre ; niveau sémantique découplé de la taille | `level` 1–4 (`SubHeadingLevel` 2–4 pour les composants internes), `size` |
| Eyebrow | surtitre mono en capitales | `tone` |
| Prose | Markdown sûr (rehype-sanitize, liens via Link) | — |
| Link | lien interne (View Transition) ou externe (https/mailto, `rel` imposé), option `stretched` pour une carte cliquable | `variant` : inline · nav · standalone · file · primary · secondary |
| LinkList | liste de liens d'action avec icône (contact, profils) | `direction` : row · column |
| SectionHeading | surtitre + titre de section (h2) avec id | — |
| Button | bouton natif, styles partagés avec Link (`action/`) | `variant` : primary · secondary · ghost |
| Media | image cadrée, point focal, priorité LCP, nom de transition, révélation au scroll | `ratio` : square · portrait · landscape · naturel |
| TagList / TagGroup | étiquettes statiques / sélection multiple accessible | — |
| Metric | chiffre clé, unité, libellé, source | `size` : md · lg |
| FactList | liste terme/description `<dl>` (fiche projet, défi/décision) | `variant` : sheet · decision |
| NumberedList | étapes numérotées 01, 02… | `headingLevel` |
| TextField | champ libellé, description, erreur (React Aria) | `multiline`, `type` |
| Notice | message de statut annoncé | `tone` : success · danger |
| Icon | jeu fermé de pictos SVG | `name`, `size` |
| SlantRule | seul trait incliné : court filet d'accent décoratif | — |
| SkipLink | lien d'évitement | — |
| VisuallyHidden | texte pour lecteurs d'écran | — |
| accentBarClass | classe : barre d'accent qui se dessine sur le filet supérieur au survol | — |

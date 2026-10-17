import { contactLimits as limits } from '@portfolio/contracts/constants';

const count = (value: number): string => value.toLocaleString('fr-FR');

export const contact = {
  eyebrow: 'Contact',
  title: 'Parlons de votre projet.',
  lead: 'Pour un poste, précisez la ville et le type de contrat. Pour une mission, le délai et le budget.',
  directTitle: 'En direct',
  form: {
    label: 'Formulaire de contact',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    messageHint: `${count(limits.message.min)} caractères minimum.`,
    honeypot: 'Ne pas remplir ce champ',
    submit: 'Envoyer',
    pending: 'Envoi…',
    success: 'Message envoyé. Merci, je reviens vers vous rapidement.',
    invalid: 'Vérifiez les champs signalés.',
    unavailable: 'L’envoi n’est pas disponible pour le moment. Écrivez-moi directement par e-mail.',
    errors: {
      name: `Indiquez votre nom (${count(limits.name.max)} caractères au plus).`,
      email: 'Indiquez une adresse e-mail valide.',
      message: `Votre message doit compter entre ${count(limits.message.min)} et ${count(limits.message.max)} caractères.`,
      website: 'Envoi refusé.',
    },
  },
} as const;

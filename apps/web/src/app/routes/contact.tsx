import { submitContact } from '../../features/contact-form/index.ts';
import { ContactPage } from '../../pages/contact/index.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/contact';

export async function clientAction({ request }: Route.ClientActionArgs) {
  return submitContact(await request.formData());
}

export const meta: Route.MetaFunction = ({ location }) => buildMeta({ ...seo.pages.contact, path: location.pathname });

export default function Contact({ actionData }: Route.ComponentProps) {
  return <ContactPage result={actionData} />;
}

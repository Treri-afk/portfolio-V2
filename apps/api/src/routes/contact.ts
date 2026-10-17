import { Hono } from 'hono';
import type { ContactDeps } from '../handlers/contactDeps.ts';
import { postContact } from '../handlers/postContact.ts';

export const contactRoute = (deps: ContactDeps) => new Hono().post('/', postContact(deps));

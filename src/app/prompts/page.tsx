import { redirect } from 'next/navigation';

/** Legacy route — scene + magic merged at /scenes */
export default function PromptsRedirectPage() {
  redirect('/scenes');
}

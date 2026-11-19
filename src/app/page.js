import AnaSayfa from '@/components/AnaSayfa';
import { sayfaMeta } from '@/lib/site';

export const metadata = sayfaMeta('/');

export default function Page() {
  return <AnaSayfa />;
}

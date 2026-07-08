import { HomePage } from '../_components/home-page';
import { RestoreRecipientRedirect } from '../_components/recipient/recipient-session';

export default function Home() {
  return (
    <>
      <RestoreRecipientRedirect />
      <HomePage />
    </>
  );
}

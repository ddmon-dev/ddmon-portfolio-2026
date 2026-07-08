import { HomePage } from '../_components/home-page';
import { RestoreGreetingRedirect } from '../_components/greeting-session';

export default function Home() {
  return (
    <>
      <RestoreGreetingRedirect />
      <HomePage />
    </>
  );
}

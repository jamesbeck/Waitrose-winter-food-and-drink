import { getLoggedInEmail } from '@/lib/auth';

export default function Home() {
  const email = getLoggedInEmail();

  return (
    <div>
      <h1>Logged in as {email}</h1>

      <div className="bg-waitrose-red w-full h-20"></div>
      <div className="bg-waitrose-brown w-full h-20"></div>
      <div className="bg-waitrose-beige w-full h-20"></div>
      <div className="bg-waitrose-lime w-full h-20"></div>
      <div className="bg-waitrose-green w-full h-20"></div>
    </div>
  );
}

import Image from "next/image";

export default function Profile() {
  return (
    <main className="min-h-screen max-w-xl mx-auto">
      <h1>Profile</h1>
      <Image src="/profile.jpg" alt="Profile" width={200} height={200} />
      
    </main>
  );
}

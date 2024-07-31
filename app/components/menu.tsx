"use client";

function MenuItem({ label, link }: { label: string; link: string }) {
  return <div className="hover:text-white cursor-pointer ">{label}</div>;
}

export default function Menu() {
  return (
    <div className="text-gold flex space-x-4 justify-center">
      <MenuItem label="Matchmaker" link="/" />
      <MenuItem label="Venue" link="/" />
      <MenuItem label="Products" link="/" />
    </div>
  );
}

'use client';

import { useRouter, usePathname } from "next/navigation";

export default function BackspacePage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="p-2 uppercase font-extrabold italic">
            {/* {pathname.replace(/^(\/)(.*)/g,'$2')} */}
            Page {pathname.split('/').reverse()[0]}
        </div>
        <div
          onClick={() => router.back()}
          className="border p-2 italic uppercase font-extrabold rounded-sm cursor-pointer hover:bg-gray-100 hover:text-black transition"
        >
          back
        </div>
      </div>
    </section>
  );
}

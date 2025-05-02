// app/exemplo/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ExemploClientPage() {
  const [contador, setContador] = useState(0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Página Client-side</h1>

      <p>Contador: {contador}</p>

      <Button onClick={() => setContador((c) => c + 1)}>
        Incrementar
      </Button>
    </div>
  );
}

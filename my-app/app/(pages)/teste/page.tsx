'use client'
import Link from "next/link"; 
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";

const x = [
  'thiago',
  'bruno'
]

// useState     useEffect  useActionState 
export default function LandinPage(){
  const [state, setstate]= useState('suco')
  
  return (
    <section>
      <h1>{state}</h1>
    </section>
  )
}

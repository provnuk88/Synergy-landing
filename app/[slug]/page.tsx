"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-[#DCEFFF] capitalize">{params.slug.replace(/-/g, " ")}</h1>
        <p className="text-[#DCEFFF]/70">This page is under construction.</p>
        <Button
          asChild
          className="bg-gradient-to-r from-[#274B75] to-[#499FFF] hover:from-[#499FFF] hover:to-[#274B75] text-white"
        >
          <Link href="/">Back to Main</Link>
        </Button>
      </div>
    </div>
  )
}

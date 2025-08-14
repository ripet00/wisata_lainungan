"use client"

import dynamic from "next/dynamic";

const AdminDestinationManager = dynamic(() => import("@/components/admin/AdminDestinationManager"), {
  ssr: false,
});

export default function DestinationPage() {
  return <AdminDestinationManager />;
}

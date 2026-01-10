import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound(); // 💡 强制触发同级或上级的 not-found.tsx
}

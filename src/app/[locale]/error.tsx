"use client";

import ErrorComponent from "../../components/common/error-comopnent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <ErrorComponent>{error.message}</ErrorComponent>

      <button className="mt-8" onClick={reset}>
        Try again
      </button>
    </main>
  );
}

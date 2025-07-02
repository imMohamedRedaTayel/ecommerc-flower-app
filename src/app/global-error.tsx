"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        {/* Error message */}
        <main className="h-screen flex flex-col items-center justify-center text-2xl text-red-500">
          ERROR! {error.message}
        </main>

        {/* Try again button */}
        <button
          className="px-6 by-3 p-5 color-white bg-black"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

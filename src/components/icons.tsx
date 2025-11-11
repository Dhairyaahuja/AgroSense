import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-2 0-4-1-5-2-1-2-2-4-2-6 0-4 2-8 5-10 3-2 6-2 9 0 3 2 5 6 5 10 0 2-1 4-2 6-1 1-3 2-5 2Z" />
      <path d="M12 12c-2.5 0-5-1-5-5" />
      <path d="M12 12c2.5 0 5-1 5-5" />
      <path d="M12 12v10" />
    </svg>
  );
}

"use client";

import { cn } from "@/libs/utils";
import React, { type ReactNode } from "react";

interface ICopyToClipboard {
  children: ReactNode;
}

export const CopyToClipboard = ({ children }: ICopyToClipboard) => {
  const textInput = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    setCopied(true);
    if (textInput?.current?.textContent)
      await navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div ref={textInput} className="code-block relative">
      <button
        aria-label="Copy code"
        type="button"
        className={cn(
          "absolute bottom-3 right-3 h-10 w-10 rounded-[10px] border-2 bg-gray-700 p-1 dark:bg-gray-800",
          {
            "border-green-400 focus:border-green-400 focus:outline-none":
              copied,
            "hover:border-gray-300": !copied,
          },
        )}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={copied ? "text-green-400" : "text-gray-300"}
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </>
          )}
        </svg>
      </button>
      {children}
    </div>
  );
};

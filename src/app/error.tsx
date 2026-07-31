"use client";

import {SystemPage, systemPageActionClassName} from "@/components/system/system-page";
import {systemText} from "@/lib/config/text/system";

type ErrorPageProps = {
  error: Error & {digest?: string};
  reset: () => void;
};

export default function ErrorPage({reset}: ErrorPageProps) {
  const {errorPage} = systemText;

  return (
    <SystemPage
      content={errorPage}
      leadingAction={
        <button type="button" onClick={reset} className={systemPageActionClassName}>
          {errorPage.body.actions.retryLabel}
        </button>
      }
    />
  );
}

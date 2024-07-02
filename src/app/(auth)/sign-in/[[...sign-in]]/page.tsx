import { ROUTE_PATH } from "@/constants/routes";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn
        forceRedirectUrl={ROUTE_PATH.ADMIN.INDEX}
        appearance={{
          elements: {
            footer: {
              display: "none",
            },
          },
        }}
      />
    </div>
  );
}

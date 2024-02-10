"use client";
import {useAuth, ClerkProvider} from "@clerk/nextjs";

import {ConvexProviderWithClerk} from "convex/react-clerk";

import {ConvexReactClient, AuthLoading, Authenticated} from "convex/react";
import Loading from "@/components/auth/loading";

interface Props {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({children}: Props) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

"use client";

import getProviders from "@/actions/getProviders";
import { MessageProvider } from "@/app/api/providers/types";
import NewProviderModal from "@/components/pages/dashboard/providers/new-provider-modal";
import ProviderItem from "@/components/pages/dashboard/providers/provider-item";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";

export default function MessageProviders() {
  const {
    data: providers,
    isLoading,
    error,
    mutate,
  } = useSWR<MessageProvider[]>("/providers", getProviders, {
    refreshInterval: 1000,
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-y-2 mt-6">
        <h6 className="text-lg font-medium">List Providers</h6>

        <NewProviderModal mutate={mutate} />
      </div>

      <Separator className="my-4" />

      {isLoading && (
        <div className="mt-32 flex flex-col gap-y-8 justify-center items-center">
          <div className="text-center flex flex-col gap-y-2">
            <p className="text-lg font-medium">Loading Providers...</p>

            <p className="text-sm text-gray-500">
              Please wait while we load your providers.
            </p>
          </div>
        </div>
      )}

      {providers && providers.length > 0 && (
        <div className="grid grid-cols-9 gap-x-4 gap-y-6">
          {providers.map((provider) => (
            <ProviderItem key={provider.id} provider={provider} />
          ))}
        </div>
      )}

      {providers && providers.length === 0 && (
        <div className="mt-32 flex flex-col gap-y-8 justify-center items-center">
          <div className="text-center flex flex-col gap-y-2">
            <p className="text-lg font-medium">Oops! No Providers Found</p>

            <p className="text-sm text-gray-500">
              Create new provider to connect with the world.
            </p>
          </div>

          <NewProviderModal mutate={mutate} />
        </div>
      )}
    </>
  );
}

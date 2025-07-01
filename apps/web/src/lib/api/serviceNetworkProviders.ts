import type { ServiceNetworkProvider } from '@zygo/types';
import serviceNetworkProvidersData from './data/serviceNeworkProviders.json';

export function getServiceNetworkProviders(): ServiceNetworkProvider[] {
  return serviceNetworkProvidersData.serviceNetworkProviders;
}

export function getServiceNetworkProviderById(id: string): ServiceNetworkProvider | undefined {
  return serviceNetworkProvidersData.serviceNetworkProviders.find(provider => provider.id === id);
}

export function getServiceNetworkProviderByName(name: string): ServiceNetworkProvider | undefined {
  return serviceNetworkProvidersData.serviceNetworkProviders.find(provider => 
    provider.name.toLowerCase() === name.toLowerCase()
  );
}

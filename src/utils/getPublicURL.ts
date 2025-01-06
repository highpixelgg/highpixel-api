import lowracingConfig from "config/lowracing.config"

export const getPublicURL = (url: string) => {
  return `${lowracingConfig.baseURL}/${url}`;
}
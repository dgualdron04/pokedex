import { ref, shallowRef, onUnmounted, type Ref, type ShallowRef } from "vue";
import type { AxiosResponse } from "axios";
import type { UseApiCall } from "../models/UseApiCall.ts";
import { UseLoadingStore } from "../../app/store/UseLoadingStore.ts";

type UseApiOptions<P> = { autoFetch?: boolean; params: P };
type CustomError = Error | null;

interface UseApiResult<T, P> {
  loading: Ref<boolean>;
  data: ShallowRef<T | null>;
  error: Ref<CustomError>;
  fetch: (param: P) => Promise<void>;
}

export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>,
): UseApiResult<T, P> => {
  const loading = ref<boolean>(false);
  const data = shallowRef<T | null>(null);
  const error = ref<CustomError>(null);
  const loadingStore = UseLoadingStore();

  const controller = shallowRef<AbortController | null>(null);

  const fetch = async (param: P): Promise<void> => {
    controller.value?.abort();

    const { call, controller: apiController } = apiCall(param);
    controller.value = apiController;

    loading.value = true;
    loadingStore.start();
    return call
      .then((response: AxiosResponse<T> | { data: T }) => {
        data.value = (response as AxiosResponse<T>).data;
        error.value = null;
      })
      .catch((err: unknown) => {
        error.value = err instanceof Error ? err : new Error(String(err));
      })
      .finally(() => {
        loading.value = false;
        loadingStore.stop();
      });
  };

  if (options?.autoFetch && options.params !== undefined) {
    Promise.resolve().then(() => fetch(options.params as P));
  }

  onUnmounted(() => {
    controller.value?.abort();
    controller.value = null;
  });

  return { loading, data, error, fetch };
};

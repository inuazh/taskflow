import { QueryClient }  from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
           // задачи меняются часто поэтому так, там где 30 секунд слишком
            // мало, будем менять в самом useQuerry
             staleTime: 30 * 1000, 
             // дефолт, нас устраивает
            gcTime: 5 * 60 * 1000,
            //только 2 повторные попытки
            retry: 2, 
            // требование п 6.3
            refetchOnWindowFocus: true, 
        },
        mutations: {

        },
    },
})
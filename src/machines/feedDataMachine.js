import { setup, fromPromise, assign } from 'xstate';
import { fetchFeedApi } from '../utils/fetchFeedApi'

const feedDataMachine = setup({
  actors: {
    fetchFeed: fromPromise(async ({ input }) => {
      const feedData = await fetchFeedApi(input.page);
      return feedData;
    })
  }
}).createMachine({
  id: 'feedData',
  initial: 'idle',
  context: {
    feedData: [],
    page: 1,
    error: undefined,
  },
  states: {
    idle: {
      on: {
        FETCH: { target: 'loading' },
      },
    },
    loading: {
      invoke: {
        id: 'getFeedData',
        src: 'fetchFeed',
        input: ({ context: { page } }) => ({ page }),
        onDone: {
        target: 'success',
        actions: assign({ feedData: (context) => [...context?.context.feedData, ...context?.event?.output]})
        },
        onError: {
          target: 'failure',
          actions: assign({ error: ({ event }) => event.error }),
        },
      },
    },
    success: {
        on: {
            INCREMENT_PAGE: {
                guard: (context) => context.context.page < 5,
                actions: assign({
                page: (context) => context.context.page + 1
              }),
                target: 'loading',
              },
          },
    },
    failure: {
      on: {
        RETRY: { target: 'loading' },
      },
    },
  },
});

export default feedDataMachine;

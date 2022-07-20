import create from 'zustand'


type RefetchStore = {
  refetchFunction?: Array<() => void>;
  setRefetchFunction: (refetchFunction: () => void) => void;
  triggerRefetch: () => void;

}

const useRefetchStore = create<RefetchStore>((set, get) => ({
  refetchFunction: undefined,
  setRefetchFunction: (refetchFunction: () => void) => {
    const data = get().refetchFunction || [];
    if (data.findIndex(item => item === refetchFunction) === -1) {
      data.push(refetchFunction);
    }
    set({ refetchFunction: data });
  },
  triggerRefetch: () => {
    get().refetchFunction?.map(refetchFunction => refetchFunction());
  }
}))


export { useRefetchStore }
let data = null;

export const dataManager = {
    getData: () => data,
    setData: (newData) => (data = newData),
};

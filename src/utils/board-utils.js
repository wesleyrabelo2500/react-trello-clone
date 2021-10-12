export const isEmptyText = (text) => !text || !text.trim();

export const objectToArray = (data) =>
    !data
        ? []
        : Object.values(data).map((value, index) => ({
              ...value,
              key: Object.keys(data)[index],
          }));

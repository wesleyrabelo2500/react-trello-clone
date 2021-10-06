export function mergeDataWithKey(data) {
    return !data
        ? []
        : Object.values(data).map((value, index) => ({
              ...value,
              key: Object.keys(data)[index],
          }));
}

export function byPropKey(propertyName, value) {
    return {
        [propertyName]: value,
    };
}

export const isEmpty = (obj) =>
    [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export function isEmptyText(text) {
    return !text || !text.trim();
}

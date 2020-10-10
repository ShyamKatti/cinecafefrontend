export const typeUtils = {
    isNull: (data) => {
        return data === null;
    },
    isUndefined: (data) => {
        return typeof data === 'undefined';
    },
    isNullOrUndefined: (data) => {
        return typeof data === 'undefined' || data === null;
    },
    isString: (data) => {
        return typeof data === 'string';
    },
    isObject: (data) => {
        return typeof data === 'object';
    },
    isFunction: (data) => {
        return typeof data === 'function';
    }
};
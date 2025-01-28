export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.set(key, value);
        }
    });

    return `?${searchParams.toString()}`;
}

export function addQueryParams(params: OptionalRecord<string, string>) {
    const basePath = window.location.pathname + window.location.hash.split('?')[0];
    const newUrl = `${basePath}${getQueryParams(params)}`;

    window.history.pushState(null, '', newUrl);
}

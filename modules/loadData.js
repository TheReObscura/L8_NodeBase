async function loadData(url) {
    const result = {
        data: [],
        isLoading: true,
        error: null
    };

    try {
        const response = await fetch(url);
        result.data = await response.json();
    } catch (err) {
        result.error = err;
    } finally {
        result.isLoading = false;
    }

    return result;
}

module.exports = loadData;
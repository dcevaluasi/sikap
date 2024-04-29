export function createSlug(inputString: String) {
    // Remove special characters and convert to lowercase
    const slug = inputString.replace(/[^\w\s]/gi, '').toLowerCase();
    // Replace spaces with dashes
    return slug.replace(/\s+/g, '-');
}
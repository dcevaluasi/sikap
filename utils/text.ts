export function capitalize(text: string): string {
    return text.replace(/\b\w/g, match => match.toUpperCase());
}

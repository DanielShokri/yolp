export function capitalize(str) {
    if (str) {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }
}
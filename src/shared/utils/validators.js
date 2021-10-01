export default function formValidator(loading, text) {
    if (loading || !text || !text.trim()) {
        return true;
    }
    return false;
}

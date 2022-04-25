export function isNullOrWhitespace(input) {
  return (
    typeof input === "undefined" ||
    input === "" ||
    input == null ||
    input.replace(/\s/g, "").length < 1
  );
}

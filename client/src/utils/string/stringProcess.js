function replaceUnderscore(str) {
  return str.replace(/_/g, " ");
}

function replaceSpace(str) {
  return str.replace(/ /g, "_");
}

export { replaceUnderscore, replaceSpace };

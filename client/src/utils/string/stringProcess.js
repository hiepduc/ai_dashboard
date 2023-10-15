function replaceUnderscore(str) {
  return str.replace(/_/g, " ");
}

function replaceSpace(str) {
  return str.replace(/ /g, "_");
}

function replaceSpaceWithHyphen(str) {
  return str.replace(/ /g, "-");
}

export { replaceUnderscore, replaceSpace, replaceSpaceWithHyphen };

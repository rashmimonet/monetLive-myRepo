String.prototype.trimWhiteSpaces = trimWhiteSpaces;

interface String {
  trimWhiteSpaces: typeof trimWhiteSpaces;
}

function trimWhiteSpaces(): string {
  // @ts-ignore
  return this.split(' ').join('');
}

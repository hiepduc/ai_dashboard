function descendingSortByKey(key) {
  return (a, b) => b[key] - a[key];
}

export { descendingSortByKey };

const TwentyDaysBack = new Date(
    new Date().getTime() - 24 * 60 * 60 * 60 * 1000 * 20,
  ).toLocaleDateString();

export default TwentyDaysBack
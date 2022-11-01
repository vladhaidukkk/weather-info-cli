function parseArgs(args) {
  const res = {};

  args.forEach((arg, index) => {
    if (arg.charAt(0) === '-') {
      const [key, ...rest] = arg.substring(1).split('=');
      const value = rest.join('');

      if (value) {
        res[key] = value;
      } else {
        const nextArg = args[index + 1];

        if (nextArg && nextArg.charAt(0) !== '-') {
          res[key] = nextArg;
        } else {
          res[key] = true;
        }
      }
    }
  });

  return res;
}

export { parseArgs };

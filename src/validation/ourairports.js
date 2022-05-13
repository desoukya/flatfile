const SUPPORTED_AIRPORT_TYPES = Object.freeze(['small_airport', 'medium_airport', 'large_airport']);

module.exports = (record) => {
  const output = {};


  Object.entries(record).forEach(([key, value]) => {
    let tValue = value;
    const info = [];

    // Rule #1: Trim all values
    if (tValue !== value.trim()) {
      tValue = tValue.trim();
      info.push({
        message: 'Removed whitespace',
        level: 'info'
      });
    }

    // Rule #2: Only accept supported airport types
    if (key === 'type') {
      if (!SUPPORTED_AIRPORT_TYPES.includes(tValue)) {
        info.push({
          message: `${tValue} is not a supported airport type`,
          level: 'error'
        });
      }
    }

    if (info.length) {
      output[key] = { info };
      if (tValue !== value) output[key].value = tValue;
    }
  });

  return output;
};
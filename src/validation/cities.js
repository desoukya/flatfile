const UNSUPPORTED_STATE_CODES = Object.freeze(['VA', 'CA', 'TX']);

module.exports = (record) => {
  const output = {};

  Object.entries(record).forEach(([key, value]) => {
    let tValue = value;
    const info = [];

    // Rule #1: Remove quotes ie "Winchester" => Winchester
    if (tValue.includes('"') || tValue.includes('\'')) {
      tValue = tValue.replace(/["']/g, '');
      info.push({
        message: 'Removed quotes',
        level: 'info'
      })
    }

    // Rule #2: Trim all values ie "   Winchester" => "Winchester"
    if (tValue !== value.trim()) {
      tValue = tValue.trim();
      info.push({
        message: 'Removed whitespace',
        level: 'info'
      });
    }

    // Rule #3: Do not accept records in unsupported states    
    if (key === 'state') {
      if (UNSUPPORTED_STATE_CODES.includes(tValue)) {
        info.push({
          message: `${tValue} is not a supported state`,
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
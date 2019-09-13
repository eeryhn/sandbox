function gcd(n, m) {
  let r;
  do {
    r = n%m;
    n = m;
    m = r;
  } while(r)
  return n;
}

function getPrimeFactors(n) {
  let factors = [];
  // assume n is composite
  const max = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= max; i++ ) {
    if(!(n % i)) {
      const next = getPrimeFactors(n / i);
      factors.push(i);
      factors = [...new Set([...factors, ...next])];
      break;
    }
  }
  // fallback if n is prime
  if(!factors.length) {
    factors.push(1, parseInt(n));
  }
  return factors;
}

function getTotatives(n) {
  let totatives = []
  for (let i = 1; i <= n; i++) {
    if( gcd(n, i) === 1) {
      totatives.push(i);
    }
  }
  return totatives;
}

function getInverseSequence(n) {
  if(n < 2 || gcd(n, 10) > 1) {
    return 0;
  }

  let r = 1;
  let result = ""
  do {
    r = r * 10;
    result = result.concat(Math.floor(r / n).toString());
    r = r % n;
  } while (r !== 1);
  return result;
}


module.exports = {
  gcd,
  getPrimeFactors,
  getTotatives,
  getInverseSequence
};

import { useState } from 'react';

export default function Conclusion() {
  return(
    <p>
      Interactive, pick a number between 1 and 6
      (value = n * 142857)
      because...well, because arithmetic, but we can expect it to
      cycle because...
      0.value... = n * 0.142857...
      because...
      14.285714 = 100 * 0.14285714 = 14 + 2/7
      Ultimately because...
      (10^m = n mod 7).
    </p>
  )
}

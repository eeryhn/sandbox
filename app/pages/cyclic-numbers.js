import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CommentLayout from '../components/CommentLayout';
import Interactive from '../components/comment-layout/Interactive';
import '../node_modules/katex/dist/katex.min.css';
import Latex from 'react-latex';
import * as Interactives from '../components/cyclic-numbers/exports';

function NumDisplay(props) {
  return(
    <Box style={{fontSize: "1.2rem", letterSpacing: ".1rem"}}>
      {props.children}
    </Box>
  );
}

function Note(props) {
  const {children, ...attr} = props;
  return(
    <Box style={{fontSize: ".75rem", lineHeight: "1.3rem"}} {...attr}>
      <div>
        {children}
      </div>
    </Box>
  )
}

const content =
  <div id="0" commentable>
    <Typography id="title" variant="h3" commentable>
      Cyclic Numbers
    </Typography>
    <div id="intro" commentable>
      <div id="intro-0" commentable>
        <p>
          Right.  Jumping right in, then.  Let's talk about a number.
          In particular, this number:
        </p>
        <Box style={{fontSize: "1.5rem", letterSpacing: ".1rem"}}>
          <Latex displayMode>$$142857$$</Latex>
        </Box>
      </div>
      <p id="intro-1" commentable>
        A cyclic number.  By some definitions, the only one in decimal, but we'll
        get there.  Here's a little demo to show how this number is special.
      </p>
      <Interactive>
        <Interactives.CNSlider/>
      </Interactive>
      <Latex id="intro-2" commentable>
        So we can think of cyclic numbers as integers of length $n$
        for which the first $n$ multiples rearrange their digits in this
        cyclical way.
      </Latex>
      <p id="intro-3" commentable>
        In and of itself, this is kind of cool.  At least I think it's cool.
        But, generally speaking, these kinds of things don't just happen.
        This isn't some odd or magical, totally unexpected quirk, and it also
        isn't exactly limited to one particular number, but it also kind of
        is.
      </p>
    </div>
    <Typography id="title0" variant="h4" commentable>
      So let's look a little closer
    </Typography>
    <div id="body" commentable>
      <div id="body-0" commentable>
        <p>
          Those who pay more attention to numbers might have recognized our example.
          For people like me who didn't:
        </p>
        <NumDisplay>
          <Latex displayMode>
            {'$\\frac{1}{7} = 0.\\overline{142857}$'}
          </Latex>
        </NumDisplay>
        <p>
          Ask me why this is important.
        </p>
      </div>
      <div> make this into a goddamn comic cuz you're a lazy pos
        <p>
          Remember when you were in grade school, and you'd just learned about long
          division, decimals, remainders, all that fun stuff?  And then, to keep you
          busy, your teacher was all "yes!  One divided by four is 0.25!  Good job!
          Now what's one divided by seven?"
        </p>
        <p>
          "Oh, I don't know.  Let's find out!"
        </p>
        <p>
          So you sat there taping together pieces of paper because for some reason it
          keeps going off the page, and when is it going to end?
        </p>
        <p>
          Then, possibly earlier on, maybe before you even hit the edge of the paper
          you started to think "wait, haven't I done this before?".  And you realised
          you had.
        </p>
        <p>
          Because every time you hit a remainder of 1, the sequence began again.
        </p>
        <p>
          If you were an "overachiever", you took this new found cheat, taped
          together a full ream, and sped through the rest of the lines to show teacher.
        </p>
      </div>
      <p >
        And that's how you learned trees are good and you shouldn't waste paper.
      </p>
      <p>
        That's also how you learned about repeating decimals.
      </p>
      <p id="body-3" commentable>
        Somewhere along the way, teacher might also have mentioned that the multiplicative
        inverse of numbers not divisible by 2 or 5 would be repeating decimals.
      </p>
      <p id="body-4" commentable>
        In otherwords, the multiplicative inverse of a number, <Latex>$n$</Latex>,
        is a repeating decimal if <Latex>$n$</Latex> is <b> relatively prime </b> (also
        called <b> coprime</b>) to <Latex>$10$, which just means $n$ and $10$</Latex>
        do not share any non-trivial factors (1 being the unique and completely trivial case).
      </p>
      <div id="body-5" commentable>
        <Box mb={1}>
          In part, this relates to the somewhat intimidatingly named <b>Euler's Totient Theorem</b>,
          which states:
        </Box>
        <Interactive>
          <Interactives.EulersTheorem/>
        </Interactive>
        <Note id="note-0" commentable>
          As a side note: the term <b>totient</b> was later coined by a different
          mathematician to refer to the number of numbers less than a given number that
          are relatively prime to said given number (i.e. the value given by — the
          now called — Euler's totient function.)
        </Note>
      </div>
      <div id="body-6" commentable>
        <Latex>
          Proving this isn't really in the scope of this writeup.
          Someday, maybe, but not here.  Anyway, If we let $a = 10$:
        </Latex>
        <NumDisplay>
          <Latex displayMode>
            {'$10^{\\phi(n)} \\equiv \\hspace{1mm} 1 \\hspace{1mm} mod \\hspace{1mm} n$'}
          </Latex>
        </NumDisplay>
      </div>
      <div id="body-7" commentable>
        We can conclude, then, that since
        <Latex displayMode>{`$10^{\\phi(n)} \\div n$`}</Latex>
        results in a remainder of <Latex>$1$</Latex>, if we were to do a manual
        calculation of the trailing decimal:
        <Latex displayMode>{`$1.\\underbrace{00 \\ldots 0}_{\\phi(n)} \\div n$`}</Latex>
        we would similarly see a "remainder" of 1 at this position, and the decimal
        would repeat.
      </div>
      <div id="body-8" commentable>
        <Box mb={2}>
          To illustrate, try entering a number between 1 and 60 in the text box.
          You should see:
          <ul>
            <li>
              The list of integers included in <Latex>{`$\\phi(n)$`}</Latex>
            </li>
            <li>
              The value of <Latex>{`$\\phi(n)$`}</Latex>
            </li>
            <li>
              A manual calculation of <Latex>{`$\\frac{1}{n}$`}</Latex> up to
              the <Latex>{`$\\phi(n)$`}</Latex> decimal position.
            </li>
          </ul>
        </Box>
        <Interactive>
          <Interactives.EulersDemo/>
        </Interactive>
        <Note id="note-1" commentable>
          <b>Note:</b> Although it will always be the case that
          we have a "remainder" of <Latex>$1$</Latex> at the <Latex>{`$\\phi(n)$`}</Latex>
          decimal position, it is still possible we will encounter it before then.
          However, because this is the case, we can expect the repeating interval to always be
          some factor of <Latex>{`$\\phi(n)$`}</Latex>.
        </Note>
      </div>
    </div>
    <Typography id="title1" variant="h4" commentable>
      Back to 142857...
    </Typography>
    <div id="body2" commentable>
      <Box mb={2}>
        Well...kind of.
      </Box>
      <Box mb={2}>
        <Latex>
          {`First, back to the repeating decimal $0.\\overline{142857}$`}
        </Latex>
      </Box>
      <div id="body2-0" commentable>
        <Latex>
          {`This decimal value is a special case in that the length of the repeating
          sequence is $6$, or $\\phi(7)$.`}
        </Latex>
      </div>
      <div id="body2-1" commentable>
        <Latex>
          {`The length of this sequence indicates that $10^{n} \\equiv \\hspace{1mm} 1 \\hspace{1mm} mod \\hspace{1mm} n$ is true no sooner than $n=6$.`}
        </Latex>
      </div>
      <div id="body2-2" commentable>
        <Box mb={2}>
          This is actually kind of exciting, but for our purposes, this just means
          that, since decimals begin to repeat when we reencounter a remainder,
          the first six powers of 10 have unique values modulo 7.  Or,
          more formally —
        </Box>
        <div>
          <Latex>
            {`For all values $r$, with $1 \\leq r \\leq 6$, there exists some $n$, with
              $1 \\leq n \\leq 6$ such that:`}
          </Latex>
          <Latex displayMode>
            {`$10^{n} \\equiv \\hspace{1mm} r \\hspace{1mm} mod \\hspace{1mm} 7$`}
          </Latex>
          <Box mb={2}>
            To demonstrate, feel free to click on an exponent value below to show the
            corresponding remainder, or the vice versa.
          </Box>
          <Interactive>
            <Interactives.Remainders/>
          </Interactive>
        </div>
      </div>
      <p>
        This also means that distinct values <Latex>{'$\\frac{n}{7}$'}</Latex> define the trailing decimal
        as we move the decimal point in <Latex>{'$0.\\overline{142857}$'}</Latex> to the right:
      </p>
      <Interactive>
        <Interactives.DecimalSlider divisor={7}/>
      </Interactive>
      <div>
        Aside: numberphile video
      </div>
      <p>
        For comparison, if we do the same with <Latex>{'$0.\\overline{3}$'}</Latex>
      </p>
      <Interactive>
        <Interactives.DecimalSlider divisor={3}/>
      </Interactive>
      <p>
        Or <Latex>{'$\\frac{1}{21}$'}</Latex>, given by <Latex>{'$0.\\overline{047619}$'}</Latex>
      </p>
      <Interactive>
        <Interactives.DecimalSlider divisor={21}/>
      </Interactive>
      <p>
        So...
      </p>
      <Interactive>
        <Interactives.Conclusion/>
      </Interactive>
    </div>
    <Typography id="title3" variant="h4" commentable>
      Carry-over
    </Typography>
    <div id="carryover" commentable>
      <div id="carryover-0" commentable>
        If I'm lucky and very not alone, somebody out there is asking about carryover.
        Something like, why does
        <Latex displayMode>
          {'$2 \\times 0.\\overline{142857} = 0.\\overline{285714}$'}
        </Latex>
          Automatically mean
        <Latex displayMode>
          $2 \times 142857 = 285714$
        </Latex>
        Or, rather, why does the rest of the decimal not matter?
      </div>
      <p id="carryover-1" commentable>
        And the answer is, more or less: in order for one segment to have any impact
        on the other there would need to be something to carry over, which cannot happen
        when <Latex>{`$n \\leq 7$`}</Latex>.
      </p>
      <div id="carryover-diagram" commentable>
        Diagram.
      </div>
      <div id="carryover-2" commentable>
        <Latex>
          This is why we can expect larger multiples of $142857$ to no longer preserve
          the original sequence.  However, in the decimal form, we know the leading
          values from one segment carry over into the trailing values in another.  Thus, we
          can also expect splitting the product of $n \times 142857$ at the 6th, 12th, etc. positions
          from the right, and adding the resulting segments will, in fact, yield a permutation
          of the original number.
        </Latex>
      </div>
      <div id="carryover-3" commentable>
        <div>
          Also because we do lose the trailing decimal:
          <Latex displayMode>
            $142857 \times 7 = 999999$
          </Latex>
        </div>
        <Latex>
          And, similarly, multiplying by multiples of $7$ result in a similar pattern with
          $999999$.
        </Latex>
      </div>
      <div id="interactive-8" commentable>
        <Box mb={2}>
          Let's see this in action:  try entering a positive
          number into the textbox.
        </Box>
        <Note id="note-2" commentable>
          <b>Note:</b> due to some rather well known technical limitations,
          values of <Latex>{`$n > 63050457833$`}</Latex> will be not quite
          right.
        </Note>
        <Interactive>
          <Interactives.Multiplier/>
        </Interactive>
      </div>
    </div>
    <Typography id="conclusion-title" variant="h4" commentable>
      Conclusion
    </Typography>
    <div id="conclusion" commentable>
      <p id="conclusion-1" commentable>
        The number 142857 is unique in that it is the only cyclic number
        in <b>decimal</b> (base 10) without a leading zero.  Which is to say,
        if we don't consider leading zeros in numbers (most programming languages will
        strip them), it is the only number in decimal that has this property.
      </p>
      <p id="conclusion-2" commentable>
        However, the set of circumstances that make 7 such a special number in decimal
        apply to other numbers in other numeric systems.  At the time of
        writing, the Wikipedia article on cyclic numbers lists quite a few.  It really
        is a great rabbit hole to dive into.
      </p>
      <p id="conclusion-3" commentable>
        Additional sources I used all those years ago will also be below once I
        figure out how I want to link them.
      </p>
    </div>
    <Typography id="closing-title" variant="h4" commentable>
      Soapbox
    </Typography>
    <div id="closing" commentable>
      <p id="closing-0" commentable>
        This is a topic pretty near and dear to my heart.  I think it's the topic
        that really made me realise numbers are great.  It's also the topic I kept circling back
        to as I learned more.  Even then, this went on a little longer than I expected.
        In all honesty, it could have been so much longer, still.  We touched
        a bit on some relevant number theory, but we've hardly hit a wall.
      </p>
      <p id="closing-1" commentable>
        There's a lot more we could show.  There are more conclusions we could draw.
        With just a baseline level of knowledge, there are so many more connections
        and patterns we can trace from here.  This is just where we stop because this
        is the extent I can claim to somewhat know.
      </p>
      <p id="closing-2" commentable>
        Somebody out there is going to say "technically you're just backtracking",
        and I'm going to say "no, we took two lefts and then another, and found
        ourselves exactly where we thought we'd be."  Given all the twists and turns,
        and how easy it was to tunnel vision as we were walking, I really do think
        that's something worth marveling.
      </p>
      <p id="closing-3" commentable>
        So if you made it down here...you're probably somebody
        I asked to proofread or fact check.  But, if you're not, I hope you learned
        something new. More than that, I hope you're excited about it.  I hope
        you have questions and I hope you want answers, because numbers really
        do describe some of the most amazing worlds we have.
      </p>
    </div>
    <Typography id="ref-title" variant="h4" commentable>
      References:
    </Typography>
  </div>

export default function CyclicNumbers() {
  return(
    <CommentLayout content={content} pageId="cyclic numbers" selected="0" />
  )
}

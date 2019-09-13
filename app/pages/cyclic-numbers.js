import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
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
        A cyclic number.  By some definitions, the only one in decimal.
        Here's a little demo to show what makes this number worth classifying.
        Try dragging the highlighted segment.
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
        In and of itself, this is just a somewhat fun piece of trivia.
        Still, we can explain why this number must behave the way it does.
        Of course, these reasons can involve some surface level number theory, but
        they also relate to basic intuitions we likely learned at one point or
        another. I like to think they make those intuitions just a little more
        meaningful.
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
      <div> probs going to make this a....comiiic?  pardon my dust?
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
          <b>As a side note:</b> the term <b>totient</b> was later coined by a different
          mathematician to refer to the number of numbers less than a given number that
          are relatively prime to said given number (i.e. the value given by — the
          now called — Euler's totient function.).
          <p>
            Relish in the fact that mathematicians have been so interested in this
            sum as to give it a  — less than memorable — name.  Relish, also, in
            the fact that millions of students are made to remember the word anyway.
          </p>
        </Note>
      </div>
      <div id="body-6" commentable>
        <Box mb={2}>
          Proving the above theorem isn't really in the scope of this writeup.
          Someday, maybe, but not here.  For now, we'll take it to be true, and
          examine how it fits into some commonplace calculations.
        </Box>
        <Latex>
          Namely, if we let $a = 10$:
        </Latex>
        <NumDisplay>
          <Latex displayMode>
            {'$10^{\\phi(n)} \\equiv \\hspace{1mm} 1 \\hspace{1mm} mod \\hspace{1mm} n$'}
          </Latex>
        </NumDisplay>
        We can conclude, then, that since
        <Latex displayMode>{`$10^{\\phi(n)} \\div n$`}</Latex>
        results in a remainder of <Latex>$1$</Latex>, if we were to do a manual
        calculation of the trailing decimal:
        <Latex displayMode>{`$1.\\underbrace{00 \\ldots 0}_{\\phi(n)} \\div n$`}</Latex>
        we would similarly see a "remainder" of 1 at this position, and can thus
        expect the decimal to repeat here.
        <Box mt={2}>
          From this, we can conclude that the multiplicative
          inverse, <Latex>{`$\\frac{1}{n}$`}</Latex>, is always a repeating decimal when
          <Latex>$n$ is relatively prime to $10$</Latex>.
        </Box>
      </div>
      <div id="body-8" commentable>
        <Box mb={2}>
          It's important to note that this does not mean the repeating
          interval is of length <Latex>{`$\\phi(n)$`}</Latex>.  In fact, it generally
          is not.  However, this does suggest that the repeating interval length is
          always some factor of <Latex>{`$\\phi(n)$`}</Latex>.
        </Box>
        <Box mb={2}>
          To illustrate, try entering a number between 3 and 50 in the text box.
          You should see:
          <ul>
            <li>
              The list of integers counted by <Latex>{`$\\phi(n)$`}</Latex>
            </li>
            <li>
              The value of <Latex>{`$\\phi(n)$`}</Latex>
            </li>
            <li>
              The value
              of <Latex>{`$\\frac{1}{n}$`}</Latex> up to
              the <Latex>{`$\\phi(n)$`}</Latex> decimal position,
              if <Latex>$n$ is relatively prime to $10$</Latex>
            </li>
          </ul>
        </Box>
        <Interactive>
          <Interactives.EulersDemo/>
        </Interactive>
      </div>
    </div>
    <Typography id="title1" variant="h4" commentable>
      Back to 142857
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
          {`This decimal value is a special case in that the length of this sequence indicates
          $10^{n} \\equiv \\hspace{1mm} 1 \\hspace{1mm} mod \\hspace{1mm} n$ is
          true no sooner than $n=6$, or $\\phi(n)$.`}
        </Latex>
      </div>
      <div id="body2-1" commentable>
        <Box mb={2}>
          This is actually kind of exciting, but for our purposes, this just means
          the first six powers of 10 to have unique values modulo 7.  Or,
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
            To demonstrate, try clicking on an exponent value below to show the
            corresponding remainder, or the vice versa.
          </Box>
          <Interactive>
            <Interactives.Remainders/>
          </Interactive>
        </div>
      </div>
      <div id="body2-2" commentable>
        <Box mb={2}>
          This also means that distinct values <Latex>{'$\\frac{n}{7}$'}</Latex> define the trailing decimal
          as we cycle through the sequence <Latex>{'$0.\\overline{142857}$'}</Latex> by
          multiplying by 10:
        </Box>
        <Interactive>
          <Interactives.DecimalSlider divisor={7}/>
        </Interactive>
        <Note id="note-2" commentable>
          <b>Note</b>: This interactive in particular was inspired by the comparitively
          concise and all around cooler and
          better <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=WUlaUalgxqI"
          >numberphile video</Link> on the same topic.
        </Note>
        <Box mb={2}>
          For comparison, if we do the same with <Latex>{'$0.\\overline{3}$'}</Latex>
        </Box>
        <Interactive>
          <Interactives.DecimalSlider divisor={3}/>
        </Interactive>
        <Box mt={2} mb={2}>
          Or <Latex>{'$\\frac{1}{21}$'}</Latex>, given by <Latex>{'$0.\\overline{047619}$'}</Latex>
        </Box>
        <Interactive>
          <Interactives.DecimalSlider divisor={21}/>
        </Interactive>
      </div>
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
      <div id="carryover-1" commentable>
        And the answer is, more or less: it does, and this is most easily noted
        in multiplication by <Latex>$7$</Latex> which gives:
        <Latex displayMode>
          $142857 \times 7 = 999999$
        </Latex>
        However, in order for one segment of the decimal to have any impact on the next,
        there needs to be something to carry over.
      </div>
      <div id="carryover-diagram" commentable>
        Insert Diagram pls thx
      </div>
      <div id="carryover-2" commentable>
        <Latex>
          This, of course, doesn't happen when we're multiplying by $n \leq 7$.
          It is also why we can expect larger multiples of $142857$ to no longer preserve
          the original sequence.  They are not, however, entirely uninteresting:
        </Latex>
        <Box mt={2}>
          <Latex>
            When we consider multiples of the repeating decimal,
            we know the leading values from one segment carry over into the trailing values
            of the next.  As such, we can also expect splitting the product of $n \times 142857$
            at the 6th, 12th, etc. positions from the right, and adding the resulting
            segments will, in fact, yield a permutation of the original number.
          </Latex>
        </Box>
        <Box mt={2}>
          <Latex>
            Similarly, we can expect that multiplying by multiples of $7$ will result
            in a similar pattern with $999999$.
          </Latex>
        </Box>
      </div>
      <div id="interactive-8" commentable>
        <Box mb={2}>
          Let's see this in action:  try entering a positive
          number into the textbox.
        </Box>
        <Note id="note-3" commentable>
          <b>Note:</b> due to some rather well known technical limitations,
          values of <Latex>{`$n > 63050457833$`}</Latex> will be not quite
          right.  I haven't bound the inputs here mostly because integer
          overflow somehow manages to amuse me, and this is where I go to play
          so...
        </Note>
        <Interactive>
          <Interactives.Multiplier/>
        </Interactive>
      </div>
    </div>
    <Typography id="closing-title" variant="h4" commentable>
      Soapbox
    </Typography>
    <div id="closing" commentable>
      <p id="closing-1" commentable>
        The number 142857 is unique in that it is the only cyclic number
        in <b>decimal</b> (base 10) without a leading zero.  Which is to say,
        if we don't count leading zeros, it is the only number in decimal that
        has this property.
      </p>
      <p id="closing-2" commentable>
        However, the set of circumstances that make 7 such a special number in decimal
        apply to other numbers.  More than that, they apply to other numbers in other
        numeric systems.  In fact, many of the counting tricks we use have counterparts
        in other numeric systems.  For example, in ternary, we can determine divisibility by
        2 the same way we determine divisibility by 3 in decimal, but more on that
        another day.
      </p>
      <p id="closing-3" commentable>
        The point I'm trying to make is: we've hardly hit a wall.
        There's a lot more we could show.  There are more conclusions we could draw.
        With just some baseline knowledge and a bit of digging, there are so many more connections
        and patterns we can anticipate and trace.  This is just where we stop because this
        is as much as I can publish to some obscure crevice of the internet with
        a somewhat reasonable degree of confidence and responsibility.
      </p>
      <p id="closing-4" commentable>
        Someday, somebody out there is going to say "technically you're just backtracking",
        and I'm going to say "no, we took two lefts and then another, and found
        ourselves exactly where we thought we'd be."  Given all the twists and turns,
        and how easy it was to tunnel vision as we were walking, I really do think
        that's something worth marveling.
      </p>
      <p id="closing-5" commentable>
        So if you made it down here...you're probably somebody
        I asked to proofread or fact check.  But, if you're not, I hope you learned
        something new. More than that, I hope you're excited about it.  I hope
        you have questions and I hope you want answers, because numbers really
        do describe some of the most amazing worlds we have.
      </p>
    </div>
  </div>

export default function CyclicNumbers() {
  return(
    <CommentLayout content={content} pageId="cyclic numbers" selected="0" />
  )
}

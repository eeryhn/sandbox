import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CommentLayout from '../../components/CommentLayout';
import '../../node_modules/katex/dist/katex.min.css';
import Latex from 'react-latex';
import * as Interactives from '../../components/cyclic-numbers/exports';

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
        <Box mb={1.5}>
          Because it's special.  Obviously.  Otherwise we wouldn't talk about it.
          Technically speaking, we call this a <b>cyclic number</b> because...well,
          here's a little demo. Try dragging the highlighted segment.
        </Box>
        <div id="interactive-0" color="primary" commentable>
          <Interactives.CNSlider/>
        </div>
      </div>
      <div id="intro-1" commentable>
        So we can think of a <b>cyclic number</b> as an integer of length <Latex>$n$</Latex>
        for which the first <Latex>$n$</Latex> multiples are represented by a
        cycling of its digits (i.e. ...revisit above?).
      </div>
      <p id="intro-2" commentable>
        In and of itself, this is just a somewhat interesting piece of trivia.
        Some random fun fact following the words "did you know...", every now
        and then invoking the question "I wonder why that is" which is possibly followed by
        a "well, let's see..."
      </p>
    </div>
    <Typography id="title0" variant="h4" commentable>
      So let's see...
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
      <div id="body-1" commentable>
        <img
          src='/static/imgs/1.png'
          style={{maxWidth: '100%'}}
        />
      </div>
      <Box id="save-the-trees" commentable>
        And that's how you learned trees are good and you shouldn't
        waste paper.
      </Box>
      <Box id="body-2" commentable>
        And also that, when calculating by way of long division, most decimal
        representations of fractions have repeating segments.  In particular,
        this occurs at the point you see the same remainder twice
        (e.g. <Latex>{'$\\frac{1}{6}$'}</Latex>),
        or the remainer equals the numerator (e.g <Latex>{'$\\frac{1}{7}$'}</Latex>).
      </Box>
    </div>
    <Typography id="title1" variant="h4" commentable>
      Let's learn a new word
    </Typography>
    <div id="eulers" commentable>
      <p id="eulers-0" commentable>
        Somewhere along the way, somebody might also have mentioned that a fraction
        could be represented by a repeating sequence if the denominator was not
        divisible by 2 or 5.
      </p>
      <p id="eulers-1" commentable>
        In otherwords, the multiplicative inverse of a number
        (<Latex>{`$\\frac{1}{n}$`}</Latex>), can be represented by a
        repeating sequence (such as <Latex>{'$0.\\overline{142857}$'}</Latex>,
        not <Latex>{'$0.1\\overline{6}$'}</Latex>, which is just...something.  Else.
        Entirely.) if <Latex>$n$</Latex> is <b> relatively
        prime </b> (also called <b> coprime</b>) to <Latex>$10$, which just means
        $n$ and $10$</Latex> do not share any non-trivial factors (1 being the
        unique and completely trivial case).
      </p>
      <div id="eulers-2" commentable>
        <Box mb={1}>
          In part, this relates to the somewhat intimidating <b>Euler's Totient Theorem</b>,
          which states:
        </Box>
        <div id="interactive-1" color="primary" commentable>
          <Interactives.EulersTheorem/>
        </div>
        <Note id="note-0" commentable>
          <b>As a side note:</b> the term <b>totient</b> was later coined by a different
          mathematician to refer to the value given by — the now called — Euler's totient function.
          <p>
            Relish in the fact that mathematicians have been so interested in this
            sum as to give it a less than memorable name.  Relish, also, in
            the fact that millions of students are asked to remember the word anyway.
          </p>
        </Note>
      </div>
      <div id="eulers-3" commentable>
        <Box mb={2}>
          Proving the above theorem isn't really in the scope of this writeup.
          The theorem itself isn't really, either, but totient is a funny word
          so...it's worth it? Anyway, let's just take it to be true and
          see how this detour is relevant.
        </Box>
        <Latex>
          Let's let $a = 10$, Euler's Totient Theorem says:
        </Latex>
        <NumDisplay>
          <Latex displayMode>
            {'$10^{\\phi(n)} \\equiv \\hspace{1mm} 1 \\hspace{1mm} mod \\hspace{1mm} n$'}
          </Latex>
        </NumDisplay>
        We can conclude, then, that since
        <NumDisplay>
          <Latex displayMode>{`$10^{\\phi(n)} \\div n$`}</Latex>
        </NumDisplay>
        results in a remainder of <Latex>$1$</Latex>, if we were to do a manual
        calculation of the trailing decimal:
        <NumDisplay>
          <Latex displayMode>{`$1.\\underbrace{00 \\ldots 0}_{\\phi(n)} \\div n$`}</Latex>
        </NumDisplay>
        we would similarly see a "remainder" of <Latex>$1$</Latex> at this position.
        In otherwords, the decimal will repeat here.
      </div>
      <div id="eulers-4" commentable>
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
              The value
              of <Latex>{`$\\frac{1}{n}$`}</Latex> up to
              the <Latex>{`$\\phi(n)$`}</Latex> decimal position,
              if <Latex>$n$ and $10$</Latex> are coprime
            </li>
            <li>
              The value of <Latex>{`$\\phi(n)$`}</Latex>
            </li>
            <li>
              The list of integers counted by <Latex>{`$\\phi(n)$`}</Latex>
            </li>
          </ul>
        </Box>
        <div id="interactive-2" color="primary" commentable>
          <Interactives.EulersDemo/>
        </div>
      </div>
    </div>
    <Typography id="title2" variant="h4" commentable>
      Back on topic?
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
            To demonstrate, try clicking on an exponent value below to show the
            corresponding remainder, or the vice versa.
          </Box>
          <div id="interactive-3" color="primary" commentable>
            <Interactives.Remainders/>
          </div>
        </div>
      </div>
      <div id="body2-2" commentable>
        <Box mb={2}>
          This also means that distinct values <Latex>{'$\\frac{n}{7}$'}</Latex> define the trailing decimal
          as we multiply <Latex>{'$0.\\overline{142857}$'}</Latex> by powers of 10, thus cycling
          through its digits:
        </Box>
        <div id="interactive-4" color="primary" commentable>
          <Interactives.DecimalSlider divisor={7}/>
        </div>
        <Note id="note-2" commentable>
          <b>Note</b>: This interactive in particular was inspired by the comparitively
          concise <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=WUlaUalgxqI"
          >numberphile video</Link> on the same topic.
        </Note>
        <Box mb={2}>
          For comparison, if we do the same with <Latex>{'$0.\\overline{3}$'}</Latex>
        </Box>
        <div id="interactive-5" color="primary" commentable>
          <Interactives.DecimalSlider divisor={3}/>
        </div>
        <Box mt={2} mb={2}>
          Or <Latex>{'$\\frac{1}{21}$'}</Latex>, given by <Latex>{'$0.\\overline{047619}$'}</Latex>
        </Box>
        <div id="interactive-6" color="primary" commentable>
          <Interactives.DecimalSlider divisor={21}/>
        </div>
      </div>
    </div>
    <Typography id="title3" variant="h4" commentable>
      Carry-over
    </Typography>
    <div id="carryover" commentable>
      <div id="carryover-0" commentable>
        If I'm lucky and very not alone, somebody out there is asking about carryover.
        Something like, why does
        <NumDisplay>
          <Latex displayMode>
            {'$2 \\times 0.\\overline{142857} = 0.\\overline{285714}$'}
          </Latex>
        </NumDisplay>
          Automatically mean
        <NumDisplay>
          <Latex displayMode>
            $2 \times 142857 = 285714$
          </Latex>
        </NumDisplay>
        Or, rather, why does the rest of the decimal not matter?
      </div>
      <div id="carryover-1" commentable>
        And the answer is, more or less: it does, and this is most easily noted
        in multiplication by <Latex>$7$</Latex> which gives:
        <NumDisplay>
          <Latex displayMode>
            $142857 \times 7 = 999999$
          </Latex>
        </NumDisplay>
        However, in order for one segment of the decimal to have any impact on the next,
        there needs to be "carryover", which is to say: the length of multiple must
        exceed the length of the number of interest (in this case, the length of the
        multiple must exceed 6 digits).
      </div>
      <div id="carryover-2" commentable>
        <Latex>
          This, of course, doesn't happen when we're multiplying by $n \leq 7$.
          It is also why we can expect larger multiples of $142857$ to no longer preserve
          the original sequence.
        </Latex>
        <Box mt={2}>
          <Latex>
            This does not mean they are entirely uninteresting.  When we consider multiples of the repeating decimal,
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
      <div id="carryover-3">
        <Box mb={2}>
          To see this in action:  try entering a positive
          number into the textbox.
        </Box>
        <Note id="note-3" commentable>
          <b>Note:</b> due to some rather well known technical limitations,
          values of <Latex>{`$n > 63050457833$`}</Latex> will be not quite
          right.  I haven't bound the inputs here mostly because integer
          overflow somehow manages to amuse me, and this is a sandbox so...
        </Note>
        <div id="interactive-7" color="primary" commentable>
          <Interactives.Multiplier/>
        </div>
      </div>
    </div>
    <Typography id="closing-title" variant="h4" commentable>
      So...
    </Typography>
    <div id="closing" commentable>
      <p id="closing-0" commentable>
        That was...fun?  Maybe interesting?  I hope it was something, at least.
      </p>
      <p id="closing-1" commentable>
        Well, in truth, I hope you learned something new.  I hope it got you a
        little excited, even.  And there's so much more I can put here.  So much more
        I want to write down.
        Something like — numbers are kind of amazing, and the study of numbers is something
        I think everybody could enjoy on some level.
      </p>
      <p id="closing-2" commentable>
        But that's just a thought.  In closing: the number 142857 is unique in
        that it is the only cyclic number in <b>decimal</b> (base 10) without a
        leading zero.  Which is just to say 7 is the only number less than 10
        that has the relevant properties.
      </p>
      <p id="closing-2" commentable>
        Of course, the set of circumstances that make 7 such a special number apply
        to other numbers, such as 17.  They also apply to other numbers in other
        numeric systems.  For instance, 8 (written 13 in quinary) is a cyclic
        number in base 5.
      </p>
      <p id="closing-3" commentable>
        On the other hand, cyclic numbers don't exist in all numeric systems, and
        there are reasons for that, as well. But more on that another day.
      </p>
    </div>
  </div>

export default function CyclicNumbers() {
  return(
    <CommentLayout content={content} pageId="cyclic numbers" selected="0" />
  )
}

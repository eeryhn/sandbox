import CommentLayout from '../components/CommentLayout';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';

const content =
  <div id="0" commentable>
    <Typography variant="h5">Hello World</Typography>
    <div>
      <div id="01" commentable>
        <p>
          Hello...friends?  Probably.  I hope.  Nobody else should be here.
        </p>
        <p>
          Welcome to my playground.  Kind of messy and dusty and built from scrapmetal, sawdust, and the questionable gluestick I found in my desk a few years ago.
        </p>
        <p>
          Not really.  I haven't seen a gluestick in years.
        </p>
      </div>
      <div id="02" commentable>
        <p>
          Speaking somewhat seriously, though, this would probably count as a journal or a blog or a sandbox.  Maybe a lab if we're feeling a bit of fluff.
          We all have little toys and trinkets we want to make.
          Silly things we want to do, just because.
          Thoughts and ideas, cool problems, elegant solutions, topped off with somewhat-useful-but-not-currently-in-use trivia.
          We throw it all into the magic binary void and call it sharing, because it kind of is.
        </p>
        <p>
          You never know what's out there, right?  So this is me, sharing.
        </p>
      </div>
      <Typography id="2" variant="subtitle1">And all this sidebar nonsense is...</Typography>
      <div id="1" commentable>
        <p id="8" commentable>
          Just an idea.  A thought that maybe the notes in the margins will always have their place in the margins.
          I wouldn't expect them to always be useful, but they can and do tell stories,
          and that should be reason enough to keep them around.
        </p>
        <p id="9" commentable>
          So this is that.  Well, another, slightly different (in not so meaningful ways) rendition, anyway.
          An experiment and a rather top-heavy toy because I wanted to get closer to talking about
          what we're reading, as we're reading.
        </p>
        <p id="11" commentable>
          A lot of decisions have been made here, anyway.  Most of them probably poor.
          But still, our windows (or my windows) stay large enough these days to entertain this little idea.
          As for mobile...maybe we're getting there.
          In the meantime, I wouldn't expect any of this to work on a phone for...ever.
        </p>
        <p id="10" commentable>
          So that's it.  Welcome to prototype 0.01 (not that anybody asked, but 0.00 was a bigger flop) and my
          (currently empty) box of gimmicks.
        </p>
        <p id="suggestions" commentable>
          Also, if you've made it down here and are feeling merciful, you can also leave suggestions right
          here.
        </p>
      </div>
    </div>
  </div>

export default function Index() {
  return (
    <CommentLayout content={content} pageId="intro" selected="0"/>
  );
}

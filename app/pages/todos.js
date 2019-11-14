import CommentLayout from '../components/CommentLayout';
import Link from 'next/link';
import { List, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MUIListItem from '@material-ui/core/ListItem';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';

const important = [
  {
    primary: "Interactive comments",
    secondary:
      `comment on click => highlight relevant text block?
      do we set it as selected, or just highlight.  Do we scroll to, or leave it?
      Interaction is mildly unclear.`,
    done: true
  },{
    primary: "session renewal",
    secondary: "haha, they just expire after three days for now.  Need to better investigate token renewal.",
    done: false
  },{
    primary: "component adjustments",
    secondary: 'uh...make thing work better yes',
    done: false
  },{
    primary: "Optimizations",
    secondary: "why is it so slow?",
    done: false
  },{
    primary: "Themeing and styling",
    secondary: "this will never be done.  true story",
    done: false
  },{
    primary: "password recovery",
    secondary: "setup mailer, pretty much.  or make a new account, how much do I actually care.  not at all?",
    done: false
  },{
    primary: "User settings",
    secondary: "well I say settings.  Change password, change email, things like that",
    done: false
  }
]

const nth = [
  {
    primary: "badges",
    secondary: "indicate # of comments per block?  Or put it at bottom?  Top?"
  },
  {
    primary: "user pages",
    secondary: "but eh...dun wanna."
  }
]

const content =
  <div id="0" commentable>
    <div id="priority-wrapper" commentable>
      <Typography id="priority-header" variant="h6" commentable>
        Priority...ish
      </Typography>
      <List>
        {important.map( (item, index) => {
          return(
            <div key={index} id={`priority-${index}`} style={{margin: '.5rem 0'}} commentable>
              <ListItem {...item} commentable/>
            </div>
          )
        })}
      </List>
    </div>
    <div id="nth-wrapper" commentable>
      <Typography id="nth-header" variant="h6" commentable>
        Nice to haves
      </Typography>
      <List>
        {nth.map( (item, index) => {
          return(
            <div key={index} id={`nth-${index}`} style={{margin: '.5rem 0'}} commentable>
              <ListItem {...item} commentable/>
            </div>
          )
        })}
      </List>
    </div>
    <div>
      <Typography id="log-header" variant="h6" commentable>
        Logs...kind of
      </Typography>
      <div id="log-body" commentable>
        11.10.2019 - Experimenting with some comment interactivity.  Likely to be
        buggy, but at least we started?
      </div>
    </div>
  </div>


function  ListItem(props) {
  const icon = props.done ? <CheckBox/> : <CheckBoxOutlineBlank/>
  return (
    <div>
      <MUIListItem>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={props.primary}
          secondary={props.secondary}
        />
      </MUIListItem>
    </div>
  )
}

export default function Todos() {
  return (
    <CommentLayout content={content} pageId="neverending story" selected="0"/>
  );
}

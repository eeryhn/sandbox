/** uh...what
 */

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: '0 .875rem',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: '0 1.5rem',
    width: '100%',
    display: 'block'
  },
}))(MuiExpansionPanelDetails);

export default function NavSubmenu(props) {
  const [expanded, setExpanded] = useState(true);

  function handleClick(e) {
    e.stopPropagation();
    setExpanded(!expanded);
  }

  return(
    <ExpansionPanel square expanded={expanded}>
      <ExpansionPanelSummary
        onClick={handleClick}
        expandIcon={<ExpandMoreIcon/>}
        aria-controls={`${props.category}-content`}
        id={`${props.category}-header`}
      >
        {props.category}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

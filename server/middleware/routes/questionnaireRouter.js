const express = require('express');
import CurrentUserContext from '../../../frontend/src/contexts/current-user-context';
import { useContext } from "react";

// Redirect logic for /questionnaire
questionnaireRouter.get('/questionnaire', (req, res) => {
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser) {
    // If user is logged in, redirect them to tether
    return res.redirect(`/users/${currentUser.id}/your-tether`);
  } else {
    // If user is not logged in, redirect to home
    return res.redirect('/');
  }
});

module.exports = questionnaireRouter;

import { useRef, useEffect } from 'react';
import LetterTap from '../tasks/LetterTap';
import PictureMatch from '../tasks/PictureMatch';
import DigraphSpot from '../tasks/DigraphSpot';

/**
 * Routes a task object to the correct task UI component.
 * Tracks whether the current task was answered on the first attempt.
 *
 * Props:
 *   task          — curriculum task object
 *   onCorrect(wasFirstAttempt: boolean) — called when the player taps correctly
 *   onWrong()     — called when the player taps incorrectly
 *
 * The `key={task.id}` prop MUST be set by the parent so this component
 * fully unmounts/remounts on each new task, resetting all state and
 * re-triggering the auto-speak useEffect inside child components.
 */
export default function TaskEngine({ task, onCorrect, onWrong }) {
  const isFirstAttemptRef = useRef(true);

  // Reset first-attempt flag whenever task changes
  // (also handled by key prop but this is a safety net)
  useEffect(() => {
    isFirstAttemptRef.current = true;
  }, [task.id]);

  function handleCorrect() {
    onCorrect(isFirstAttemptRef.current);
  }

  function handleWrong() {
    isFirstAttemptRef.current = false;
    onWrong();
  }

  if (task.type === 'LETTER_TAP') {
    return <LetterTap task={task} onCorrect={handleCorrect} onWrong={handleWrong} />;
  }

  if (task.type === 'PICTURE_MATCH') {
    return <PictureMatch task={task} onCorrect={handleCorrect} onWrong={handleWrong} />;
  }

  if (task.type === 'DIGRAPH_SPOT') {
    return <DigraphSpot task={task} onCorrect={handleCorrect} onWrong={handleWrong} />;
  }

  return null;
}

export const up =
  'polygon(' +
    '0% 0%, '     + /* top left */
    '0% 0%, '     + /* top left */
    '100% 0%, '   + /* top right */
    '100% 0%, '   + /* top right */
    '100% 6%, '   + /* bottom right */
    '97.5% 100%, '+ /* bottom right */
    '2.5% 100%, ' + /* bottom left */
    '0% 7% '       + /* bottom left */
  ')'

export const down =
  'polygon(' +
    '0% 0%, '     + /* top left */
    '0% 0%, '     + /* top left */
    '100% 0%, '+ /* top right */
    '100% 0%, '   + /* top right */
    '97.5% 0%, '   + /* bottom right */
    '100% 100%, '+ /* bottom right */
    '0% 100%, ' + /* bottom left */
    '2.5% 0% '       + /* bottom left */
  ')'

export const left =
  'polygon(' +
    '100% 0%, '+ /* top left */
    '100% 0%, '   + /* top left */
    '0% 0%, '     + /* top right */
    '0% 0.25%, '     + /* top right */
    '100% 5%, '   + /* bottom right */
    '97.5% 95%, '+ /* bottom right */
    '0% 100%, ' + /* bottom left */
    '5% 0% '       + /* bottom left */
  ')'

export const right =
  'polygon(' +
    '0% 0%, '     + /* top left */
    '0% 5%, '     + /* top left */
    '100% 0.25%, '+ /* top right */
    '100% 0%, '   + /* top right */
    '100% 6%, '   + /* bottom right */
    '97.5% 100%, '+ /* bottom right */
    '2.5% 95%, ' + /* bottom left */
    '0% 0% '       + /* bottom left */
  ')'
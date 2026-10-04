# ProScapes Weed Control & Policing Training

This is a self-contained HTML/CSS/JavaScript training prototype based on the supplied
"ProScapes of Atlanta Weed Control Policing Procedures" Word document.

## Open in VS Code

1. Open this folder in VS Code.
2. Open `index.html`.
3. Recommended: install the VS Code "Live Server" extension and choose "Open with Live Server".
4. The course runs entirely in the browser. No Node.js, database, or build process is required for this prototype.

## Included functionality

- ProScapes-style responsive training interface
- Six training topics
- Topic-by-topic navigation
- Locked progression until the current knowledge check is passed
- 80% passing score
- Multiple-choice knowledge checks
- Retake capability
- Progress bar and completion indicators
- Previous / Next navigation
- Final acknowledgement checkbox
- Completion screen
- Local browser storage so progress persists on the same browser/device

## Important content review note

The source document contains chemical safety, disposal, and first-aid instructions. This prototype
presents those instructions as source material, but it intentionally flags areas that should be
reviewed by a qualified safety/pesticide professional before the course is used as official training.

In particular, the original document's swallowed-exposure section includes instructions concerning
inducing vomiting. The prototype does not silently rewrite the source; it warns users to follow
current product-label and emergency/poison-control guidance and recommends a formal safety review.

## Suggested next development steps

1. Add the actual ProScapes logo and brand colors.
2. Add employee name entry and completion record.
3. Add administrator/reporting capability if completion records need to be retained.
4. Consider requiring a higher passing score for safety-critical sections.
5. Add randomized question banks so employees cannot simply memorize answer positions.
6. Add a printable/downloadable completion certificate.
7. If this will be used company-wide, move completion records from localStorage to a database.


## Visual theme update

The training interface has been restyled to match the supplied ProScapes Employee Portal / Reset
Password page: centered ProScapes branding, white background, light-gray content panels,
blue-to-purple gradient action buttons, and simplified portal typography.

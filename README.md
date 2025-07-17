Take-home task
===

AI Hand Holding
---

I used ChatGPT to help me with:
- twig templating & it's nuances
- the booking controller template (not the data structure)
- CSS grid generation
- web component fiddly bits

Assumptions
---

- Rate limiter
- Caching
- Some sort of vanilla js set of tools

Limitations
---

- No hot reload
- Icons in the figma design were not all proper svgs (I know it wasn't required to copy it 100% but I wanted to impress, so you have the foundation in the code to add later)
- Sometimes slow load times and/or caching problems


General notes
---

- I included Bootstrap and didn't even use it, probably just use the grid system
- Better logic for the dropdown display when clicking a button - you can open multiple at once (needs a global click event on the body)
- Find a better way to have the navbar links included or loaded from somewhere else and not in the include
- Mobile version of status change button doesn't make sense (doesn't exist) with wording and would require a re-think.. It should open a modal
- Some of the font sizes and spacing between elements from the design needs to be looked into again as it feels a bit clunky with regards the visual hierarchy 
- Would have been good to add pagination & maybe a unit test

Getting it running
---
Repeat OG instuctions and then run

`npm install` in the root folder (not in Docker)

`npm run build` to generate assets in the public folder
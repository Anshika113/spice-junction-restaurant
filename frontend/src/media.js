/* ===========================================================================
   THE ONE FILE TO EDIT WHEN REAL PHOTOS ARRIVE.

   Right now every picture on the site is a generated placeholder living in
   public/img/ (see scripts/make-placeholders.mjs). To go live:

     1. Put the client's photos in frontend/public/img/ as WebP.
        Dishes square (800x800), offers 16:9, hero square-ish.
     2. Change the extension below from '.svg' to '.webp'. That's it —
        file names stay the same as the ids in content.json.
     3. Any dish without a photo file falls back to the drawn plate art
        automatically, so a missing file never leaves a hole in the grid.
   =========================================================================== */

const EXT = '.svg' // -> '.webp' once real photos are in place

export const IMG = {
  dish: (id) => `/img/dishes/${id}${EXT}`,
  offer: (id) => `/img/offers/${id}${EXT}`,
  hero: () => `/img/hero${EXT}`,
  og: () => `/img/og${EXT}`,
}

/** True while the site is still running on generated stand-ins. Drives the
 *  "replace these" note in the footer — flip EXT above and it disappears. */
export const USING_PLACEHOLDERS = EXT === '.svg'

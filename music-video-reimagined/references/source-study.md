# Phase 1: study the source video

The goal is to understand the original well enough to reinvent it: what it *looks* like, what it *does*, and which
moments fans would recognise. You're not going to copy it shot for shot. You're going to translate its ideas into the
Clawd world.

## Get the files
```bash
bash scripts/fetch_reference.sh "https://www.youtube.com/watch?v=..." ref source        # the music video
bash scripts/fetch_reference.sh "https://x.com/.../video/1" ref style                    # any style reference the user gave
```
The script walks through YouTube player clients (mweb, web_safari, tv, ios…) because the default is often refused with
a 403. If every client fails, `brew upgrade yt-dlp` and retry. Note the video's total length and where the music
starts: many official videos have a silent or cinematic intro before the song.

Also download any style reference the user points to. The P(doom) music video (github.com/JohnHeibel/PDoomVideo) is
the original showcase for this kit; if the user gives no style reference, its look (warm watercolour, ink outlines,
theatrical sets, big readable Clawds) is the default target.

## Look at it
```bash
python3 scripts/contact_sheet.py ref/source.mp4 ref/sheets/src --step 2          # the whole video, one frame / 2 s
python3 scripts/contact_sheet.py ref/source.mp4 ref/sheets/zoom --step .25 --t0 50 --t1 58   # a moment, closely
```
Read every sheet (Read tool). Then write a short `SOURCE_NOTES.md` covering:

1. **Settings and props.** Where does it happen? List the furniture, objects and textures that define each place
   (Papercut: damask wallpaper, a Chesterfield, an antique DJ desk, lamps, a winged statue, a creepy portrait).
2. **Palette and light.** The main colours, the lighting mood, and how they change over the video.
3. **Cast.** Everyone who appears and their role. For each performer, list the *signatures* that make them
   recognisable as a silhouette: hair, headwear, eyewear, clothing colours and patterns, instrument, accessories,
   posture, signature moves. These become the Clawd designs.
4. **Who performs when.** From close-ups and lip-sync, note roughly who sings or plays in each part of the song. It
   decides who the camera follows in each section.
5. **Signature moments.** The shots, gags, effects and camera moves people remember, with timestamps (Papercut: the
   portrait getting creepier, the shadow figure copying the rapper, the split set, the bugs, the dragonfly, the empty
   room at the end).
6. **Structure and arc.** Is there a story? An emotional arc? Does the video escalate? How does it end?
7. **Camera language.** One continuous take? Cuts on every beat? Slow drifts? Static? Split screens?
8. **What NOT to carry over.** On-screen lyrics or text, logos, brand placements, well-known copyrighted characters
   that appear in the video (these get replaced by original characters), and anything that would be distasteful as a
   cute cartoon (real violence, sexual content). Note what you'll do instead.

## The song's meaning
Write one or two sentences, **in your own words**, about what the song is about (Papercut: paranoia, and a presence
under your skin that you can't get away from). Never quote lines, not even in notes: the concept has to come from the
meaning, not the words. If you're unsure of the meaning, work from the music's mood and the video's imagery.

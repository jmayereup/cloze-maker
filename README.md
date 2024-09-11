# cloze-maker
A web component to generate cloze exercises.

Add the script to your server and link to it with script tags.
<script src="file location"></script>

After that just enclose the text that you want to turn into
a cloze exercise between the html tags.

<cloze-maker id="cloze1"> 
Text to be turned into a *blank* space goes between
asteriks. All text in between the tags will be
replaced by the *game* when your page loads.
</cloze-maker>

If you want to use more than one game per page, just change the ID "cloze1" of the 
second game to something else.

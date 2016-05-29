MaterialCard
============

All available options
---------------------
```HTML
<MaterialCard>

  <MaterialCard.Title>Title</MaterialCard.Title>
  
  <MaterialCard.Media>Media</MaterialCard.Media>
  
  <MaterialCard.Text>Supporting Text</MaterialCard.Text>
  
  <MaterialCard.Actions>Actions</MaterialCard.Actions>

</MaterialCard>
```

Styling (SASS)
--------------
```SCSS
@import "{zodiase:mdl-react}/components/card/card";
```

Examples
--------
A card (no shadow) with a title, image, text, and action.
```HTML
<MaterialCard>
  <MaterialCard.Title>
     <MaterialCard.TitleText>Auckland Sky Tower<br>Auckland, New Zealand</MaterialCard.TitleText>
  </MaterialCard.Title>
  <MaterialCard.Media>
    <img src="skytower.jpg" width="173" height="157" border="0" alt=""
     style="padding:10px;">
  </MaterialCard.Media>
  <MaterialCard.Text>
  The Sky Tower is an observation and telecommunications tower located in Auckland,
  New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
  in the Southern Hemisphere.
  </MaterialCard.Text>
  <MaterialCard.Actions>
     <a href="http://en.wikipedia.org/wiki/Sky_Tower_%28Auckland%29">Wikipedia entry</a>
  </MaterialCard.Actions>
</MaterialCard>

<!-- Equivalent to (with zodiase:mdl) -->

<div class="mdl-card">
  <div class="mdl-card__title">
     <MaterialCard.TitleText>Auckland Sky Tower<br>Auckland, New Zealand</MaterialCard.TitleText>
  </div>
  <div class="mdl-card__media">
    <img src="skytower.jpg" width="173" height="157" border="0" alt=""
     style="padding:10px;">
  </div>
  <div class="mdl-card__supporting-text">
  The Sky Tower is an observation and telecommunications tower located in Auckland,
  New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
  in the Southern Hemisphere.
  </div>
  <div class="mdl-card__actions">
     <a href="http://en.wikipedia.org/wiki/Sky_Tower_%28Auckland%29">Wikipedia entry</a>
  </div>
</div>
```

Card (level-3 shadow) with an image, caption, and text.
```HTML
<MaterialCard className="mdl-shadow--4dp">
  <MaterialCard.Media>
    <img src="skytower.jpg" width="173" height="157" border="0"
      alt="" style="padding:10px;">
  </MaterialCard.Media>
  <MaterialCard.Text>
    Auckland Sky Tower, taken March 24th, 2014
  </MaterialCard.Text>
  <MaterialCard.Text>
  The Sky Tower is an observation and telecommunications tower located in Auckland,
  New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
  in the Southern Hemisphere.
  </MaterialCard.Text>
</MaterialCard>

<!-- Equivalent to (with zodiase:mdl) -->

<div class="mdl-card mdl-shadow--4dp">
  <div class="mdl-card__media">
    <img src="skytower.jpg" width="173" height="157" border="0"
      alt="" style="padding:10px;">
  </div>
  <div class="mdl-card__supporting-text">
    Auckland Sky Tower, taken March 24th, 2014
  </div>
  <div class="mdl-card__supporting-text">
  The Sky Tower is an observation and telecommunications tower located in Auckland,
  New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
  in the Southern Hemisphere.
  </div>
</div>
```
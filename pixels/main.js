function randomHex() {
  return 255 * Math.random() | 0;
}

function randomColor(transparent) {
  var r = randomHex(),
      g = randomHex(),
      b = randomHex(),
      a = Math.random();
  return 'rgb' + (transparent ? 'a(' : '(') + r + ', ' + g + ', ' + b + (transparent ? ', ' + a : '') + ')';
}

function generate() {
  var width = parseInt(document.getElementById('widthInput').value);
  var transparent = document.getElementById('transparent').checked;
  var height = parseInt(document.getElementById('heightInput').value);
  var pixel = parseInt(document.getElementById('pixelInput').value);
  var ctx = canvas.getContext('2d');
  var x, y = 0;

  width = width - (width % pixel);
  height = height - (height % pixel);

  ctx.canvas.width = width;
  ctx.canvas.height = height;

  for(; y < height; y += pixel) {
    for(x = 0; x < width; x += pixel) {
        ctx.fillStyle = randomColor(transparent);
        ctx.fillRect(x, y, pixel, pixel);
    }
  }

  document.getElementById('saveButton').disabled = "";
}

function save() {
  var url = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.download = "random-pixels.png";
  link.href = url;
  document.body.appendChild(link);
  link.click();
}

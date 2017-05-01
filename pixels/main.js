function randomHex() {
    return 255 * Math.random() | 0; // | 0 to convert to int
}

function randomColor(transparent) {
    var r = randomHex(),
        g = randomHex(),
        b = randomHex(),
        a = Math.random();

    // Use rgba if transparency is enabled, otherwise just use rgb
    if (transparent)
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    else
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function generate(draw = true) {
	// Get values from forms
    var width = parseInt(document.getElementById('widthInput').value);
    var transparent = document.getElementById('transparent').checked;
    var height = parseInt(document.getElementById('heightInput').value);
    var pixel = parseInt(document.getElementById('pixelInput').value);

    // Create pre-render canvas for efficiency
    var prerender = document.createElement('canvas');
    var preCtx = prerender.getContext('2d');

    // Round canvas down to the nearest "pixel" so it doesn't cut it off
    preCtx.canvas.width = width -= (width % pixel);
    preCtx.canvas.height = height -= (height % pixel);

    // Set each pixel
    for (var y = 0; y < height; y += pixel) {
        for (var x = 0; x < width; x += pixel) {
            preCtx.fillStyle = randomColor(transparent);
            preCtx.fillRect(x, y, pixel, pixel);
        }
    }

    // Add to page if necessary
    if (draw) {
        var ctx = canvas.getContext('2d');
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.drawImage(prerender, 0, 0);

        // Enable the save button since its been generated
        document.getElementById('saveButton').disabled = "";
    }

    return prerender;
}

function feelingLucky() {
    save(generate(false));
}

function save(c = canvas) {
    // Convert to image and download it
    downloadUrl(c.toDataURL("image/png"));
}

function downloadUrl(url) {
    // Create download link and click it
    var link = document.createElement("a");
    link.download = "random-pixels.png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
}
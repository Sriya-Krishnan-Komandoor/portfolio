const lightState = {
    living: true,
    bedroom: true,
    kitchen: true
};

function toggleLight(room) {
    lightState[room] = !lightState[room];
    const image = document.querySelector("." + room);

    image.style.filter = lightState[room]
        ? "brightness(0.7)"
        : "brightness(0.1)";
}

function changeBrightness(room, value) {
    if (!lightState[room]) return;

    const image = document.querySelector("." + room);
    const brightness = value / 100;
    image.style.filter = `brightness(${brightness})`;
}

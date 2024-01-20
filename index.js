let mouseX;
let mouseY;

let deltaX = 0;
let deltaY = 0;

let selectedObject;

const body = document.querySelector("body");
const boundingBox = document.getElementById("boundingBox");

addEventListener("mousedown", selectObjectAtMousePos)
addEventListener("mousedown", getDeltaPosition)
addEventListener("mousemove", getMouseCoordinates)
addEventListener("mousemove", moveSelectedObjectToMouse)
addEventListener("mouseup", event => selectedObject = null)

function getMouseCoordinates(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function selectObjectAtMousePos(event) {
    selectedObject = document.elementFromPoint(mouseX, mouseY);

    if (selectedObject == null) return;

    if (selectedObject == body || !selectedObject.classList.contains("draggable")) selectedObject = null;
}

// required so that dragged element top left
// is not teleported to mouse.
// If this is not needed, just remove
// the addEventListener with the "getDeltaPosition" func
function getDeltaPosition(event) {
    if (selectedObject == null) return;

    const _rect = selectedObject.getBoundingClientRect();

    deltaX = _rect.x - mouseX;
    deltaY = _rect.y - mouseY;
}

function moveSelectedObjectToMouse(event) {
    if (selectedObject == null) return;

    // can remove if draggable class
    // has position set to absolute
    selectedObject.style.position = "absolute";

    const [X, Y] = clampPosWithinBoundingBox(mouseX + deltaX, mouseY + deltaY, selectedObject.getBoundingClientRect());
    // THE px HAS TO USE '' instead of "" or ``
    selectedObject.style.left = X + 'px';
    selectedObject.style.top = Y + 'px';
}

function clampPosWithinBoundingBox(x, y, clampedObjectRect) {
    if (boundingBox == null) {
        return [x, y];
    }

    const _boundingBoxRect = boundingBox.getBoundingClientRect();

    let _clampedX = x;
    
    if (clampedObjectRect.right > _boundingBoxRect.right) {
        _clampedX = _boundingBoxRect.right - clampedObjectRect.width;
    }

    else if (x < _boundingBoxRect.left) {
        _clampedX = _boundingBoxRect.left;
    }

    let _clampedY = y;

    // conditions for y are seemingly inverted
    // because y increases as element goes down
    if (y < _boundingBoxRect.top) {
        _clampedY = _boundingBoxRect.top;
    }

    else if (clampedObjectRect.bottom > _boundingBoxRect.bottom) {
        _clampedY = _boundingBoxRect.bottom - clampedObjectRect.height;
    }

    console.log(`Clamped Coords: (${_clampedX}, ${_clampedY})`)

    return [_clampedX, _clampedY];
}
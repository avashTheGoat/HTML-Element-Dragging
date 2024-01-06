let mouseX;
let mouseY;

// required so that object top left
// is not teleported to mouse
// if it is not needed, just remove
// the addEventListener adding "getDeltaPosition"
let deltaX = 0;
let deltaY = 0;

let selectedObject;

const body = document.querySelector("body");

addEventListener("mousemove", getMouseCoordinates)
addEventListener("mousedown", selectObjectAtMousePos)
addEventListener("mousedown", getDeltaPosition)
addEventListener("mousemove", moveSelectedObjectToMouse)
addEventListener("mouseup", unselectObject)

function getMouseCoordinates(event)
{
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function selectObjectAtMousePos(event)
{
    selectedObject = document.elementFromPoint(mouseX, mouseY);

    if (selectedObject == body) selectedObject = null;
}

function getDeltaPosition(event)
{
    const _rect = selectedObject.getBoundingClientRect();

    deltaX = _rect.x - mouseX;
    deltaY = _rect.y - mouseY;
}

function moveSelectedObjectToMouse(event)
{
    if (selectedObject != null)
    {
        selectedObject.style.position = "absolute";
        // THE px HAS TO USE '' instead of "" or ``
        selectedObject.style.left = (mouseX + deltaX) + 'px';
        selectedObject.style.top = (mouseY + deltaY) + 'px';
    }
}

function unselectObject(event)
{
    selectedObject = null;
}
To add dragging into your project, just copy and paste the code from the index.js file into your own file.
Also, all elements are draggable with this code, so to prevent that, you can just add an if statement in the selectObjectAtMousePos function that sets the selected object to null if its class is not "selectable" or whatever you name it.

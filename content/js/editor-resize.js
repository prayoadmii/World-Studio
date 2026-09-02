const editor = document.querySelector('.editor');

const leftHandle = document.querySelector('.resize-left');
const rightHandle = document.querySelector('.resize-right');

let resizing = null;

const MIN_LEFT_WIDTH = 150;
const MAX_LEFT_WIDTH = 500;

const MIN_RIGHT_WIDTH = 150;
const MAX_RIGHT_WIDTH = 500;


leftHandle.addEventListener('mousedown', (event) => {
    event.preventDefault();

    resizing = {
        type: 'left',
        startX: event.clientX,
        startWidth: editor
            .getBoundingClientRect()
            .width
    };

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
});


rightHandle.addEventListener('mousedown', (event) => {
    event.preventDefault();

    resizing = {
        type: 'right',
        startX: event.clientX
    };

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
});


document.addEventListener('mousemove', (event) => {
    if (!resizing) {
        return;
    }

    const editorRect = editor.getBoundingClientRect();

    if (resizing.type === 'left') {

        const width =
            event.clientX - editorRect.left;

        const clampedWidth = Math.max(
            MIN_LEFT_WIDTH,
            Math.min(MAX_LEFT_WIDTH, width)
        );

        editor.style.setProperty(
            '--left-width',
            `${clampedWidth}px`
        );
    }

    if (resizing.type === 'right') {

        const width =
            editorRect.right - event.clientX;

        const clampedWidth = Math.max(
            MIN_RIGHT_WIDTH,
            Math.min(MAX_RIGHT_WIDTH, width)
        );

        editor.style.setProperty(
            '--right-width',
            `${clampedWidth}px`
        );
    }
});


document.addEventListener('mouseup', () => {

    if (!resizing) {
        return;
    }

    resizing = null;

    document.body.style.cursor = '';
    document.body.style.userSelect = '';
});
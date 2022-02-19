function loadPage(pageNum) {
    const r = Render.getRenderer();
    r.setPage(pageNum);
}

function largerImage(src, alt) {
    const m = new Modal(alt, src);
    m.open();
}

const r = Render.getRenderer();
r.get('nature', 50);


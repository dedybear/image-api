class Render {

    static pageNumber = 1;
    static render;
    static imageList = [];
    perPage = 10;
    
    static getRenderer() {
        if ( !Render.render ) {
            Render.render = new Render();
        }
        return Render.render;
    }

    get(keyword = 'nature', listCount = 10) {
        const service = new DataService();
        
        service.get(keyword, listCount).then(res => {
            const data = ('data' in res) ? res.data : [];

            this.clearLoader();

            if ( data.length === 0 ) {
                this.renderError();
                return;
            } 

            Render.imageList = data;

            this.setPage(1);
        });
    }

    setPage(pageNum) {
        Render.pageNumber = pageNum;
        this.clearPagination();
        this.clearImages();
        this.drawPagination();
        this.drawImages();
    }

    clearPagination() {
        const util = this.getUtil();
        util.$('pagination').innerHTML = '';
    }

    clearImages() {
        const util = this.getUtil();
        util.$('photo-area').innerHTML = '';
    }

    clearLoader() {
        const util = this.getUtil();
        util.$$('.loading').style.display = 'none';
    }

    getUtil() {
        return new Util();
    }

    drawPagination() {
        const util = this.getUtil();
        let pageCount = 1;
        if ( this.perPage > 0 && Render.imageList.length > 0 ) {
            pageCount = Math.ceil(Render.imageList.length/this.perPage);
        }

        if ( pageCount > 1 ) {
            util.$('pagination').style.display = 'block';
            for ( let i = 1; i <= pageCount; i++ ) {
                const classes = ['page-num', 'f1'];
                if ( Render.pageNumber === i ) {
                    classes.push('selected');
                }
                const btn = util.buildEl('button', classes, {
                    innerHTML: i,
                    title: `Page ${i}`
                });
                btn.addEventListener('click', () => loadPage(i));

                util.$('pagination').appendChild(btn);
            }
        } else {
            util.$('pagination').style.display = 'none';
        }
    }

    drawImages() {
        const validMinIdx = (Render.pageNumber - 1) * this.perPage;
        const validMaxIdx = validMinIdx + this.perPage;
        const list = Render.imageList.slice(validMinIdx, validMaxIdx);

        list.forEach(element => {
            this.renderToScreen(element);
        });
    }

    renderToScreen(element) {
        const util = new Util();
        const flex = util.buildEl('div', ['f1']);

        const img = util.buildEl('img', ['clickable'], {
            src: element.images.original.url,
            alt: element.title 
        });

        img.addEventListener('click', () => largerImage(element.images.original.url, element.title));

        flex.appendChild(img);

        util.$('photo-area').appendChild(flex);
    }
}

if ( 'undefined' !== typeof module ) {
    module.exports = Render;
}
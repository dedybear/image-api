class Modal {
    title = '';
    content = '';
    util = new Util();

    static dontClose(event) {
        event.stopPropagation();
    }

    static close() {
        const util = new Util();
        const modal = util.$$('.modal');
        const modalBck = util.$$('.modal-bckgrnd');
        if ( modal ) {
            document.getElementsByTagName('body')[0].removeChild(modal);
        }
        if ( modalBck ) {
            document.getElementsByTagName('body')[0].removeChild(modalBck);
        }
    }

    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    open() {
        const bckgrndDiv = this.util.buildEl('div', ['modal-bckgrnd']);
        bckgrndDiv.addEventListener('click', Modal.close());
        
        document.getElementsByTagName('body')[0].appendChild(bckgrndDiv);
        document.getElementsByTagName('body')[0].appendChild(this.buildModal());
    }

    buildModal() {
        const modalDiv = this.util.buildEl('div', ['modal']);
        modalDiv.appendChild(this.buildHeader());
        modalDiv.appendChild(this.buildContent());
        modalDiv.appendChild(this.buildFooter());
        return modalDiv;
    }

    buildHeader() {
        const headerDiv = this.util.buildEl('div', ['modal-header', 'flex-nw']);

        const title = this.util.buildEl('h2', ['f1']);
        title.innerHTML = this.title;

        headerDiv.appendChild(title);

        const btn = this.util.buildEl('button', ['modal-close'], {
            innerHTML: 'X',
            title: `Close Modal`
        });
        btn.addEventListener('click', () => Modal.close());
        headerDiv.appendChild(btn);

        return headerDiv;
    }

    buildContent() {
        const contentDiv = this.util.buildEl('div', ['modal-content']);

        const img = this.util.buildEl('img', [], {
            src: this.content,
            alt: this.title
        })
        contentDiv.appendChild(img);

        return contentDiv;
    }

    buildFooter() {
        const footerDiv = this.util.buildEl('div', ['modal-footer']);

        const btn = this.util.buildEl('button', ['modal-close'], {
            innerHTML: 'Close',
            title: `Close Modal`
        });
        btn.addEventListener('click', () => Modal.close());
        footerDiv.appendChild(btn);

        return footerDiv;
    }
}
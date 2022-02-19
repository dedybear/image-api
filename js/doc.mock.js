class DocMock {
    id = '';
    tagName = '';
    classList = [];
    attrList = {};
    children = [];
    style = {
        display: ''
    };

    constructor(tagName, id = '', classList = [], attrList = {}) {
        this.tagName = tagName;
        this.classList = classList;
        this.attrList = attrList;
        this.id = id;
    }

    reset() {
        this.id = '';
        this.tagName = '';
        this.classList = [];
        this.attrList = {};
        this.children = [];
        this.style = {
            display: ''
        };
    }

    appendChild(child) {
        if ( child.id === '' ) {
            child.id = Math.floor(Math.random() * 999999) + 100000;
        }
        
        const idx = this.children.findIndex(existing => existing.id === child.id);
        if ( idx > -1 ) {
            return;
        }
        this.children.push(child);
    }

    getElementById(id) {
        const idx = this.children.findIndex(child => child.id === id);
        return this.children[idx];
    }
    
    addEventListener(type, callBack) {
        return '';
    }

}

if ( 'undefined' !== typeof module ) {
    module.exports = DocMock;
}
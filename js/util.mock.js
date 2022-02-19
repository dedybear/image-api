const DocMock = require('./doc.mock');

class UtilMock {

    dom;
    
    setDom(d) {
        this.dom = d;
    }
    
    $$(id) {
        return {};
    }

    $(id) {
        return this.dom.getElementById(id);
    }
    
    buildEl(type, classes = [], attrs = {}) {
        const el = new DocMock(type);
        classes.forEach(cls => {
            el.classList.push(cls);
        });

        for ( let attr of Object.keys(attrs)) {
            el.attrList[attr] = attrs[attr];
        }

        return el;
    }
}

if ( 'undefined' !== typeof module ) {
    module.exports = UtilMock;
}

class Util {
    $$(selector) {
        return document.querySelector(selector);
    }
    
    $(selector) {
        return document.getElementById(selector);
    }
    buildEl(type, classes = [], attrs = {}) {
        const el = document.createElement(type);
        classes.forEach(cls => {
            el.classList.add(cls);
        });
        for ( let attr of Object.keys(attrs)) {
            el[attr] = attrs[attr];
        }
        return el;
    }
}
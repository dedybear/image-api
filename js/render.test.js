const { expect } = require("@jest/globals");
const Render = require('./render');
const DocMock = require('./doc.mock');
const UtilMock = require('./util.mock');

describe('Render Class: drawPagination', () => {
    let render = new Render();
    let pagination = new DocMock('div', 'pagination');
    const dom = new DocMock();
    const utilMock = new UtilMock();
    utilMock.setDom(dom);

    beforeEach(() => {
        render = new Render();
        utilMock.setDom(dom);
        render.getUtil = jest.fn(() => utilMock );
        pagination = new DocMock('div', 'pagination');
        dom.appendChild(pagination);
    });

    it('should add nothing with pagination called with no data', () => {
        jest.spyOn(dom, 'appendChild');
        dom.appendChild(pagination);

        render.drawPagination();
        const paginationNode = utilMock.dom.children[0];

        expect(paginationNode.children.length).toBe(0);
        expect(paginationNode.style.display).toBe('none');
    });

    it('should buttons with pagination called with data', () => {
        jest.spyOn(dom, 'appendChild');
        Render.imageList[49] = {};
        render.perPage = 10;
        render.drawPagination();
        const paginationNode = utilMock.dom.children[0];
        
        expect(paginationNode.children.length).toBe(5);
        expect(paginationNode.style.display).toBe('block');
    });
});
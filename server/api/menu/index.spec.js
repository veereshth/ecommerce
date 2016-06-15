'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var menuCtrlStub = {
  index: 'menuCtrl.index',
  show: 'menuCtrl.show',
  create: 'menuCtrl.create',
  update: 'menuCtrl.update',
  destroy: 'menuCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var menuIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './menu.controller': menuCtrlStub
});

describe('Menu API Router:', function() {

  it('should return an express router instance', function() {
    expect(menuIndex).to.equal(routerStub);
  });

  describe('GET /api/menus', function() {

    it('should route to menu.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'menuCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/menus/:id', function() {

    it('should route to menu.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'menuCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/menus', function() {

    it('should route to menu.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'menuCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/menus/:id', function() {

    it('should route to menu.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'menuCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/menus/:id', function() {

    it('should route to menu.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'menuCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/menus/:id', function() {

    it('should route to menu.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'menuCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

'use strict';

var app = require('../..');
import request from 'supertest';

var newMenu;

describe('Menu API:', function() {

  describe('GET /api/menus', function() {
    var menus;

    beforeEach(function(done) {
      request(app)
        .get('/api/menus')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          menus = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(menus).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/menus', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/menus')
        .send({
          name: 'New Menu',
          info: 'This is the brand new menu!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMenu = res.body;
          done();
        });
    });

    it('should respond with the newly created menu', function() {
      expect(newMenu.name).to.equal('New Menu');
      expect(newMenu.info).to.equal('This is the brand new menu!!!');
    });

  });

  describe('GET /api/menus/:id', function() {
    var menu;

    beforeEach(function(done) {
      request(app)
        .get('/api/menus/' + newMenu._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          menu = res.body;
          done();
        });
    });

    afterEach(function() {
      menu = {};
    });

    it('should respond with the requested menu', function() {
      expect(menu.name).to.equal('New Menu');
      expect(menu.info).to.equal('This is the brand new menu!!!');
    });

  });

  describe('PUT /api/menus/:id', function() {
    var updatedMenu;

    beforeEach(function(done) {
      request(app)
        .put('/api/menus/' + newMenu._id)
        .send({
          name: 'Updated Menu',
          info: 'This is the updated menu!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMenu = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMenu = {};
    });

    it('should respond with the updated menu', function() {
      expect(updatedMenu.name).to.equal('Updated Menu');
      expect(updatedMenu.info).to.equal('This is the updated menu!!!');
    });

  });

  describe('DELETE /api/menus/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/menus/' + newMenu._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when menu does not exist', function(done) {
      request(app)
        .delete('/api/menus/' + newMenu._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

'use strict';

//var express = require('express');
//var controller = require('./room.controller');
import {Router} from 'express';
import * as controller from './room.controller'

var router = new Router();

router.get('/', controller.index);
router.get('/hotjoin', controller.indexHotjoin);
router.get('/:id', controller.show);
router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;

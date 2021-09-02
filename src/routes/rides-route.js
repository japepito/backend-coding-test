const express = require('express');
const bodyParser = require('body-parser');
const { ridesService } = require('../services');
const paginateService = require('../utilities/paginate-service');
const {
  SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE
} = require('../constants/status-codes-constants');
const { NOT_FOUND_ERROR } = require('../constants/errors-constants');
const {
  VALIDATION_ERROR_CODE
} = require('../constants/validation-errors-constants');
const logger = require('../logger');

const jsonParser = bodyParser.json();
const router = express.Router();

router.post('/', jsonParser, async (req, res) => {
  try {
    const result = await ridesService.createRide(req.body);

    res.send(result);
  } catch (err) {
    logger.error(err);

    if (err.error_code === VALIDATION_ERROR_CODE) {
      return res.status(BAD_REQUEST_ERROR_CODE).send(err);
    }
    res.status(SERVER_ERROR_CODE).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const { limit, page } = req.query;
    const result = await ridesService.getAllRide(req.query);
    const paginate = paginateService.paginate(result, limit, page);

    res.send(paginate);
  } catch (err) {
    logger.error(err);

    if (err.error_code === NOT_FOUND_ERROR.error_code) {
      return res.status(NOT_FOUND_ERROR_CODE).send(err);
    }

    res.status(SERVER_ERROR_CODE).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await ridesService.getRideById(req.params.id);

    res.send(result);
  } catch (err) {
    logger.error(err);

    if (err.error_code === NOT_FOUND_ERROR.error_code) {
      return res.status(NOT_FOUND_ERROR_CODE).send(err);
    }

    res.status(SERVER_ERROR_CODE).send(err);
  }
});

module.exports = router;

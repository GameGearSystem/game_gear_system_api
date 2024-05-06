import express from "express";
import { getDevices, getDevice, createDevice, updateDevice, deleteDevice } from "../controllers/device.controller";
import tokenValidatorMiddleware from "../core/middlewares/token-validator.middleware";

const router = express.Router();

router.get("/", tokenValidatorMiddleware, getDevices);
router.get("/:uuid", tokenValidatorMiddleware, getDevice);
router.post("/", tokenValidatorMiddleware, createDevice);
router.put("/:uuid", tokenValidatorMiddleware, updateDevice);
router.delete("/:uuid", tokenValidatorMiddleware, deleteDevice);


export default router;
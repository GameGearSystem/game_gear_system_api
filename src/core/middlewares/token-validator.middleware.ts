import express from 'express';

import { verifyToken } from '../utils/security'; 

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    // Extraer el token del encabezado 'Authorization'
    let token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    // Verificar si el token tiene el prefijo 'Bearer '
    if (token.startsWith('Bearer ')) {
      // Quitar el prefijo 'Bearer ' para obtener solo el token
      token = token.slice(7, token.length);
    } else {
      return res.status(401).json({ msg: 'Invalid token format' });
    }

    // Utilizar la función verifyToken
    const { valid, decoded, error } = verifyToken(token);
    if (!valid) {
      return res.status(401).json({ msg: 'Token is not valid', error });
    }

    // Añadir el usuario decodificado a la solicitud
    req.user = { userId: decoded }; ;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Failed to authenticate token', error });
  }
}
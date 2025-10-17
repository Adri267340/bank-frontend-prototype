import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error global:", err.message);
  res.status(500).render("error", { mensaje: "Ocurrió un error en el servidor 💔" });
};

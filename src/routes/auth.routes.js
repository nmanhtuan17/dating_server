import { Router } from "express";
import { AuthCrl } from "@/controler/auth/auth.crl";

const router = Router();
router.post('/sign-in', AuthCrl.sigIn);
router.post('/register', AuthCrl.register);
router.post('/verify', AuthCrl.verify)
export default router;

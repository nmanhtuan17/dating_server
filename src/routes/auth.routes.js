import { Router } from "express";
import { AuthCrl } from "@/controler/auth/auth.crl";

const router = Router();
router.get('/sign-in', AuthCrl.sigin);
router.post('/register', AuthCrl.register);
export default router;

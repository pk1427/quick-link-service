import { Router } from "oak";
import { URLController } from "../controllers/urlController.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = new Router();

router.post("/shorten", authMiddleware, URLController.shortenUrl);
router.get("/:code", URLController.redirectUrl);

export default router;

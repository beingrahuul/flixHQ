import { Router } from 'express'
import watch from '../../extractor/watch/watch.js';
const router = Router()

router.get("/:type/:server/:id", async (req, res) => {
    const {type, server, id} = req.params;
    const result = await watch(id, type, server);
    res.status(200).json({"results": result})
})

export default router;

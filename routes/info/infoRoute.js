import { Router } from 'express'
import movie_info from '../../extractor/info/movieInfo.js';
import tv_info from '../../extractor/info/tvInfo.js';
const router = Router()

router.get("/:type/:id", async (req, res) => {
    const {type, id} = req.params;
    const result = (type === 'movie') ? await movie_info(type, id) : await tv_info(type, id)
    res.status(200).json({"results": result})
})

export default router;

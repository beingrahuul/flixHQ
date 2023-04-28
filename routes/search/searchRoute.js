import { Router } from 'express'
import search from "../../extractor/search/index.js"
const router = Router()

router.post("/", async (req, res) => {
    const query = req.body.query
    const page = req.body.page === undefined ? 1 : req.body.page;
    const results = await search(query, page)
    res.status(200).json(results)
})

export default router;
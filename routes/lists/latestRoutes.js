import { Router } from 'express'
const router = Router()
import latestMovies from "../../extractor/latest/latestMovies.js"
import latestTv from "../../extractor/latest/latestTv.js"

router.get('/movies', async (req, res) => {
    const results = await latestMovies();
    res.status(200).json(results)
})

router.get('/tv', async (req, res) => {
    const results = await latestTv();
    res.status(200).json(results)
})

export default router;
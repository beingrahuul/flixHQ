import { Router } from 'express'
const router = Router()
import trendingMovies from "../../extractor/trending/movies.js"
import trendingTv from "../../extractor/trending/tv.js"

router.get('/movies', async (req, res) => {
    const results = await trendingMovies();
    res.status(200).json(results)
})

router.get('/tv', async (req, res) => {
    const results = await trendingTv();
    res.status(200).json(results)
})

export default router;
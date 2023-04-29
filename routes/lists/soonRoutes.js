import { Router } from 'express'
const router = Router()
import comingSoon from "../../extractor/coming/comingSoon.js"

router.get('/', async (req, res) => {
    const results = await comingSoon();
    res.status(200).json(results)
})

export default router;
import 'express-async-errors'

import type { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { json } from 'body-parser'

dotenv.config()

import { LoanOfficerRepository } from '@/loanOfficerRepository'

const repository = new LoanOfficerRepository()

export const app = express()

app.use(cors())
app.use(json())
app.use(express.json())

app.get('/loan-officers', async (_req: Request, res: Response) => {
  res.status(200).json(await repository.getAll())
})

app.get('/loan-officers/:id', async (req: Request, res: Response) => {
  res.status(200).json(await repository.getById(+req.params.id))
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json(err)
})

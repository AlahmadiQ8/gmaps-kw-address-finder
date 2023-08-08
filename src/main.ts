import './style.css'

import { setupCounter } from './counter.ts'

const temp = document.querySelector<HTMLButtonElement>('#counter')!
await setupCounter(12, 21)

import './style.css'

import { Language, setupCounter } from './counter.ts'

const temp = document.querySelector<HTMLButtonElement>('#counter')!
await setupCounter(48.100216, 29.215362, Language.AR)

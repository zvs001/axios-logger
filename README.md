
Axios logger to help debug api problems.

[![npm](https://img.shields.io/npm/v/@zvs001/axios-logger)](https://www.npmjs.com/package/@zvs001/axios-logger)

## Install

``yarn add @zvs001/axios-logger``

or 

```npm i -S @zvs001/axios-logger```


## Usage

Connect example:

```tsx
import { applyAxiosLogger } from '@zvs001/axios-logger'
import axios from 'axios'

const apiClient = axios.create({})

if (__DEV__) {
  applyAxiosLogger(apiClient, {
    logVariant: 'errors',
  })
}
```

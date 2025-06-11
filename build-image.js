//read package.json and get version number
import pack from './package.json'

const versionArr = pack.version.split('.')
const major = parseInt(versionArr[0])
const minor = parseInt(versionArr[1])
const patch = parseInt(versionArr[2])

await Bun.$`docker build --platform linux/amd64,linux/arm64 -t mio9/naas:${major}.${minor}.${patch} .`
await Bun.$`docker tag mio9/naas:${major}.${minor}.${patch} mio9/naas:latest`
await Bun.$`docker tag mio9/naas:${major}.${minor}.${patch} mio9/naas:${major}.${minor}`
await Bun.$`docker tag mio9/naas:${major}.${minor}.${patch} mio9/naas:${major}`
await Bun.$`docker push mio9/naas:${major}.${minor}.${patch}`
await Bun.$`docker push mio9/naas:${major}.${minor}`
await Bun.$`docker push mio9/naas:${major}`
await Bun.$`docker push mio9/naas:latest`

